<template>
  <div class="home is-clipped-x">
    <HomeHero faded-text="Play fun multiplayer games on Discord with " title="Gamebot!"/>
    <HomeStatusBar />
    <section class="section home-section">
      <div class="container is-max-widescreen content columns is-centered is-vcentered">
        <article class="column is-half">
          <h1
            v-animate-onscroll="'fade-in-delayed'"
            class="faded-out is-1 has-text-left has-text-white section-title">
            <span class="has-text-faded">Make every night a </span>game night.
          </h1>
          <p
            v-animate-onscroll="'fade-in-delayed'"
            class="faded-out has-text-left has-text-white">
            Small group? Grab some friends and start a game of <b>Cards Against Humanity.</b> Running a big server? Start a weekly <b>Chess</b> tournament and get people coming back.
            <br><br>With Gamebot, there’s something for everyone.
            <br><br>
            
            <b-button
              class="button-home"
              icon-pack="fab"
              icon-left="discord"
              type="is-discord"
              size="is-medium"
              tag="a"
              @click="addToDiscord()"
              :target="isEmbed ? '_blank' : ''"
              href="/invite?ref=homepage">
                  <span>Add to Discord</span>
              </b-button>
          </p>
        </article>
        <div class="column is-half">
          <b-image
            v-animate-onscroll="'fade-in-delayed'"
            :srcset="[256,512,1024].map(s => require(`@/assets/images/graphics/${s}w/game_night_graphic.png`) + `.webp ${s}w`).join(', ')"
            :webp-fallback="require('@/assets/images/graphics/1024w/game_night_graphic.png')"
            class="faded-out"
            draggable="false"
            alt="Gamebot in action 1" />
        </div>
      </div>
    </section>

    <section class="section home-section home-section-alternate">
      <div class="container is-max-widescreen content columns is-centered is-vcentered">
        <div class="column is-half">
          <b-image
            v-animate-onscroll="'fade-in-delayed'"
            class="faded-out"
            :srcset="[256,512,1024].map(s => require(`@/assets/images/graphics/${s}w/seriously_fun_graphic.png`) + `.webp ${s}w`).join(', ')"
            :webp-fallback="require('@/assets/images/graphics/1024w/seriously_fun_graphic.png')"
            draggable="false" alt="Gamebot in action" />
        </div>
        <article class="column is-half">
          <h1
            v-animate-onscroll="'fade-in-delayed'"
            class="faded-out is-1 has-text-left has-text-white section-title">
            <span class="has-text-faded">Fun. </span>Seriously.
          </h1>
          <p
            v-animate-onscroll="'fade-in-delayed'"
            class="faded-out has-text-left has-text-white v">
            When it comes to messing around, Gamebot doesn't mess around. Each game is high-quality, highly configurable, and tons of fun. Plus, use unique features like drawing to share artwork in Discord.
            <br><br>
            <b-button
              class="button-home"
              icon-pack="fab"
              icon-left="discord"
              type="is-discord"
              size="is-medium"
              tag="a"
              :target="isEmbed ? '_blank' : ''"
              @click="addToDiscord()"
              href="/invite?ref=homepage">
                  <span>Add to Discord</span>
              </b-button>
          </p>
        </article>
      </div>
    </section>

    <section class="section home-section">
      <div class="container is-max-widescreen content columns is-centered is-vcentered">
        <article class="column is-half">
          <h1
            v-animate-onscroll="'fade-in-delayed'"
            class="faded-out is-1 has-text-left has-text-white section-title">
            <span class="has-text-faded">Play your own way.</span><br>All day, every day.
          </h1>
          <p
            v-animate-onscroll="'fade-in-delayed'"
            class="faded-out has-text-left has-text-white">
            With tons of skins, expansions, and other additional content, the fun doesn’t stop at gaming. Unlock new items at the shop, grow your profile, and more.
            <br><br>
            <b-button
              class="button-home"
              icon-pack="fas"
              icon-left="store"
              type="is-warning"
              size="is-medium"
              tag="a"
              :target="isEmbed ? '_blank' : ''"
              href="/shop">
                  <span>Check out the shop</span>
              </b-button>
          </p>
        </article>
        <div class="column is-half">
          <b-image
            v-animate-onscroll="'fade-in-delayed'"
            :srcset="[256,512,1024].map(s => require(`@/assets/images/graphics/${s}w/play_your_way_graphic.png`) + `.webp ${s}w`).join(', ')"
            :webp-fallback="require('@/assets/images/graphics/1024w/play_your_way_graphic.png')"
            class="faded-out"
            draggable="false"
            alt="Gamebot in action" />
        </div>
      </div>
    </section>


    <section class="section home-section columns">
      <div class="container is-max-widescreen content columns is-centered has-text-centered">
        <div class="home-cta">
          <div class="home-cta-wrapper">
            <h1 class="is-1 has-text-white"
                v-animate-onscroll="'fade-in-delayed'">Let's make your server awesome.</h1>
            <b-button
              v-animate-onscroll="'fade-in-delayed'"
              class="button-home"
              icon-pack="fab"
              icon-left="discord"
              type="is-discord"
              size="is-medium"
              inverted
              tag="a"
              :target="isEmbed ? '_blank' : ''"
              @click="addToDiscord()"
              href="/invite?ref=homepage">
                  <span>Add to Discord</span>
              </b-button>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">

.is-clipped-x {
  overflow-x: hidden;
  position: relative;
}

.home {
  .section-title {
    font-weight: bold;
  }

  p {
    font-size: 1.25rem;
  }

  .home-section {
    padding: 8em 1rem;
    background-color: #202225;
    margin: 0;
  }
  
  .home-section-alternate {
    background-color: #232730;
  }

  .has-text-faded {
    opacity: 0.8;
  }
  .is-centered {
    margin: 0 auto;
  }

  .columns {
    margin-top: 0;
    margin-bottom: 0;
  }

  .home-cta {
    margin: 0 auto;
    border-radius: 12px;
    background: 
      conic-gradient(from 127.75deg at 50% 43.53%, #33CEFF 0deg, rgba(206, 84, 226, 0.962972) 110.62deg, #997EE5 198.75deg, #51B7EA 317.02deg, #79EAC1 360deg)
      #997EE5;
    padding: 2em;
    width: calc(100% - 4em);
    height: 80vh;
    position: relative;

    .home-cta-wrapper {
      position: relative;
      top: 50%;
      transform: translateY(-50%);      
    }
  }
}
</style>

<script>
// @ is an alias to /src
import HomeHero from '@/components/Home/HomeHero.vue'
import HomeStatusBar from '@/components/Home/HomeStatusBar.vue'

export default {
  name: 'Home',
  components: {
    HomeHero,
    HomeStatusBar,
  },
  data() {
    return {
      isEmbed: false,
    }
  },
  methods: {
    addToDiscord() {
      this.$gtag.event('add_to_discord', {'event_label': 'Homepage'})
    },
    srcsetFormatter(_src, size) {
      console.log(require(`@/assets/images/graphics/${size}w/game_night_graphic.png`) + '.webp')
      return require(`@/assets/images/graphics/${size}w/game_night_graphic.png`) + '.webp'
      // `@/assets/images/graphics/${size}w/game_night_graphic.webp`
      // return require(`@/assets/images/graphics/${size}w/game_night_graphic.webp`)
    }
  }
}
</script>