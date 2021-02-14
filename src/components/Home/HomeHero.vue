<template>
<section class="gb-hero-background">
    <section class="gb-hero  m-0">
        <div class="hero-content-wrapper columns">
            <div class="column is-7">
                <h1 class="title is-marginless main-title"><span class="faded-text">{{ fadedText }}</span>{{ title }}</h1>
                <h3 class="title is-marginless main-title"></h3>
                
                <div class="button-container">
                    <div class="button-holder">
                        <b-button
                        class="button-home"
                        icon-pack="fab"
                        icon-left="discord"
                        type="is-primary" inverted
                        size="is-large is-medium-mobile"
                        tag="a"
                        :target="isEmbed ? '_blank' : ''"
                        href="/invite?ref=homepage">
                            <span>Add to Discord</span>
                        </b-button>
                    </div>
                    <div class="button-holder">
                        <b-button
                        class="button-home"
                        icon-pack="fas"
                        icon-left="users"
                        type="is-dark" 
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
</section>
</template>


<script>
import Discord from '@/components/Discord/Discord.vue'

import CardsAgainstHumanity from '@/components/Mockups/CardsAgainstHumanity.vue'
import Chess from '@/components/Mockups/Chess.vue'
import Anagrams from '@/components/Mockups/Anagrams.vue'
import SurveySays from '@/components/Mockups/SurveySays.vue'

export default {
  name: 'HeroHomepage',
  components: {
      Discord,
      Anagrams,
      Chess,
      CardsAgainstHumanity,
      SurveySays
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

@keyframes gradient {
	0% {
		background-position: 0% 0%;
	}
	100% {
		background-position: 100% 100%;
	}
}
@keyframes reverse-gradient {
	0% {
		background-position: 0% 0%;
	}
    25% {
		background-position: 100% 50%;
    }
    50% {
		background-position: 0% 50%;
    }
    75% {
		background-position: 50% 100%;
    }
	100% {
		background-position: 100% 100%;
	}
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

.gb-hero-background {
    background: radial-gradient(circle, rgba(121,234,193,1) 25%, rgba(51,206,255,1) 25%, rgba(121,234,193,1) 48%, rgba(255,51,137,1) 48%, rgba(121,234,193,1) 73%, rgba(51,206,255,1) 73%);
    background-size: 400% 400%;
	animation: reverse-gradient 60s ease-in-out infinite alternate;
}

.gb-hero {
    background: rgb(51,206,255);
    background: linear-gradient(153deg, rgba(51,206,255,1) 0%, rgba(92,222,219,0.7469581582633054) 7%, rgba(121,234,193,1) 12%, rgba(61,223,224,1) 18%, rgba(0,212,255,0.8169861694677871) 24%, rgba(69,225,220,1) 28%, rgba(121,234,193,0.9178265056022409) 31%, rgba(80,218,229,1) 36%, rgba(51,206,255,0.8029805672268908) 44%, rgba(61,212,253,1) 48%, rgba(75,220,249,0.9570421918767507) 54%, rgba(89,224,232,1) 57%, rgba(121,234,193,1) 64%, rgba(167,168,201,0.9066220238095238) 70%, rgba(229,80,211,1) 78%, rgba(205,97,217,0.7469581582633054) 81%, rgba(132,149,235,1) 90%, rgba(100,172,243,1) 94%, rgba(51,206,255,1) 100%);
	background-size: 800% 800%;
    animation: gradient 27s ease infinite alternate;

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
            font-size: 60px;
            color: white;
            font-weight: bold;
            @include mobile {
                font-size: 40px;
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
            &:hover {
                filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.5));
                -webkit-filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.5));
            }
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
