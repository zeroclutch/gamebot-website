<template>
    <div class="dashboard">
        <!-- Server-specific settings -->
        <router-link tag="a" class="dashboard-banner box" to="/shop">
            <div class="dashboard-banner-content">
                <h1 class="title is-5">Customize your profile!</h1>
                <p class="subtitle is-6">Unlock more skins in the Gamebot shop.</p>
            </div>
        </router-link>
        <main class="dashboard-content columns box">
            <aside class="sidebar column">
                <b-menu-list
                    :model="page">
                    <div class="p-1">
                        <b-menu>
                        <b-menu-list
                        type="is-primary"
                        label="PROFILE">
                            <b-menu-item :active="page === 'Overview'" @click="page = 'Overview'" icon="user" label="Overview" aria-selected="true"></b-menu-item>
                            <b-menu-item :active="page === 'Statistics'" @click="page = 'Statistics'" icon="chart-line" label="Statistics"></b-menu-item>
                            <b-menu-item :active="page === 'Achievements'" @click="page = 'Achievements'" icon="trophy" label="Achievements"></b-menu-item>
                        </b-menu-list>
                        <!-- Server list -->
                        <!--b-menu-list label="SERVERS">
                            <b-menu-item v-for="guild in guilds" :key="guild.id">
                                <template #label>
                                    <span class="icon guild-icon">
                                        <img :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`" />
                                    </span>
                                    <span class="guild-name">{{ guild.name }}</span>
                                </template>
                            </b-menu-item>
                            <b-message v-if="guilds.length === 0" type="is-warning">No servers found. <router-link class="inline-link" to="/invite">Invite Gamebot</router-link> to your server to get started!</b-message>

                            <b-button v-if="!$store.getters.getToken" tag="router-link" icon-left="discord" icon-pack="fab" type="is-discord" inverted :to="{ path: '/login' }">
                                Log in with Discord
                            </b-button>
                        </b-menu-list-->
                        </b-menu>
                    </div>
                </b-menu-list>
            </aside>
            <div class="column user-dashboard">
                <div class="user-profile dashboard-item glass">
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

                <div class="user-status dashboard-item columns">
                    <div class="user-achievements dashboard-item column is-8 glass">
                        <div class="achievement">
                            <p class="achievement-title">Unscrambler</p>
                            <div class="achievement-info">
                                <p class="achievement-description">Play 3 games of Anagrams</p>
                                <p class="achievement-progress-label">1/3 games</p>
                            </div>
                            <div class="achievement-progress">
                                <div class="achievement-progress-bar"></div>
                            </div>
                        </div>

                        <div class="achievement">
                            <p class="achievement-title">Unscrambler</p>
                            <div class="achievement-info">
                                <p class="achievement-description">Play 3 games of Anagrams</p>
                                <p class="achievement-progress-label">1/3 games</p>
                            </div>
                            <div class="achievement-progress">
                                <div class="achievement-progress-bar"></div>
                            </div>
                        </div>
                    </div>
                    <div class="user-balance dashboard-item column glass">
                        <div class="user-balance-content">
                            <p class="user-balance-currency">
                                <img class="currency-icon" src="@/assets/images/currency/credits-display.png" alt="Gamebot Credits" />
                                <b>Credits</b>
                            </p>
                            <p class="user-balance-amount">1,000</p>
                        </div>

                        <div class="user-balance-content">
                            <p class="user-balance-currency">
                                <img class="currency-icon" src="@/assets/images/currency/coin.png" alt="Gamebot Gold" />
                                <b>Gold</b>
                            </p>
                            <p class="user-balance-amount">10</p>
                        </div>
                    </div>
                </div>

                <div class="xp-progress-bar dashboard-item glass">
                    <div class="current-progress">
                    </div>
                    <p class="xp-progress-label">
                        <b>Level 27</b>
                        &nbsp;1.2K / 1.5K Experience
                    </p>
                </div>

                <div class="user-experience dashboard-item">    
                    <div class="rewards-basic rewards-container">
                        <div class="reward-container">
                            <div class="reward glass"></div>
                            <p class="reward-label">27</p>
                        </div>
                        <div class="reward-container">
                            <div class="reward glass"></div>
                            <p class="reward-label">27</p>
                        </div>
                        <div class="reward-container">
                            <div class="reward glass locked"></div>
                            <p class="reward-label">27</p>
                        </div>
                        <div class="reward-container">
                            <div class="reward glass locked"></div>
                            <p class="reward-label">27</p>
                        </div>
                        <div class="reward-container">
                            <div class="reward glass locked"></div>
                            <p class="reward-label">27</p>
                        </div>
                    </div>
                </div>
                <div class="user-footer dashboard-item glass">
                    <div class="user-footer-left">
                        Summer 2023 / Gamebot for Discord
                    </div>
                    <div class="user-footer-right">
                        <a class="share has-text-black" href="#">Share</a>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss">
$dashboard-width: $widescreen;
$user-info-row-height: 2.5rem;

.glass { 
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(30px);
}

.dashboard {
    text-align: left;
    background-color: #eee;
    min-height: 700px;
    padding: 150px 20px;
    flex-direction: column;
    align-items: center;

    .dashboard-banner {
        background: url('/img/dashboard-banner.jpg') no-repeat center center;
        background-color: $gold;
        max-width: $dashboard-width;
        margin: 0 auto 24px auto;
        &:hover {
            box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px $gold;
        }

    }

    .dashboard-content {
        position: relative;
        max-width: $dashboard-width;
        padding: 0;
        overflow: hidden;
        margin: 0 auto;

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

.user-dashboard {
    background-image: url('https://i.pinimg.com/originals/f7/4c/e6/f74ce6007b53858d32503641f6dd88ba.jpg');
    background-size: cover;
    background-color: #eee;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.dashboard-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 1rem;
    padding: 1rem;
    margin: 0;
}

.user-experience {
    padding: 0;
    flex-direction: column;
}

.user-dashboard > *, .user-experience > * {
    // margin-top: 1rem;
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

.xp-progress-bar {
    position: relative;
    min-height: 3rem;
    width: 100%;
    border-radius: 0.5rem;
}

.current-progress {
    position: absolute;
    left: 0;
    top: 0;
    height: inherit;
    min-height: inherit;
    border-radius: inherit;
    width: 70%;
    // background-color: rgb(58, 57, 57);
    background: linear-gradient(102.34deg, rgba(206, 84, 226, 0.962972) 49.62%, #33CEFF 109.32%);
}

.xp-progress-label {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    text-transform: uppercase;
    color: white;
}

.user-status {
    margin: 0;
    padding: 0;
    gap: 1rem;
}

// Achievements

.user-achievements {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.achievement {
    width: 100%;
    .achievement-title {
        font-size: 0.8rem;
        line-height: 1;
        font-weight: bold;
        margin: 0;
    }

    .achievement-info {
        display: flex;
        font-size: 0.8rem;
        margin: 0;
        justify-content: space-between;
    }


    .achievement-progress {
        position: relative;
        width: 100%;
        height: 0.5rem;
        border-radius: 0.5rem;
        background-color: $light;
        .achievement-progress-bar {
            position: absolute;
            left: 0;
            top: 0;
            height: inherit;
            border-radius: inherit;
            width: 33%;
            background-color: $primary;
        }
    }
}

// Balance

.user-balance {
    display: flex;
    align-items: center;
    .user-balance-content {
        display: flex;
        justify-content: space-between;
        width: 100%;

    }

    .user-balance-currency {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
        font-weight: bold;
        margin: 0;
    }

    .currency-icon {
        width: 2rem;
        height: 2rem;
    }

    .user-balance-amount {
        display: flex;
        font-size: 0.8rem;
        line-height: 2rem;
    }
}

// Rewards

.rewards-container {
    display: flex;
    position: relative;
    width: 100%;
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
        width: 100%;
        aspect-ratio: 1;
        border-radius: 0.5rem;
        z-index: 1;
        &.locked {
            background-color: rgba(0, 0, 0, 0.75);
        }
    }

    &.locked::after {
        position: absolute;
        display: grid;
        align-items: center;
        text-align: center;
        color: $warning;
        font-weight: bold;
        content: 'Unlock with Gamebot Premium!';
        width: inherit;
        height: 100%;
        border-radius: 0.5rem;
        background-color: rgba(0, 0, 0, 0.7);
    }
}

.user-footer {
    padding: 0.25rem 1rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
}

</style>

<script>

export default {
    name: 'Dashboard',
    components: {   
    },
    data() {
        return {
            loading: true,
            data: {},
            activeItem: {},
            page: 'Overview',
            guilds: [],
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

        setPage(page) {
            this.page = page
        }
    },
    mounted() {
        Promise.all(this.fetchGuilds(), this.fetchItems())
        .then(() => {
            this.loading = false
        })
    },
}

</script>