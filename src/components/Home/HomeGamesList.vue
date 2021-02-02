<template>
    <section class="info-section dark-mode">
        <div class="content-wrapper">
            <h2 class="section-heading">A wide array of games</h2>
            <div class="columns">
                <div class="column is-5 is-0-mobile">
                    <Discord
                        channel="play" 
                        class="discord-holder">
                        <DiscordMessage
                            username="Gamebot"
                            content="This round's black card"
                            bot
                            role-color="#52d9e9"
                            avatar="https://cdn.discordapp.com/avatars/620307267241377793/636c2aa0886239a8c795a90706bf6a23.png?size=128">
                            <DiscordMessageEmbed
                                title=""
                                description=""
                                color="#52d9e9"
                                image="https://gamebot.rocks/shop-items/cah-shop/unicorn-display.png"
                            >
                            </DiscordMessageEmbed>
                            <DiscordMessageEmbed
                                title="Choose the best card, Card Czar"
                                color="#52d9e9"
                                footer="Type the number of the card.">
                                <div>
                                    <b>1. </b>Extremely tight pants.<br>
                                    <b>2. </b>Crystal meth.<br>
                                    <b>3. </b>Smoking crack, for instance.<br>
                                    <b>4. </b>Sexy pillow fights.<br>
                                    <b>5. </b>Menstrual rage.<br>
                                </div>                        
                            </DiscordMessageEmbed>
                        </DiscordMessage>
                        <DiscordMessage
                            username="a tiny bunny"
                            content="i gotta say i like crystal meth"
                            role-color="#abcdef"
                            avatar="https://i.imgur.com/gx0AN39.gif">
                            I gotta say I like crystal meth<br>
                            wait that came out wrong
                        </DiscordMessage>
                        <DiscordMessage
                            username="a real-life person"
                            role-color="#febaca"
                            avatar="https://i.imgur.com/KwrDil8.gif">
                            oh dear
                        </DiscordMessage>
                    </Discord>
                </div>
                <div class="column is-7">
                    <div class="game-holder content-holder">
                        <ul class="game-list">
                            <li v-for="game in games" :key="game.name"><b>{{ game.name }}, </b>{{ game.description }}</li>
                            <li>With plenty more on the way...</li>
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
import DiscordMessage from '@/components/Discord/DiscordMessage.vue'
import DiscordMessageEmbed from '@/components/Discord/DiscordMessageEmbed.vue'
export default {
    name: 'HomeGamesList.vue',
    props: {

    },
    components: {
        Discord, DiscordMessage, DiscordMessageEmbed,
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