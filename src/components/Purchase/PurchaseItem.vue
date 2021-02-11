<template>
    <div class="purchase-item" :class="[{ 'is-dark-mode': dark }, getTierClass]">
        <div class="purchase-item-box">
            <div class="color-header">
                <div class="purchase-title">
                    {{ item.title || 'FOR SALE' }}
                </div>
            </div>
            <div class="purchase-content">
                <div class="purchase-value" v-if="!editable">{{ item.value }}</div>
                <b-field v-else-if="dark">
                    <b-numberinput min="1" max="200" step="1" type="is-warning" v-model="editableItem.value" @input="getPrice()" size="is-small" controls-rounded controls-position="compact"></b-numberinput>
                </b-field> 
                <b-field v-else>
                    <b-numberinput min="100" max="200000" min-step="1" step="1000" v-model="editableItem.value" @input="getPrice()" size="is-small" controls-rounded controls-position="compact"></b-numberinput>
                </b-field> 
                <div class="purchase-unit">{{ item.unit }}</div>
                <a @click="$emit('purchase', getItem())" class="purchase-button" :class="{ 'is-disabled': editableItem.value == 0 && editable }">{{ item.price || '$' + getPrice() }}</a>
            </div>
        </div>
        <div class="circle-icon">
            <div class="circle-icon-holder" :style="{ 'background-image': `url(${getIcon()})`}"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PurchaseItem',
    props: {
        icon: String,
        editable: Boolean,
        data: {
            value: Number|String,
            unit: String,
            price: String,
            id: String,
            quantity: Number,
            title: String,
            tier: Number,
        },
    },
    data() {
        return {
            editableItem: {
                value: 0,
                tier: 2,
                unit: 'CREDITS',
                title: 'CUSTOM',
            }
        }
    },
    computed: {
        item() {
            return this.data || this.editableItem
        },
        getTierClass() {
            if      (this.item.tier <= 1) return { 'is-basic':   true }
            else if (this.item.tier <= 2) return { 'is-primary': true }
            else                          return { 'is-special': true }
        },
        dark() {
            return this.$store.state.purchase.modalItems === 'gold'
        }
    },
    methods: {
        getPrice() {
            let quantity = this.editableItem.value,
                price = 0
            if(this.dark) {
                if(quantity <= 4)
                    price = quantity * 0.99
                else if(quantity <= 19)
                    price = quantity * 0.898
                else
                    price = quantity * 0.7495
            } else {
                if(quantity <= 5000)
                    price = quantity * 0.001326
                else if(quantity <= 16000)
                    price = quantity * 0.00099899
                else
                    price = quantity * 0.00090849
            }
            return Math.ceil(price * 100)/100
        },
        getId() {
            if(this.dark) {
                return 'gold_0001'
            }
            return 'credit_0001'
        },
        getIcon() {
            if(this.dark) {
                return require(`@/assets/images/currency/coin.png`)
            }
            return this.icon || require(`@/assets/images/currency/credits-display.png`)
        },
        getItem() {
            if(this.editable) {
                return {
                    id: this.getId(),
                    quantity: this.editableItem.value,
                }
            }

            return {
                id: this.item.id,
                quantity: this.item.quantity,
            }
        }
    },
    mounted() {
        this.editableItem.price = this.getPrice()
        this.editableItem.id = this.getId()
        this.editableItem.quantity = this.editableItem.value
    }
}
</script>

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
            padding: 10px;
            .b-numberinput {
                        margin-top: 1rem;
                .control.is-small {
                    width: 100%;
                    input {
                        font-weight: bold;
                        color: rgb(100, 105, 120);
                        background-color: unset;
                        border: none;
                        font-size: 1.85rem;
                        max-height: 1.85rem;
                        padding: none;
                    }
                }
            }
            .purchase-value {
                font-size: 2.5rem;
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
                &:hover:not(.is-disabled) {
                    filter: brightness(1.05);
                }
                &.is-disabled {
                    cursor: not-allowed;
                }
            }
        }
    }
    &.is-basic {
        .color-header {
            background-color: #424242;
        }
        .purchase-content .purchase-button {
            background-color: #424242;
        }
    }
    &.is-special {
        .color-header {
            background-color: unset;
            background: linear-gradient(101.67deg, #E952D1 0%, #52D9E9 100%);
        }
        .purchase-content .purchase-button {
            background-color: unset;
            background: linear-gradient(101.67deg, #E952D1 0%, #52D9E9 100%);
        }
    }

    
}
</style>

