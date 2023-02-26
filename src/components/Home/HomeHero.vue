<template>
<section>
    <section class="gb-hero">
        <div class="hero-content-wrapper columns">
            <div class="column is-7">
                <h1 class="title main-title">
                    <span class="faded-text">{{ fadedText }}</span>
                    <span>{{ title }}</span>
                </h1>
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
                        size="is-large is-medium-mobile"  
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

</section>
</template>


<script>
import Discord from '@/components/Discord/Discord.vue'

import CardsAgainstHumanity from '@/components/Mockups/CardsAgainstHumanity.vue'
import Chess from '@/components/Mockups/Chess.vue'
import Anagrams from '@/components/Mockups/Anagrams.vue'
import SurveySays from '@/components/Mockups/SurveySays.vue'

let updateInterval = null
let aborters = []

export default {
  name: 'HeroHomepage',
  components: {
      Discord,
      Anagrams,
      Chess,
      CardsAgainstHumanity,
      SurveySays,
  },
  props: {
    title: String,
    subheading: String,
    fadedText: String,
  },
  data() {
      return {
          mockups: ['cards-against-humanity', 'chess' , 'anagrams', 'survey-says'],
          mockupIndex: 0,
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
      async animateMockup() {
        let aborter = new AbortController()
        aborters.push(aborter)

        // Abort all other animations
        while(aborters[0] !== aborter && aborters[0]) {
            aborters[0].abort()
            aborters.shift()
        }

        let queue = [
            [this.sleep, 100],
            [this.loadIn],
            [this.sleep, 4000],
            [this.loadOut],
            [this.sleep, 500],
            [this.nextMockup],
        ]

        try {
            for(let [fn, arg] of queue) {
                aborter.signal.throwIfAborted()
                await fn(arg)
            }
        } catch(e) {
            // Aborted
        }

        if(!aborter.signal.aborted) {
            aborters.pop()
            this.animateMockup()
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
      },
      async sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
      },
      async nextMockup() {
        await this.sleep(100)
        this.mockupIndex++
        this.updateHeight()
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
      },
  },
   mounted() {
    this.animateMockup()
    if(!updateInterval) {
        //updateInterval = setInterval(this.updateHeight, 100)
    }
  },
  beforeDestroy() {
    clearInterval(updateInterval)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
    width: 100%;

    margin: 0;
    padding: 3.5rem 0 0 0;

    height: 700px;


    .hero-content-wrapper {
        margin: 0 auto;
        max-width: $widescreen;
        padding: calc(3.5rem + 20px) 20px 40px;
        text-align: left;
        @include mobile {
            padding: calc(3.5rem + 20px) 20px 10px;
        }
        h1 {
            position: relative;
            padding: 20px 20px 20px 0px;
            // font-size: 4rem;
            color: white;
            font-weight: bold;
            margin-bottom: 0.5rem;
            font-size: 3.75rem;

            span {
                position: relative;
                z-index: 2;
            }
            
            @include mobile {
                font-size: 2.5rem;
            }

            &:before {
                content: "";
                position: absolute;
                left: 0;
                top: 25%;
                width: 100%;
                height: 40%;
                background: black;
                opacity: 0.5;
                -webkit-filter: blur(100px);
                filter: blur(100px);
                overflow: visible;
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
