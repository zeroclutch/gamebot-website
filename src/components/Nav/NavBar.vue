<template>
    <b-navbar transparent>
        <template #brand>
            <b-navbar-item class="navbar-brand" tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/images/brand/logo-icon.svg"
                    alt="Gamebot Logo"
                >
            </b-navbar-item>
        </template>

        <template #start>
            <b-navbar-item class="has-text-white" tag="router-link" :to="{ path: '/' }">
                Home
            </b-navbar-item>
            <b-navbar-item class="has-text-white" tag="router-link" :to="{ path: '/commands' }">
                Commands
            </b-navbar-item>
            <b-navbar-item  class="has-text-white" tag="router-link" :to="{ path: '/shop' }">
                Shop
            </b-navbar-item>
            <b-navbar-item  class="has-text-white" tag="router-link" :to="{ path: '/blog' }">
                <!-- <b-button type="is-warning" inverted> -->
                    Blog<b-tag rounded class="tag is-small" type="is-danger" v-if="Date.now() < 1682002316000">NEW!</b-tag>
                <!-- </b-button> -->
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item>
                <nav-balance v-if="$store.getters.getToken && $route.path === '/shop'" :credits="$store.state.dbInfo.credits" :gold="$store.state.dbInfo.gold" />
                <div class="buttons">
                    <b-button v-if="!$store.getters.getToken" tag="router-link" icon-left="discord" icon-pack="fab" type="is-discord" inverted :to="{ path: '/login' }">
                        Log in with Discord
                    </b-button>
                    <b-dropdown aria-role="list" class="user-actions" position="is-bottom-left" :mobile-modal="false" v-else>
                        <template #trigger="{ active }">
                            <b-button
                                :label="getUserTag"
                                icon-left="user" icon-pack="fas" type="is-discord"
                                :icon-right="active ? 'caret-up' : 'caret-down'" />
                        </template>
                        <b-dropdown-item @click="$store.dispatch('logout')" class="has-background-danger has-text-white" aria-role="listitem">Log out</b-dropdown-item>
                    </b-dropdown>
                </div>
            </b-navbar-item>
        </template>

        <template #burger>
            <div class="navbar-end is-burger">
            <a class="navbar-item">
                <nav-balance size="is-small" v-if="$store.getters.getToken && $route.path === '/shop'"  :credits="$store.state.dbInfo.credits" :gold="$store.state.dbInfo.gold" />

                <a role="button" v-on:click="toggleSidebar" aria-label="menu" class="navbar-burger burger">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </a>
            </div>
        </template>
    </b-navbar>
</template>

<script>
import NavBalance from './NavBalance.vue'
export default {
  components: { NavBalance },
  name: 'NavBar',
  props: {
    activeRoute: String
  },
  data() {
      return {
      }
  },
  computed: {
    getUserTag() {
        let user = this.$store.state.user
        return `${user.username || 'user'}#${user.discriminator || '0000'}`
    }
  },
  methods: {
    toggleSidebar() {
        this.$emit('toggleSidebar')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav.navbar {
    background-color: unset;
    max-width: $widescreen;
    margin: 0 auto;
}
nav.navbar .navbar-brand {
    margin-right: 15px;
    margin-top: -6px;
}

nav .navbar-burger {
  color: white;
}


a.navbar-item {
    padding: 0 8px;
}

.tag.is-small {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
    margin-left: 5px;
}

.user-actions {
    text-align: right;
}

a.navbar-item:focus-within, .navbar-item:focus { background-color: unset; }
.is-burger {
    margin-left: auto;
    @include tablet {
        display: none;
    }
}
</style>
