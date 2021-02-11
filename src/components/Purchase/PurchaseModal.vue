<template>
    <div class="purchase-modal">
        <div class="columns">
            <div class="item-wrapper column p-1" :key="item.value" v-for="item in items">
                <purchase-item :data="item" @purchase="purchase" />
            </div>
            <div class="item-wrapper column p-1">
                <purchase-item editable @purchase="purchase" />
            </div>
        </div>
        <h3 class="purchase-section-title">On a budget?</h3>
        <h6 class="purchase-section-subtitle">Here are some free ways to get credits</h6>
        <div class="info-card-wrapper columns">
           <div class="column purchase-info-card-wrapper"> 
                <div class="purchase-info-card">
                    <div class="purchase-info-image">
                        <img src="@/assets/images/mockup/daily.png" alt="Type &daily to get credits" draggable="false">
                    </div>
                    <div class="purchase-info-text">
                        Type <b>&daily</b> and vote for Gamebot on Top.gg every 12 hours to get {{ gold ? 'a chance at gold!' : 'guaranteed credits!'}}
                    </div>
                    <div class="has-text-right">
                        <a href="https://top.gg/bot/620307267241377793/vote" class="button is-primary">Vote now!</a>
                    </div>
                </div>
            </div>
           <div class="column purchase-info-card-wrapper"> 
                <div class="purchase-info-card column">
                    <div class="purchase-info-image">
                        <img src="@/assets/images/mockup/giveaway.png" alt="Join the community server for giveaways" draggable="false">
                    </div>
                    <div class="purchase-info-text">
                        Join the community server for giveaways, games, and more!
                    </div>
                    <div class="has-text-right">
                        <a href="https://top.gg/bot/620307267241377793/vote" class="button is-discord">Join on Discord!</a>
                    </div>
                </div>
           </div>
           <div class="column purchase-info-card-wrapper">
                <div class="purchase-info-card column">
                    <div class="coming-soon-wrapper">
                        <div class="coming-soon-title">??</div>
                        <div class="coming-soon-subtitle">COMING SOON</div>
                    </div>
                </div>
           </div>
        </div>
    </div>
</template>

<script>
import PurchaseItem from './PurchaseItem.vue'
export default {
  components: { PurchaseItem },
    name: 'PurchaseModal',
    computed: {
        items() {
            return this.$store.getters.getItems
        },
        gold() {
            return this.$store.state.purchase.modalItems === 'gold'
        },
    },
    methods: {
        purchase(item) {
            this.$emit('close')
            this.$store.dispatch('checkout/createNew', item)
        },
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.purchase-modal {
    padding: 20px;
    background-color: rgba(238, 244, 244, 0.90);
    max-width: 900px;
    margin: 0 auto;
    backdrop-filter: blur(10px);
    border-radius: 12px;
    .purchase-section-title {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        color: #646978;
    }
    .purchase-section-subtitle {
        font-size: 0.75rem;
        font-weight: bold;
        text-align: center;
        color: #989EA7;
        margin-bottom: 1rem;
    }
    .purchase-info-card-wrapper {
        padding: 5px;
        display: flex;
    }
    .purchase-info-card {
        border-radius: 9px;
        padding: 15px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
        background-color: white;
        color: #9A9A98;
        
        .purchase-info-text {
            text-align: left;
            margin-bottom: 5px;
        }

        .coming-soon-wrapper {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
        .coming-soon-title, .coming-soon-subtitle {
            color: #E3E4E8;
            text-align: center;
        }
        .coming-soon-title {
            font-size: 3rem;
            padding: 1rem;
            font-weight: bold;
        }
    }
    
}
</style>



<style lang="scss">
.purchase-modal.is-dark-mode {
    background-color: rgb(32,32,32,0.85);
    .purchase-item {
        .purchase-item-box {
            background-color: unset;
        }
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
        .circle-icon, .circle-icon-holder, .purchase-content {
            background-color: #323231;
            .purchase-value {
                color: $warning;
            }
        }
        .purchase-box {
            background-color: unset;
        }
        .purchase-button, .color-header {
            background-color: $warning;
            .purchase-title {
                color: #404040;
            }
        }
        
        .purchase-content {
            .b-numberinput .control.is-small input {
                color: $warning;
            }
        }
        .purchase-content .purchase-button {
            color: #404040;
        }
        &.is-basic {
            .color-header, .purchase-content .purchase-button {
                background-color: #F0F0F0;
            }
        }
        &.is-special {
            .color-header, .purchase-content .purchase-button {
                background-color: unset;
                background: linear-gradient(101.67deg, #E952D1 0%, #EBD26C 100%);
            }
        }
    }
    .purchase-section-title {
        color: #D9D9D8;
    }
    .purchase-section-subtitle {
        color: #9A9A98;
    }
    .purchase-info-card {
        background-color: #323231;
        .coming-soon-title, .coming-soon-subtitle {
            color: #1f1f1f;
        }
    }
}
</style>
