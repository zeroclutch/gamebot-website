<template>
    <section class="table-wrapper">

        <b-table
            :data="data"
            ref="table"
            :opened-detailed="defaultOpenedDetails"
            detailed
            detail-key="name"
            sort-icon="arrow-up"
            icon-pack="fas"
            sort-icon-size="is-small"
            :mobile-cards="false"
            :show-detail-icon="true">

            <b-table-column searchable field="name" label="Name" sortable v-slot="props">
                {{ props.row.name }}
            </b-table-column>
            
            <b-table-column field="category" label="Category" sortable v-slot="props">
                {{ props.row.category }}
            </b-table-column>
            
            <b-table-column field="usage" label="Usage" sortable v-slot="props">
                {{ prefix }}{{ props.row.usage }}
            </b-table-column>

            <!--b-table-column field="games" label="Games" sortable v-slot="props">
                <b-taglist>
                    <span class="tag-wrapper"  v-for="game in props.row.games" :key="game" >
                    <b-tooltip :label="games[game]" position="is-top">
                        <b-tag class="game-tag" :type="colors[game]">{{ game }}</b-tag>
                    </b-tooltip>
                    </span>
                </b-taglist>
            </b-table-column-->

            <template #detail="props">
                <article class="media">
                    <div class="media-content">
                        <div class="columns">
                            <div class="column content">
                                <strong>Aliases</strong>
                                <br>
                                {{ props.row.aliases.join(', ') || 'None' }}
                            </div>
                            
                            <div class="column content">
                                <strong>Description</strong>
                                <br>
                                {{ props.row.description }}
                            </div>
                        </div>
                    </div>
                </article>
            </template>
        </b-table>

    </section>
</template>

<style lang="scss" scoped>
    .table-wrapper {
        text-align: left;
        max-width: $widescreen;
        padding: 40px;
        overflow: hidden;
    }
    .tag-wrapper {
        margin-right: 5px;
    }
</style>

<script>

    export default {
        data() {
            return {
                colors: {
                    ana: 'is-danger',
                    c4: 'is-info',
                    cah: 'is-dark',
                    che: 'is-primary',
                    oth: 'is-light',
                    sus: 'is-success',
                    wis: 'is-warning',
                },
                games: {
                    ana: 'Anagrams',
                    c4: 'Connect 4',
                    cah: 'Cards Against Humanity',
                    che: 'Chess',
                    oth: 'Othello',
                    sus: 'Survey Says',
                    wis: 'Wisecracks',
                },
                data: [{
                    name: 'add',
                    usage: 'add',
                    aliases: [],
                    description: 'Adds a player to the current game',
                    category: 'leader',
                    permissions: ['GAME_LEADER'],
                    args: false,
                    games: ['cah', 'che', 'oth']
                },{
                    name: 'join',
                    usage: 'join',
                    aliases: [],
                    description: 'Adds a player to the current game',
                    category: 'leader',
                    permissions: ['GAME_LEADER'],
                    args: false,
                    games: ['oth', 'sus', 'wis']
                },
                {
                    name: 'end',
                    usage: 'end',
                    aliases: [],
                    description: 'Ends the current game',
                    category: 'leader',
                    permissions: ['GAME_LEADER'],
                    args: false,
                }],
                prefix: '&',
                defaultOpenedDetails: [1],
            }
        },
        methods: {
            async loadData() {
                let data = await fetch('/api/fetchCommands', {
                    method: 'GET',
                    headers: {
                        authorization: 'gamebot!'
                    }
                })
                console.log(data)
                let json = await data.json()
                this.data = json
            }
        },
        mounted() {
            this.loadData()
            //
        }
    }
</script>