<template>
    <div class="dashboard">
        <PageHero title="Dashboard" subtitle="Configure your profile and servers" />
        <!-- Server-specific settings -->
        <main class="dashboard-content box columns">
            <aside class="sidebar column">
                <b-menu-list
                    type="is-light"
                    :model="selection">
                    <div class="p-1">
                        <b-menu>
                        <b-menu-list label="PROFILE">
                            <b-menu-item icon="information-outline" label="Overview"></b-menu-item>
                            <b-menu-item icon="information-outline" label="Customize"></b-menu-item>
                            <b-menu-item icon="account" label="Games">
                                <b-menu-item label="Seasons"></b-menu-item>
                                <b-menu-item label="Achievements"></b-menu-item>
                            </b-menu-item>
                        </b-menu-list>
                        <b-menu-list label="SERVERS">
                            <b-menu-item v-for="guild in guilds" :key="guild.id">
                                <template #label>
                                    <span class="icon guild-icon">
                                        <img :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`" />
                                    </span>
                                    <span class="guild-name">{{ guild.name }}</span>
                                </template>
                            </b-menu-item>
                            <b-message v-if="guilds.length === 0" type="is-warning">No servers found. <router-link class="inline-link" to="/invite">Invite Gamebot</router-link> to your server to get started!</b-message>
                            <!-- Write a router-link to /login -->

                        </b-menu-list>
                        </b-menu>
                    </div>
                </b-menu-list>
            </aside>
            <div class="column">

            </div>
        </main>
    </div>
</template>

<style lang="scss">
.dashboard {
    background-color: #eee;
    min-height: 700px;
    .dashboard-content {
        position: relative;
        max-width: $widescreen;
        padding: 20px;
        margin: 0 auto;
        background-color: white;
        .sidebar {
            max-width: 250px;
        }
        .guild-icon {
            width: 24px;
            height: 24px;
            border-radius: 100%;
            margin-right: 5px;
            overflow: hidden;
        }
        .guild-name {
            line-height: 24px;
            vertical-align: top;
        }
    }
}

a.inline-link {
    padding: 0;
    display: inline;
    margin: 0;

    &:hover {
        background-color: transparent;
    }
}
</style>

<script>
import PageHero from '../components/Page/PageHero.vue'

export default {
    name: 'Dashboard',
    components: {
        PageHero,
    },
    data() {
        return {
            loading: true,
            data: {},
            activeItem: {},
            selection: '',
            guilds: []
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
        },

        async fetchGuilds() {
            const PERMISSIONS = {
                MANAGE_SERVER: 0x20,
            }

            fetch('https://discord.com/api/users/@me/guilds', {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + this.$store.getters.getToken
                }
            })
            .then(res => res.json())
            .then(json => json.filter(
                guild => guild.permissions & PERMISSIONS.MANAGE_SERVER
                // TODO: Check if bot is in guild
            ))
            .then(guilds => this.guilds = guilds)
            .catch(console.error)
        },
    },
    mounted() {
        Promise.all(this.fetchGuilds(), this.fetchItems())
        .then(() => {
            this.loading = false
        })
    },
    computed: {
    }
}

</script>