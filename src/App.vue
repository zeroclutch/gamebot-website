<template>
  <div id="app">
    <div class="navbar-wrapper">
      <NavBar :class="{ pinned: scrollPosition > 1}" @toggleSidebar="toggleSidebar" />
    </div>
    <router-view/>
    <NavSidebar :active-route="activeRoute" :open="navOpen" @close="closeNav"/>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/Nav/NavBar.vue'
import NavSidebar from '@/components/Nav/NavSidebar.vue'
import Footer from '@/components/Page/PageFooter.vue'

export default {
  components: {
    NavBar,
    NavSidebar,
    Footer
  },
  data() {
    return {
      navOpen: false,
      scrollPosition: 0
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
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
  },
  beforeMount() {
    this.$store.dispatch('fetchAllUserInfo')
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScroll)
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
    transition: all 0.2s;
    &.pinned {
      position: fixed;
      top: 0; left: 0;
      background-color: rgba(78, 77, 83, 0.7);
      width: 100vw;
      backdrop-filter: blur(10px);
      color: black;
      .navbar-end {
        padding-right: 20px;
      }
    }
  }
}

</style>
