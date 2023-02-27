<template>
    <div class="balance-holder">
        <b-button
            icon-left="plus-circle"
            :size="size"
            @click="openCreditModal"
            class="is-inverted is-info balance-button">
            {{ credits == undefined ? '??' : credits }} <img class="currency-icon" src="@/assets/images/currency/128w/credits.png" />
        </b-button>
        <b-button
            icon-left="plus-circle"
            :size="size"
            @click="openGoldModal"
            class="is-inverted is-warning balance-button">
            {{ gold == undefined ? '??' : gold }} <img class="currency-icon" src="@/assets/images/currency/coin.gif" />
        </b-button>
    </div>
</template>

<style lang="scss">
.balance-holder {
    .balance-button {
        margin-right: 0.5rem;
    }
    .icon, .currency-icon {
        vertical-align: bottom;
    }
    .is-small .currency-icon {
        height: 1rem;
    }
}
</style>

<script>
export default {
    name: 'NavBalance',
    props: {
        credits: Number,
        gold: Number,
        size: String,
    },
    methods: {
        checkout(plan) {
            // Creates a new checkout window
            this.$store.dispatch('checkout/createNew', plan)
        },
        openCreditModal() {
            this.$store.commit('setModalItems', 'credits')
            this.$store.commit('togglePurchaseModal')
        },
        openGoldModal() {
            this.$store.commit('setModalItems', 'gold')
            this.$store.commit('togglePurchaseModal')
        }
    }
}
</script>