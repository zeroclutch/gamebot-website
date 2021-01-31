<template>
    <section class="gb-hero columns m-0">
        <div class="column is-8">
            <h1 class="title is-marginless main-title"><span class="faded-text">{{ fadedText }}</span>{{ title }}</h1>
            <h3 class="title is-marginless main-title"></h3>
            
            <div class="button-container">
                <div class="button-holder">
                    <b-button
                    icon-pack="fab"
                    icon-left="discord"
                    type="is-primary" inverted
                    size="is-large is-medium-mobile"  
                    onclick="gtag('event', 'add_to_guild', {'event_category': 'guild_update','event_label': 'Homepage'})"
                    href="/invite?ref=homepage">
                        <span>Add to Discord</span>
                    </b-button>
                </div>
                <div class="button-holder">
                    <b-button
                    icon-pack="fas"
                    icon-left="users"
                    type="is-dark" 
                    size="is-large"  
                    onclick="gtag('event', 'join_community', {'event_category': 'community_update','event_label': 'Homepage'})"
                    href="/discord?ref=homepage">
                        <span>Join the community</span>
                    </b-button>
                </div>
            </div>
        </div>
        <div class="column">
            <DiscordHolder>
                
            </DiscordHolder>
        </div>
    </section>
</template>


<script>
export default {
  name: 'HeroHomepage',
  props: {
    title: String,
    subheading: String,
    fadedText: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.gb-hero {
    padding: calc(3.5rem + 20px) 60px 40px;
    background: linear-gradient(103.15deg, #33CEFF 9.79%, rgba(121, 234, 193, 0.921875) 78.74%);
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

.button-container {
    margin-bottom: 100px;
    .button-holder {
        margin: 20px 0;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        -webkit-filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        span, span.icon.is-medium {
            font-weight: bold;
        }
        .button.is-large {
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


.button-holder:hover {
    filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.25));
    -webkit-filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.25));
}

</style>
