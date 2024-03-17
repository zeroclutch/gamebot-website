<template>
  <div id="app">
    <b-modal class="purchase-modal-wrapper" :active="$store.state.purchase.modalOpen" @close="$store.commit('togglePurchaseModal')">
      <PurchaseModal :class="{ 'is-dark-mode': $store.state.purchase.modalItems === 'gold' }"  />
    </b-modal>
    <div class="navbar-wrapper">
      <div class="navbar-background" :class="{ pinned: isPinned }">
        <NavBar @toggleSidebar="toggleSidebar" />
      </div>
    </div>
    <div class="router-wrapper" :class="{ pinned: isPinned }">
      <router-view class="router-view"/>
    </div>
    <NavSidebar :active-route="activeRoute" :open="navOpen" @close="closeNav"/>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/Nav/NavBar.vue'
import NavSidebar from '@/components/Nav/NavSidebar.vue'
import Footer from '@/components/Page/PageFooter.vue'
import PurchaseModal from '@/components/Purchase/PurchaseModal.vue'

export default {
  components: {
    NavBar,
    NavSidebar,
    Footer,
    PurchaseModal
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
    },
    isPinned() {
      return this.scrollPosition > 1 || this.activeRoute.startsWith('/dashboard')
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
    async initialize() {
      await this.$store.dispatch('fetchAllUserInfo')
      await this.$store.dispatch('checkout/init')
    }
  },
  beforeMount() {
    this.initialize()
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
@import "@/assets/styles/buefy.scss";

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

.router-wrapper {
  margin-top: 0;
  &.pinned {
    margin-top: -3.5rem;
  }
}

.navbar-wrapper {
  margin-bottom: -3.5rem;
  max-height: 4rem;
  z-index: 30;
  .navbar-background {
    z-index: 30;
    background-color: unset;
    transition: all 0.2s;
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    .navbar-end {
      padding-right: 20px;
    }
    &.pinned {
      background-color: rgba(78, 77, 83, 0.7);
      backdrop-filter: blur(10px);
      color: black;
    }
  }
}

</style>
