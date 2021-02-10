<template>
        <div class="item columns is-multiline is-mobile" @click="$emit('open', item.itemID)" :class="getTierClass">
            <KinesisContainer class="image-wrapper">
                <KinesisElement :strength="15" type="depth" class="item-image column is-4-mobile is-3-tablet is-12-desktop" :style="{ backgroundImage: getBackgroundImage(item) }">
                </KinesisElement>
            </KinesisContainer>
            <div class="item-info-wrapper column p-0">
                <div class="item-info columns is-mobile">
                <div class="item-name column p-0">{{ item.friendlyName }}</div>
                    <div class="item-cost column p-0 is-3 has-text-right">
                        <span v-if="item.purchased">
                            <b-tag type="is-white" class="is-tiered" :class="getTierClass" rounded ><span class="icon-label">OWNED</span>&nbsp;<b-icon class="" icon="check" pack="fas" /></b-tag>
                        </span>
                        <span v-else>
                            <span v-if="item.cost && item.cost > 0">
                                {{ item.cost }} <img class="currency-icon" src="@/assets/images/currency/credit-icon.png">
                            </span>
                            
                            <span v-if="item.goldCost && item.goldCost > 0">
                                {{ item.goldCost }} <img class="currency-icon" src="@/assets/images/currency/coin.gif">
                            </span>
                        </span>
                    </div>
                </div>
                <div class="item-taglist">
                    <span class="tag is-tiered is-rounded" :class="getTierClass">{{ getTier.display }}</span>
                </div>
                <div class="item-description">
                    {{ item.description }}
                </div>
                <div class="item-buttons has-text-right">
                    <button v-if="item.purchased" disabled class="item-button info-button button is-success">Purchased</button>
                    <div class="item-buttons-wrapper" v-else>
                        <b-button @click="$emit('cancel')" class="item-button info-button button is-dark">Cancel</b-button>&nbsp;

                        <b-button v-if="buyState === 'error'" @click="$emit('cancel')" class="item-button is-danger" icon-right="times" icon-pack="fas" ></b-button>
                        <b-button v-else-if="buyState === 'success'" @click="$emit('cancel')" class="item-button is-primary is-success" icon-right="check" icon-pack="fas" ></b-button>
                        <b-button v-else-if="buyState === 'loading'" class="item-button is-loading is-success">Buy</b-button>
                        <b-button v-else @click="$emit('buy', item.itemID)" class="item-button is-success">Buy</b-button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { KinesisContainer, KinesisElement} from 'vue-kinesis'

const TIER_LIST = [
{
    price: 10000,
    name: 'is-mythical',
    display: 'MYTHICAL'
},
{
    price: 5000,
    name: 'is-legendary',
    display: 'LEGENDARY'
},
{
    price: 2500,
    name: 'is-epic',
    display: 'EPIC'
},
{
    price: 1000,
    name: 'is-rare',
    display: 'RARE'
},
{
    price: Number.MIN_SAFE_INTEGER,
    name: 'is-common',
    display: 'COMMON'
},
]

export default {
    name: 'ShopItem',
    components: {
        KinesisContainer,
        KinesisElement
    },
    props: {
        item: {
            tier: String,
            tags: Array,
            game: String,
            friendlyName: String,
            cost: Number,
            goldCost: Number,
            description: String,
            purchased: Boolean,
        },
        buyState: String
    },
    computed: {
        getTierClass() {
            let tier = this.getTier
            let classList = {}
            classList[tier.name] = true
            return classList
        },
        getTier() {
            if(!this.item.tier) {
                return TIER_LIST.find(tier => tier.price <= this.item.cost)
            } else return TIER_LIST.find(tier => tier.display === this.item.tier.toUpperCase())
        },
    },
    methods: {
        getBackgroundImage(item) {
            return `url('${require(`@/assets/images/shop-items/${item.game}-shop/${item.image || item.type + '.png'}`)}')`
        }
    }
}
</script>

<style lang="scss" scoped>

.item.columns {
    max-width: 340px;
    @include mini-phone {
        max-width: 300px;
    }
    padding: 10px;
    margin: 0 auto;
    text-align: left;
    border-radius: 10px;
    transition: 0.2s filter;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));

    &.is-dark {
        background: rgba(54, 57, 63, 0.5);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        color: #fff;
    }
    
    &.is-light {
        background: rgba(255, 255, 255, 0.8);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        color: $discord-background-tertiary;
    }

    &.is-tiered {
        .tag.is-tiered {
            background: white;
            &.is-common { color: rgb(82, 197, 126) }
            &.is-rare { color: rgb(82, 137, 197) }
            &.is-epic { color: rgba(131,121,234,1); }
            &.is-legendary { color: rgb(238, 121, 92); }
            &.is-mythical { color: rgb(243, 82, 181); }
        }
        color: #fff;
        background-size: 250% 250%;
        animation: gradient 5s ease-in-out infinite alternate;
        &:hover {
            animation-duration: 2s;
        }
        .item-buttons-wrapper {
            .button.is-primary {
                background-color: #fff;
                color: #52D9E9;
                &:hover {
                    background-color: #eee;
                }
            }
            
            .button.is-dark {
                color: #fff;
            }
        }
    }

    .tag.is-tiered{
        color: white;
        animation: gradient 5s ease-in-out infinite alternate;
        background-size: 250% 250%;
    }


    @mixin small {
        width: 100%;
        max-width: unset;
        .item-image {
            width: 120px;
            height: 120px;
            margin-bottom: 0;
        }
        &:not(.is-modal) .item-buttons {
            display: none;
        }
        
        .item-info-wrapper {
            margin-left: 10px;
        }
    }
    
    .image-wrapper {
        margin: 0 auto;
    }

    &.is-clickable {
        cursor: pointer;

        &:hover {
            filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.4)) saturate(1.5);
        }
    }
    
    @include mobile {
        max-width: 440px;
    }

    .item-taglist {
        margin-bottom: 5px;
    }

    .item-buttons {
        padding-top: 10px;
        .item-button {
            min-width: 65px;
            filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
            transition: filter 0.2s;
            &:hover {
                filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
            }
        }
    }

    .item-image {
        border-radius: 10px;
        width: 300px;
        height: 300px;
        margin-bottom: 10px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3));
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #ddd;
    }

    .item-description:not(.modal .item-description) {
        height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.9em;
    }


    .item-info-wrapper {
        .item-info {
            font-size: 1.25rem;
            font-weight: bold;
            margin: 0;
            .item-name {
                min-width: 200px;
                @include mini-phone {
                    min-width: 0;
                    width: 100%;
                }
            }
            .item-cost {
                width: 95px;
                opacity: 0.8;
                .icon-label {
                    vertical-align: 2px;
                }
            }
        }
    }


    .item-info > .column {
        padding-bottom: 0;
    }

    img.currency-icon {
        display: inline-block;
        height: 1.5rem;
        width: auto;
        vertical-align: text-top;
    }

    img.currency-icon.is-stable {
        top: 0;
    }

    
    @include mobile {
        @include small();
    }

    &.is-small {
        @include small();
    }

}
</style>