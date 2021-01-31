<template>
  <div id="app">
    <div class="navbar-wrapper">
      <NavBar />
    </div>
    <router-view/>
    <NavSidebar :active-route="activeRoute" />
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
  computed: {
    activeRoute() {
      if(this.debug) console.log('route ' + this.$route.path)
      return this.$route.path
    }
  }
}
</script>

<style lang="scss">

#app {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.navbar-wrapper {
  margin-bottom: -3.5rem;
  max-height: 4rem;
  nav {
    background-color: unset;
  }
}
</style>
