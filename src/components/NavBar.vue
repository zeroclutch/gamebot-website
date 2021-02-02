<template>
<b-navbar transparent>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/images/brand/logo.png"
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
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button tag="router-link" icon-left="discord" pack="fab" type="is-discord" inverted :to="{ path: 'login' }">
                        Log in with Discord
                    </b-button>
                </div>
            </b-navbar-item>
        </template>

        <template #burger>
            <a role="button" v-on:click="toggleSidebar" aria-label="menu" class="navbar-burger burger">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    activeRoute: String
  },
  methods: {
    toggleSidebar() {
        this.$emit('toggleSidebar')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav.navbar { background-color: unset ; }
nav .navbar-burger {
  color: white;
}

</style>
