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
            <div class="column user-dashboard">
                <div class="user-profile">
                    <div class="user-info">
                        <div class="circle"></div> <!-- Replace with image -->
                        <div class="user-info-text">
                            <h1 class="user-username user-info-row">table salt<span class="user-discriminator">#1234</span></h1>
                            <div class="user-info-tags">
                                <b-tag rounded>Legend</b-tag>
                                <b-tag rounded>4K Club</b-tag>
                            </div>
                        </div>
                    </div>
                    <div class="column user-statistic">
                        <div class="game-circles user-info-row">
                            <div class="circle">cah</div>
                            <div class="circle">sus</div>
                            <div class="circle">ana</div>
                        </div>
                        <p class="statistic-description">Most Played</p>
                    </div>
                    <div class="column user-statistic">
                        <div class="user-info-row">
                            <p class="statistic-title">69</p>
                            <p class="statistic-subtitle" style="margin-bottom: 0;">WINS</p>
                        </div>
                        <p class="statistic-description">Summer 2023</p>
                    </div>
                </div>
                <div class="user-experience">
                    <div class="xp-progress-bar">
                        <div class="current-progress"></div>
                    </div>
                    <p class="xp-progress-label">
                        <b>Level 27</b>
                        &nbsp;1.2K / 1.5K Experience
                    </p>

                    <div class="rewards-basic rewards-container">
                        <div class="reward-container">
                            <div class="reward"></div>
                            <p class="reward-label">27</p>
                        </div>
                        <div class="reward-container">
                            <div class="reward"></div>
                            <p class="reward-label">27</p>
                        </div>
                        <div class="reward-container">
                            <div class="reward locked"></div>
                            <p class="reward-label">27</p>
                        </div>
                        <div class="reward-container">
                            <div class="reward locked"></div>
                            <p class="reward-label">27</p>
                        </div>
                        <div class="reward-container">
                            <div class="reward locked"></div>
                            <p class="reward-label">27</p>
                        </div>
                    </div>
                    <div class="rewards-premium rewards-container locked">
                        <div class="reward-container">
                            <div class="reward"></div>
                        </div>
                        <div class="reward-container">
                            <div class="reward"></div>
                        </div>
                        <div class="reward-container">
                            <div class="reward"></div>
                        </div>
                        <div class="reward-container">
                            <div class="reward"></div>
                        </div>
                        <div class="reward-container">
                            <div class="reward"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss">
$user-info-row-height: 2.5rem;

.dashboard {
    text-align: left;
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

    a.inline-link {
        padding: 0;
        display: inline;
        margin: 0;

        &:hover {
            background-color: transparent;
        }
    }
}

.user-profile,
.user-experience {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 1rem;
    padding: 1rem;
}

.user-profile {
    background-color: #f5f5f5;
    margin-bottom: 1rem;
}

.user-experience {
    flex-direction: column;
}

.user-dashboard > *, .user-experience > * {
    margin-top: 1rem;
}

.user-info {
    display: flex;
    width: 50%;
    min-width: 300px;
    align-items: center;
    justify-content: space-between;
    :last-child {
        width: 80%;
    }

    .user-info-text {
        padding: 1rem;
    }

    .user-username {
        font-size: 1.5rem;
        margin: 0;
        align-items: center;
        gap: 0.5rem;
        font-weight: bold;
    }

    .user-discriminator {
        font-size: 1rem;
        color: rgb(201, 199, 199);
    }

    .user-info-tags {
        display: flex;
        gap: 0.5rem;
        .tag {
            background-color: rgb(201, 199, 199);
            display: inline-flex;
            justify-content: left;
        }
    }
}

.user-info-row {
    height: $user-info-row-height;
    overflow: hidden;
    margin: 0;
}

.user-statistic {
    text-align: center;
    .statistic-title {
        font-size: 1.8rem;
        line-height: 100%;
        margin: 0;
        font-weight: bold;
    }
    .statistic-subtitle {
        font-size: 0.8rem;
        text-transform: uppercase;
        font-weight: bold;
        line-height: 100%;
        margin: 0;
    }
    .statistic-description {
        font-size: 0.8rem;
        text-transform: uppercase;
        font-weight: bold;
        line-height: 100%;
        padding: 0.35rem 0;
        margin: 0;
        color: rgb(201, 199, 199);
    }
}

.game-circles {
    display: block;

    .circle {
        height: $user-info-row-height;
        width: $user-info-row-height;
        
        display: inline-flex;
        margin: 0 0.25rem;
        font-size: 0.8rem;
        font-weight: bold;
        color: white;
    }
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

.user-experience {
    .xp-progress-bar {
        min-height: 2rem;
        height: 10%;
        width: 100%;
        background-color: gray;
        border-radius: 0.5rem;
    }

    .current-progress {
        position: relative;
        height: inherit;
        min-height: inherit;
        border-radius: inherit;
        width: 50%;
        background-color: rgb(58, 57, 57);
    }

    .xp-progress-label {
        align-self: flex-start;
        margin-left: 0.5rem;
        text-transform: uppercase;
    }
}
.rewards-container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    gap: 2.5%;

    .reward-container {
        width: 20%;
        text-align: center;
    }

    .reward-label {
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: bold;
        line-height: 100%;
        padding: 0.35rem 0;
        margin: 0.5rem 0;
    }

    .reward {
        background-color: lightgray;
        width: 100%;
        aspect-ratio: 1;
        border-radius: 0.5rem;
        z-index: 1;
        &.locked {
            background-color: gray;
        }
    }

    &.locked::before {
        position: absolute;
        display: grid;
        align-items: center;
        text-align: center;
        color: $warning;
        font-weight: bold;
        content: 'Unlock with Gamebot Premium!';
        width: inherit;
        height: inherit;
        border-radius: 0.5rem;
        background-color: rgba(0, 0, 0, 0.7);
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
                userID = `?userId=${this.$store.getters.getUser.id}`
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
                fetch('https://discord.com/api/users/@me/guilds', {
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
                .catch(console.error)
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