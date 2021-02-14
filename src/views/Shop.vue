<template>
    <div class="shop">
        <b-modal class="shop-item-modal" @close="closeModal" v-model="activeModal">
            <shop-item @cancel="closeModal" :buy-state="buyState" @buy="buy(activeItem)" class="is-dark is-modal" :item="activeItem"/>
        </b-modal>
        <page-hero title="Shop" subtitle="Unlock new content to use in games! "/>
        <div class="shop-content">
            <div class="columns header-wrapper is-multiline">
                <shop-header class="header column" title="Top items" icon="award" pack="fas">
                    <div class="shop-item-wrapper column is-12" v-for="item in top" :key="item.itemID">
                        <shop-item @open="open" class="is-tiered is-small is-clickable" :item="item"/>
                    </div>
                </shop-header>
                <div class="column divider is-0-desktop is-12-tablet"></div>
                <shop-header class="header column" title="Trending items"  icon="chart-line" pack="fas">
                    <div class="shop-item-wrapper column is-12" v-for="item in trending" :key="item.itemID">
                        <shop-item @open="open" class="is-tiered is-small is-clickable" :item="item" />
                    </div>
                </shop-header>
            </div>
            <shop-item-viewer @open="open" :data="data" :loading="loading" />
        </div>
    </div>
</template>

<style lang="scss">
.shop-item-modal .animation-content.modal-content {
    max-width: 340px !important;
}

.snackbar .text {
    color: white;
}
</style>

<style scoped lang="scss">
.shop {
    background-color: #eee;
}

.shop-content {
    max-width: $widescreen;
    padding: 20px;
    margin: 0 auto;
}
</style>

<script>
import ShopHeader from '../components/Shop/ShopHeader.vue'
import ShopItem from '../components/Shop/ShopItem.vue'
import PageHero from '../components/Page/PageHero.vue'
import ShopItemViewer from '../components/Shop/ShopItemViewer.vue'

export default {
    name: 'Shop',
    components: {
        ShopHeader,
        ShopItem,
        PageHero,
        ShopItemViewer,
    },
    data() {
        return {
            loading: true,
            data: {},
            activeItem: {},
            activeModal: false,
            buyState: 'buy'
        }
    },
    methods: {
        async fetchItems() {
            let userID = ''
            if(this.$store.getters.getUser.id) {
                userID = `?userID=${this.$store.getters.getUser.id}`
            }

            fetch('/api/shopItems' + userID, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + this.$store.getters.getToken
                }
            })
            .then(res => res.json())
            .then(json => this.data = json)
            .catch(console.error)
            .finally(() => this.loading = false)
        },
        open(id) {
            this.activeItem = this.data.items.find(item => item.itemID === id || item.friendlyName === id)
            if(this.activeItem) { 
                this.activeModal = true
            }
        },
        closeModal() {
            this.buyState = 'buy'
            this.activeModal = false
        },
        buy(item) {
            // Check if user is logged in
            if(!this.$store.getters.getToken) {
                this.$router.push('/login')
            }

            this.buyState = 'loading'
            // Check client side if user has enough credits
            // Fetch the server
            fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + this.$store.getters.getToken
                }, body: JSON.stringify({
                    itemID: item.itemID,
                    userID: this.$store.getters.getUser.id
                })
            })
            .then(res => res.json())
            .then(json => {
                if(json.error) throw new Error(json.error)
                this.$buefy.toast.open({
                    duration: 5000,
                    message: 'Purchase success!',
                    position: 'is-bottom',
                    type: 'is-success'
                })
                this.buyState = 'success'
                this.fetchItems()
                this.$store.dispatch('fetchDBInfo')
                this.$gtag.event('purchase', { items: [{ id: item.itemID, name: item.friendlyName, price: item.cost, category: item.type }] })
            }).catch(err => {
                console.error(err)
                this.$buefy.snackbar.open({
                    message: err.message,
                    type: 'is-danger'
                })
                this.buyState = 'error'
            })
        }
    },
    mounted() {
        this.fetchItems()
        this.$store.subscribeAction((action) => {
            if(action.type == 'fetchDBInfo' || action.type == 'fetchUserInfo') {
                this.fetchItems()
            }
        })
    },
    computed: {
        top() {
            let res = []
            if(this.data.shopStatus) {
                this.data.shopStatus.top.forEach(item => res.push(this.data.items.find(i => item === i.itemID)))
            }
            return res
        },
        
        trending() {
            let res = []
            if(this.data.shopStatus) {
                this.data.shopStatus.trending.forEach(item => res.push(this.data.items.find(i => item === i.itemID)))
            } 
            return res
        }
    }
}
</script>