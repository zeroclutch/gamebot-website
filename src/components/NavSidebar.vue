<template>
<section>
<b-sidebar
    type="is-white"
    position="fixed"
    fullheight
    overlay
    :open="open"
    v-on:close="closeNav"
    right
>
    <div class="menu-list-wrapper">
        <b-menu>
            <b-menu-list label="Navigation">
                <b-menu-item :active="activeRoute === '/'" v-on:click="closeNav" label="Home" tag="router-link" to="/"></b-menu-item>
                <b-menu-item :active="activeRoute === '/commands'" v-on:click="closeNav" label="Commands" tag="router-link" to="/commands"></b-menu-item>
                <b-menu-item :active="activeRoute === '/shop'" v-on:click="closeNav" label="Shop" tag="router-link" to="/shop"></b-menu-item>
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
    activeRoute: String
  },
  methods: {
      closeNav() {
        if(this.debug) console.log(`this.$store.state.nav.open ${this.$store.state.nav.open}`)
        this.$store.state.nav.open = false
      }
  },
  computed: {
      open() {
        return this.$store.state.nav.open
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .menu-list-wrapper {
        padding: 1rem;
    }
</style>
