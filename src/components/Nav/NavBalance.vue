<template>
    <div class="balance-holder">
        <b-button
            icon-left="plus-circle"
            :size="size"
            class="is-inverted is-info balance-button">
            {{ credits == undefined ? '??' : credits }} <img class="currency-icon" src="https://gamebot.rocks/images/currency/credit.png" />
        </b-button>
        <b-button
            icon-left="plus-circle"
            :size="size"
            class="is-inverted is-warning balance-button">
            {{ gold == undefined ? '??' : gold }} <img class="currency-icon" src="https://gamebot.rocks/images/currency/coin.gif" />
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
    }
}
</script>