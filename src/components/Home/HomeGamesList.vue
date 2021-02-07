<template>
    <section class="info-section dark-mode">
        <div class="content-wrapper">
            <div class="columns">
                <div class="column is-5 is-0-mobile">
                    <Discord
                        channel="gamebot" 
                        v-animate-onscroll="'fade-in-delayed'"
                        class="discord-holder faded-out">
                        <div class="discord-mockup-wrapper">
                            <CardsAgainstHumanity />
                        </div>
                    </Discord>
                </div>
                <div class="column is-7">
                    <h2 
                        v-animate-onscroll="'fade-in-delayed'"
                        class="faded-out section-heading">A wide array of games</h2>
                    <div class="game-holder content-holder">
                        <ul class="game-list">
                            <li v-for="game in games" 
                            v-animate-onscroll="'fade-in-delayed'"
                            class="faded-out"
                            :key="game.name"><b>{{ game.name }}, </b>{{ game.description }}</li>
                            <li
                            v-animate-onscroll="'fade-in-delayed'"
                            class="faded-out">With plenty more on the way...</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

.dark-mode {
    background: $discord-background-tertiary;
    color: #fafafa;
}

.discord-holder {
    z-index: 3;
    max-width: 400px;
}


.info-section {
    .content-wrapper {
        max-width: $widescreen;
        margin: 0 auto;
    }
    padding: 80px 20px;
    h2.section-heading {
        color: #52D9E9;
        font-size: 48px;
        padding: 60px 0 30px 0;
        text-align: center;
        font-weight: bold;
    }
    ul.game-list {
        text-align: left;
        list-style: none;
        font-size: 24px;
        padding: 30px;
    }

    ul.game-list li {
        padding-bottom: 20px;
    }
}




</style>

<script>
import Discord from '@/components/Discord/Discord.vue'
import CardsAgainstHumanity from '@/components/Mockups/CardsAgainstHumanity.vue'

export default {
    name: 'HomeGamesList.vue',
    props: {

    },
    components: {
        Discord, CardsAgainstHumanity,
    },
    data() {
        return {
            games: [
                {
                    name: 'Cards Against Humanity',
                    description: 'a party game for horrible people.'
                },
                {
                    name: 'Anagrams',
                    description: 'unscramble words in a frenzy against your friends.'
                },
                {
                    name: 'Chess',
                    description: 'play the 500-year-old classic on Discord.'
                },
                {
                    name: 'Connect Four',
                    description: 'classic Connect Four, but with a whole lot more.'
                },
                {
                    name: 'Othello',
                    description: 'flip over discs and capture opposing pieces in this classic strategy game.'
                },
                {
                    name: 'Survey Says',
                    description: 'a party game for horrible people.'
                },
                {
                    name: 'Wisecracks',
                    description: 'make the wittiest responses to the silliest prompts.'
                },
            ]
        }
    }
}
</script>