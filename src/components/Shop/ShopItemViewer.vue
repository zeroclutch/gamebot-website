<template>
    <div class="shop-item-viewer box">
        <h4 class="title is-4">
            <b-icon icon="store" pack="fas"/>&nbsp;All Items
        </h4>
        <div class="shop-inventory columns is-multiline">
            <div class="inventory-controls-left column is-8 ">
                <b-field grouped group-multiline>
                    <b-dropdown v-model="sortBy" aria-role="list" type="is-info">
                        <template v-if="sortBy === 'alpha'" #trigger="{ active }">
                            <b-button
                                label="Name"
                                type="is-info"
                                icon-left="sort-alpha-down"
                                icon-pack="fas"
                                :icon-right="active ? 'caret-up' : 'caret-down'" />
                        </template>

                        <template v-else #trigger="{ active }">
                            <b-button
                                label="Price"
                                type="is-info"
                                icon-pack="fas"
                                icon-left="money-bill-wave"
                                :icon-right="active ? 'caret-up' : 'caret-down'" />
                        </template>


                        <b-dropdown-item :value="'alpha'" aria-role="listitem">
                            <div class="media">
                                <b-icon class="media-left"
                                icon="sort-alpha-down" 
                                pack="fas"></b-icon>
                                <h3>Name</h3>
                            </div>
                        </b-dropdown-item>

                        <b-dropdown-item :value="'cost'" aria-role="listitem">
                            <div class="media">
                                <b-icon class="media-left"
                                icon="money-bill-wave"  pack="fas"></b-icon>
                                <h3>Price</h3>
                            </div>
                        </b-dropdown-item>
                    </b-dropdown>

                    <b-dropdown v-model="sortOrder" aria-role="list" type="is-info">
                        <template v-if="sortOrder === 'asc'" #trigger="{ active }">
                            <b-button
                                label="Ascending"
                                type="is-info"
                                icon-left="arrow-up"
                                icon-pack="fas"
                                :icon-right="active ? 'caret-up' : 'caret-down'" />
                        </template>

                        <template v-else #trigger="{ active }">
                            <b-button
                                label="Descending"
                                type="is-info"
                                icon-pack="fas"
                                icon-left="arrow-down"
                                :icon-right="active ? 'caret-up' : 'caret-down'" />
                        </template>

                        <b-dropdown-item :value="'asc'" aria-role="listitem">
                            <div class="media">
                                <b-icon class="media-left"
                                icon="arrow-up"  pack="fas"></b-icon>
                                <h3>Ascending</h3>
                            </div>
                        </b-dropdown-item>

                        <b-dropdown-item :value="'desc'" aria-role="listitem">
                            <div class="media">
                                <b-icon class="media-left"
                                icon="arrow-down" 
                                pack="fas"></b-icon>
                                <h3>Descending</h3>
                            </div>
                        </b-dropdown-item>
                    </b-dropdown>

                    
                    <b-dropdown v-model="filter.showPurchased" aria-role="list" type="is-info">
                        <template #trigger="{ active }">
                            <b-button
                                :label="filter.showPurchased ? 'Show Purchased' : 'Hide Purchased'"
                                type="is-info"
                                :icon-right="active ? 'sort-up' : 'sort-down'" />
                        </template>
                        
                        <b-dropdown-item :value="true" aria-role="listitem">
                            <div class="media">
                                <b-icon class="media-left"
                                icon="eye"  pack="fas"></b-icon>
                                <h3>Show Purchased</h3>
                            </div>
                        </b-dropdown-item>

                        <b-dropdown-item :value="false" aria-role="listitem">
                            <div class="media">
                                <b-icon class="media-left"
                                icon="eye-slash" 
                                pack="fas"></b-icon>
                                <h3>Hide Purchased</h3>
                            </div>
                        </b-dropdown-item>
                    </b-dropdown>
                </b-field>
            </div>
                
            <div class="inventory-controls-right column is-4 ">
                <div class="inventory-search control has-icons-left has-text-right  has-icons-right">
                        <b-field>
                            <b-autocomplete
                                rounded
                                v-model="filter.search"
                                :data="filteredItemNames"
                                placeholder="Search"
                                icon="search"
                                clearable
                                @select="option => $emit('open', option)">
                                <template #empty>No results found</template>
                            </b-autocomplete>
                        </b-field>
                    </div>
            </div>
            <div class="p-1 menu column is-4 is-3-desktop is-2-widescreen">
                <b-menu>
                    <b-menu-list>
                    <b-menu-item icon="store" selected label="All Items" @click="setFilter('All Items')"></b-menu-item>
                    </b-menu-list>
                    <b-menu-list label="Categories">
                        <b-menu-item v-for="category in categories" icon="tags" :key="category.name" @click="setFilter(category.name)" :label="category.name">
                            <b-menu-item v-for="type in category.types" icon="tag" :key="type" @click="setFilter(type)" :label="type"></b-menu-item>
                        </b-menu-item> 
                    </b-menu-list>
                    <b-tag type="is-info" class="is-light">{{ filteredItems.length }} items</b-tag>
                </b-menu>
            </div>
            <div class="column columns is-multiline" id="shop-items">
                <div class="shop-item-wrapper column is-12 is-6-desktop" v-for="item in filteredItems" :key="item.itemID">
                    <shop-item @open="$emit('open', item.itemID)" class="is-tiered is-clickable is-small" :item="item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.menu {
    text-align: left;
}

