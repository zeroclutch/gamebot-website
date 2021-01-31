<template>
  <div class="home">
    <HeroHomepage faded-text="Play fun multiplayer games on Discord with " title="Gamebot!"/>
    <StatusBar />
  </div>
</template>

<script>
// @ is an alias to /src
import HeroHomepage from '@/components/HeroHomepage.vue'
import StatusBar from '@/components/StatusBar.vue'

export default {
  name: 'Home',
  components: {
    HeroHomepage,
    StatusBar
  }
}
</script>