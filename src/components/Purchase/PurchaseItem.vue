<template>
    <div class="purchase-item" :class="[{ 'is-dark-mode': dark }, getTierClass]">
        <div class="purchase-item-box">
            <div class="color-header">
                <div class="purchase-title">
                    {{ item.title || 'ITEM' }}
                </div>
            </div>
            <div class="purchase-content">
                <div class="purchase-value">{{ item.value }}</div>
                <div class="purchase-unit">{{ item.unit }}</div>
                <a @click="$emit('purchase', item)" class="purchase-button">{{ item.price }}</a>
            </div>
        </div>
        <div class="circle-icon">
            <div class="circle-icon-holder" :style="{ 'background-image': `url(${icon || require(`@/assets/images/currency/credits-display.png`)})`}"></div>
        </div>
    </div>
</template>

<style lang="scss">
.purchase-item {
    position: relative;
    font-weight: bold;
    .circle-icon {
        border-radius: 100%;
        width: 4rem;
        height: 4rem;
        margin: 0 auto;
        text-align: center;
        background-color: white;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
        position: absolute;
        left: calc(50% - 2rem);
        top: -30px;
        overflow: hidden;
        .circle-icon-holder {
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            margin: 0 auto;
            position:relative;
            top:50%;
            transform: translateY(-50%);
        }
    }
    .purchase-item-box {
        margin-top: 30px;
        border-radius: 10px;
        background-color: white;
        overflow: hidden;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
        border-radius: 9px;
        .color-header {
            padding: 0.5rem;
            padding-top: 2.5rem;
            color: white;
            background-color: #52D9E9;
        }
        .purchase-content {
            text-align: center;
            padding: 12px;
            .purchase-value {
                font-size: 2rem;
                color: #646978;
            }
            .purchase-unit {
                color: #A9ADBA;
                margin-bottom: 1rem;
            }
            .purchase-button {
                display:block;
                background-color: #52D9E9;
                padding: 10px 0;
                width: 100%;
                color: white;
                font-weight: bold;
                border-radius: 8px;
                box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
                transition: all 0.2s;
                &:hover {
                    filter: brightness(1.05);
                }
            }
        }
    }
    &.is-basic {
        .color-header {
            background-color: #424242;
        }
    }
    &.is-premium {
        .color-header {
            background: linear-gradient(101.67deg, #E952D1 0%, #52D9E9 100%);
        }
    }
}
</style>

<script>
export default {
    name: 'PurchaseItem',
    props: {
        dark: Boolean,
        item: {
            value: Number|String,
            unit: String,
            price: String,
            id: String,
            quantity: Number,
            title: String,
        },
        tier: Number,
        icon: String,
    },
    computed: {
        getTierClass() {
            if      (this.tier <= 1) return { 'is-basic':   true }
            else if (this.tier <= 2) return { 'is-primary': true }
            else                     return { 'is-special': true }
        }
    }
}
</script>