<template>
  <div id="app">
    <div class="navbar-wrapper">
      <NavBar @toggleSidebar="toggleSidebar" />
    </div>
    <router-view/>
    <NavSidebar :active-route="activeRoute" :open="navOpen" @close="closeNav"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NavSidebar from '@/components/NavSidebar.vue'

export default {
  components: {
    NavBar,
    NavSidebar
  },
  data() {
    return {
      navOpen: false
    }
  },
  computed: {
    activeRoute() {
      return this.$route.path
    }
  },
  methods: {
    toggleSidebar() {
      this.navOpen = !this.navOpen
    },
    closeNav() {
      this.navOpen = false
    }
  }
}
</script>

<style lang="scss">
// Global styles
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  .is-hidden-mobile, .is-0-mobile {
      @include mobile {
          display: none;
      }
  }
}

.navbar-wrapper {
  margin-bottom: -3.5rem;
  max-height: 4rem;
  nav {
    background-color: unset;
  }
}
</style>
