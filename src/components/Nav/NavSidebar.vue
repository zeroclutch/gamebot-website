<template>
    <section class="nav-sidebar">
        <b-sidebar
            position="fixed"
            fullheight
            overlay
            :open="open"
            v-on:close="closeNav"
            right
        >
            <div class="menu-list-wrapper">
                <b-menu>
                    <b-menu-list label="Navigation" class="nav-sidebar-list"> 
                        <b-menu-item :active="activeRoute === '/'" @click="closeNav()" label="Home" tag="router-link" to="/"></b-menu-item>
                        <b-menu-item :active="activeRoute === '/commands'" @click="closeNav()" label="Commands" tag="router-link" to="/commands"></b-menu-item>
                        <b-menu-item :active="activeRoute === '/shop'" @click="closeNav()" label="Shop" tag="router-link" to="/shop"></b-menu-item>
                    </b-menu-list>
                    <b-menu-list label="User" v-if="!$store.getters.getToken">
                        <b-menu-item  icon="discord" icon-pack="fab" class="login-button" @click="closeNav()" label="Login with Discord" tag="router-link" to="/login"></b-menu-item>
                    </b-menu-list>
                    <b-menu-list label="User" v-else>
                        <b-menu-item  icon="sign-out-alt" icon-pack="fas"  class="logout-button" @click="$store.dispatch('logout')" label="Logout"></b-menu-item>
                    </b-menu-list>
                </b-menu>
            </div>
        </b-sidebar>
    </section>
</template>

<script>
export default {
  name: 'NavSidebar',
  props: {
    open: Boolean,
    activeRoute: String
  },
  methods: {
      closeNav() {
          this.$emit('close')
      }
  }
}
</script>

<style lang="scss">
.b-sidebar .sidebar-content.is-right {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    .menu-list-wrapper {
        padding: 1rem;
        .menu-list .login-button a {
            background-color: $discord;
            color: #fff;
            &:hover {
                background-color: $discord;
            }
        }
        .menu-list .logout-button a {
            background-color: $danger;
            color: #fff;
            &:hover {
                background-color: $danger-dark;
            }
        }
    }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
