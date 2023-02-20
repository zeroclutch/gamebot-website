<template>
    <div class="dashboard">
        <PageHero title="Dashboard" subtitle="Configure your profile and servers" />
        <!-- Server-specific settings -->
        <main class="dashboard-content box columns">
            <aside class="sidebar column">
                <b-menu-list
                    :model="selection">
                    <div class="p-1">
                        <b-menu>
                        <b-menu-list
                        type="is-primary"
                        label="PROFILE">
                            <b-menu-item icon="information-outline" label="Overview"></b-menu-item>
                            <b-menu-item icon="information-outline" label="Customize"></b-menu-item>
                            <b-menu-item icon="account" label="Games">
                                <b-menu-item label="X"></b-menu-item>
                                <b-menu-item label="X"></b-menu-item>
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
                            <b-button v-if="!$store.getters.getToken" tag="router-link" icon-left="discord" icon-pack="fab" type="is-discord" inverted :to="{ path: '/login' }">
                        Log in with Discord
                    </b-button>
                        </b-menu-list>
                        </b-menu>
                    </div>
                </b-menu-list>
            </aside>
            <div class="column">
                <div id="user-profile">
                    <div id="user-info">
                        <div class="circle"></div> <!-- Replace with image -->
                        <div>
                            <p class="title" style="margin-bottom: 0;">table salt<span style="color: lightgray">#1234</span></p>
                            <b-tag>Legend</b-tag>
                            <b-tag>4K Club</b-tag>
                        </div>
                    </div>
                    <div class="column">
                        <div id="game-circles">
                            <div class="circle">cah</div>
                            <div class="circle">sus</div>
                            <div class="circle">ana</div>
                        </div>
                        <p>Most Played</p>
                    </div>
                    <div class="column">
                        <p class="title">69</p>
                        <p class="subtitle" style="margin-bottom: 0;">WINS</p>
                        <p>Summer 2023</p>
                    </div>
                </div>
                <!-- <div class="user-experience"></div> -->
            </div>
        </main>
    </div>
</template>

<style lang="scss">
.dashboard {
    background-color: #eee;
    min-height: 700px;
    padding-bottom: 100px;
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

#user-profile {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #f4f4f4;
    border-radius: 1rem;
    padding: 1rem;
}
#user-info {
    display: flex;
    width: 50%;
    min-width: 300px;
    align-items: center;
    justify-content: space-between;
    :last-child {
        width: 80%;
    }
    .tag {
        width: 40%;
        background-color: rgb(201, 199, 199);
    }
}
#game-circles {
    display: flex;
    gap: 0.5rem;
}
.circle {
    flex-grow: 1;
    aspect-ratio: 1;
    border-radius: 50%; 
    background-color: gray;

    /* Center Text For Most Played Games */
    display: flex;
    align-items: center;
    justify-content: center;
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

            // Cache the guilds in the store
            if(!this.$store.getters.getGuilds.list
               || this.$store.getters.getGuilds.lastUpdated < Date.now() - 1000 * 60 * 60) {
                /*fetch('https://discord.com/api/users/@me/guilds', {
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + this.$store.getters.getToken
                    }
                })
                .then(res => res.json())
                .then(json => {
                    this.$store.commit('setGuilds', json)
                    this.guilds = json.filter(guild => guild.permissions & PERMISSIONS.MANAGE_SERVER)
                })
                .catch(console.error)*/
            } else {
                this.guilds = this.$store.getters.getGuilds.filter(guild => guild.permissions & PERMISSIONS.MANAGE_SERVER)
            }


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