.autocomplete .dropdown-content {
    text-align: left;
}

.is-grouped-multiline .button {
    margin-bottom: 0.5rem;
}
</style>

<style lang="scss" scoped>
a.dropdown-item.is-active {
    background-color: $info
}
.shop-item-viewer {
    
    .inventory-controls-left {
        text-align: left;
    }
    .title {
        text-align: left;
        font-weight: bold;
        .icon {
            vertical-align: middle;
        }

    }
}
</style>

<script>
import ShopItem from '@/components/Shop/ShopItem.vue'

const names = {
    'Anagrams': 'ana',
    'Cards Against Humanity': 'cah',
    'Chess': 'che',
    'Connect Four': 'c4',
    'Othello': 'oth',
    'Survey Says': 'sus',
    'Wisecracks': 'wis',
    'All Board Games': 'bgme',
    'Profile': 'profile',
    'Boxes': 'boxes',
}

export default {
    name: 'ShopItemViewer',
    components: { ShopItem },
    props: {
        data: {},
        loading: Boolean
    },
    data() {
        return { 
            sortBy: 'cost',
            sortOrder: 'desc',
            filter: {
                showPurchased: false,
                category: 'All Items',
                search: ''
            }
        }
    },
    computed: {
        categories() {
            if(this.loading) return
            let categories = []
            this.data.items.forEach(item => {
                // Convert id to name
                let name = this.getName(item.game)
                let category = categories.find(category => category.name == name)
                if(!category) {
                    categories.push({name, types: [item.type]})
                } else if(!category.types.includes(item.type)) {
                    category.types.push(item.type)
                }
            })

            // Sort in place
            categories.sort((a, b) => a.name.localeCompare(b.name))
            categories.forEach(category => {
                category.types.sort((a, b) => a.localeCompare(b))
            })

            return categories
        },
        filteredItems() {
            let items = this.data.items

            // Filter by tags
            if(!items) return []
            items = items.filter(item => this.filter.category === 'All Items' || (this.getName(item.game) === this.filter.category || item.type === this.filter.category))

            // Sort
            if(this.sortBy === 'cost') {
                items.sort((a, b) => {
                    return a.cost - b.cost
                })
            } else {
                // Default to name
                items.sort((a, b) => a.friendlyName.localeCompare(b.friendlyName))
            }

            if(this.sortOrder === 'desc') {
                items.reverse()
            }

            // Check search
            if(this.filter.search) {
                let search = new RegExp(this.filter.search, 'gim')
                items = items.filter(item => search.test(item.friendlyName) || search.test(item.description) || search.test(item.type))
            }

            // Purchased
            if(!this.filter.showPurchased) {
                items = items.filter(item => !item.purchased)
            }

            return items
        },
        filteredItemNames() {
            return this.filteredItems.map(item => item.friendlyName)
        }
    },
    methods: {
        getName(id) {
            return Object.keys(names).find(key => names[key] === id)
        },
        setFilter(filter) {
            this.clearSearch()
            this.filter.category = filter
        },
        clearSearch() {
            this.filter.search = ''
        },
        open(id) {
            this.$emit('open', id)
        }
    }
}
</script>