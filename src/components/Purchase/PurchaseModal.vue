<template>
    <div class="purchase-modal">
        <div class="columns">
            <div class="item-wrapper column p-1" :key="item.value" v-for="item in items">
                <purchase-item :item="item" tier="blue" icon="" @purchase="purchase" />
            </div>
        </div>
        <purchase-info-card />
    </div>
</template>

<style lang="scss">
.purchase-modal {
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.90);
    max-width: 900px;
    margin: 0 auto;
    backdrop-filter: blur(10px);
    border-radius: 12px;
}
</style>

<script>
import PurchaseInfoCard from './PurchaseInfoCard.vue'
import PurchaseItem from './PurchaseItem.vue'
export default {
  components: { PurchaseItem, PurchaseInfoCard },
    name: 'PurchaseModal',
    computed: {
        items() {
            return this.$store.getters.getItems
        }
    },
    methods: {
        purchase(item) {
            this.$emit('close')
            console.log(item)
            this.$store.dispatch('checkout/createNew', item)
        }
    }
}
</script>