<template>
<section>
    <section class="gb-hero m-0">
        <div class="hero-content-wrapper columns">
            <div class="column is-7">
                <h1 class="title main-title"><span class="faded-text">{{ fadedText }}</span>{{ title }}</h1>
                <h3 class="title is-marginless main-title"></h3>
                
                <div class="button-container">
                    <div class="button-holder">
                        <b-button
                        class="button-home"
                        icon-pack="fab"
                        icon-left="discord"
                        type="is-discord"
                        size="is-large is-medium-mobile"
                        tag="a"
                        :target="isEmbed ? '_blank' : ''"
                        @click="$gtag.event('add_to_discord', {'event_category': 'community_update','event_label': 'Homepage'})"
                        href="/invite?ref=homepage">
                            <span>Add to Discord</span>
                        </b-button>
                    </div>
                    <div class="button-holder">
                        <b-button
                        class="button-home"
                        icon-pack="fas"
                        icon-left="users"
                        type="is-discord" inverted
                        size="is-large"  
                        :target="isEmbed ? '_blank' : ''"
                        @click="$gtag.event('join_community', {'event_category': 'community_update','event_label': 'Homepage'})"
                        tag="a"
                        href="/discord?ref=homepage">
                            <span>Join the community</span>
                        </b-button>
                    </div>
                </div>
            </div>
            <div class="column is-hidden-mobile">
                <Discord
                    :channel="channel" 
                    blur
                    class="discord-holder hero-holder">
                    <div class="discord-animated">
                    <CardsAgainstHumanity v-if="mockup === 0" />
                    <Chess v-if="mockup === 1" />
                    <Anagrams v-if="mockup === 2" />
                    <SurveySays v-if="mockup === 3" />
                    </div>
                </Discord>
            </div>
        </div>
    </section>
    <PageGradient class="gradient-canvas" :colors="['#79eac1', '#79eac1', '#33ceff', '#e550d3', '#5865F2']"></PageGradient>

</section>
</template>


<script>
import Discord from '@/components/Discord/Discord.vue'

import CardsAgainstHumanity from '@/components/Mockups/CardsAgainstHumanity.vue'
import Chess from '@/components/Mockups/Chess.vue'
import Anagrams from '@/components/Mockups/Anagrams.vue'
import SurveySays from '@/components/Mockups/SurveySays.vue'

import PageGradient from '@/components/Page/PageGradient.vue'

export default {
  name: 'HeroHomepage',
  components: {
      Discord,
      Anagrams,
      Chess,
      CardsAgainstHumanity,
      SurveySays,
      PageGradient
  },
  props: {
    title: String,
    subheading: String,
    fadedText: String,
  },
  data() {
      return {
          mockups: ['cards-against-humanity', 'chess' , 'anagrams', 'survey-says'],
          mockupIndex: 0
      }
  },
  methods: {
      updateHeight() {
          let wrapper = document.querySelector('.discord-animated')
          let content = document.querySelector('.discord-mockup-content')
          if(wrapper && content) {
            let style = getComputedStyle(content)
            wrapper.style.height = style.getPropertyValue('height')
          }
      },
      async loadIn() {
          this.updateHeight()
          let ms = 200;
          let els = document.querySelectorAll('.discord-holder .discord-animated .discord-mockup-content > *')
          for(let i = 0; i < els.length; i++) {
                let el = els[i]
                await this.sleep(ms)
                el.classList.add('fade-in')
                el.classList.remove('fade-out')
                // Get new height of wrapper
          }
          await this.sleep(5000)
          this.loadOut()
          
          this.updateHeight()
      },
      
      async loadOut() {
          let ms = 200;
          let els = document.querySelectorAll('.discord-holder .discord-animated .discord-mockup-content > *')
          for(let i = 0; i < els.length; i++) {
                let el = els[i]
                await this.sleep(ms)
                el.classList.add('fade-out')
                el.classList.remove('fade-in')
          }
          await this.sleep(500 + ms)
          this.nextMockup()
      },
      async sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
      },
      async nextMockup() {
        await this.sleep(100)
        this.mockupIndex++
        await this.sleep(100)
        this.updateHeight()
        this.loadIn()
      },
  },
  computed: {
      mockup() {
        return this.mockupIndex % this.mockups.length
      },
      channel() {
        return this.mockups[this.mockup]
      },
      isEmbed() {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref')
        return ref === 'embed'
      }
  },
   mounted() {
    this.loadIn()
    setInterval(this.updateHeight, 100)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">


.gradient-canvas {
    animation: fade-in-static 2s;
    height: 100%;
    width: 100%;
    min-height: 700px;
    margin-bottom: -6px;
}

.discord-animated {
    transition: all 0.5s;
}

.discord-animated .discord-mockup-content > * {
    opacity: 0;
}

.discord-animated .discord-mockup-content > .fade-in {
    opacity: 0;
}

.discord-animated .discord-mockup-content > .fade-out {
    opacity: 0;
}

.gb-hero {
    background: unset !important;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;

    .hero-content-wrapper {
        margin: 0 auto;
        max-width: $widescreen;
        padding: calc(3.5rem + 20px) 20px 40px;
        text-align: left;
        @include mobile {
            padding: calc(3.5rem + 20px) 20px 10px;
        }
        h1 {
            padding: 20px 20px 20px 0px;
            // font-size: 4rem;
            color: white;
            font-weight: bold;
            margin-bottom: 40px;
            font-size: 3.75rem;

            @include mobile {
                font-size: 2.5rem;
            }
        }

        .faded-text {
            opacity: 0.8;
        }
    }
}

.button-container {
    margin-bottom: 100px;
    .button-holder {
        margin: 20px 0;

        span, span.icon.is-medium {
            font-weight: bold;
        }
        .button.is-large {
            transition: linear all 0.1s;
            filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2));
            -webkit-filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2));
            
            @include mobile {
                font-size: 1rem;
            }
        }
    }
    @include mobile {
        font-size: 14px;
        margin-bottom: 10px;
    }
}

.discord-holder {
    z-index: 3;
}

.hero-holder {
    position: absolute;
    max-width: 400px;
}

</style>
