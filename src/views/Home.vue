<template>
  <div class="home">
    <HomeHero faded-text="Play fun multiplayer games on Discord with " title="Gamebot!"/>
    <HomeStatusBar />
    <HomeGamesList />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeHero from '@/components/Home/HomeHero.vue'
import HomeStatusBar from '@/components/Home/HomeStatusBar.vue'
import HomeGamesList from '../components/Home/HomeGamesList.vue'

export default {
  name: 'Home',
  components: {
    HomeHero,
    HomeStatusBar,
    HomeGamesList
  }
}
</script>