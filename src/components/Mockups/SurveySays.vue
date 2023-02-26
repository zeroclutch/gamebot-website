
<template>
    <div class="discord-mockup-content">
        <DiscordMessage
            username="Gamebot"
            content=""
            bot
            role-color="#52d9e9"
            :avatar="require(`@/assets/images/brand/128w/pfp.png`)">
            <DiscordMessageEmbed
                color="#52d9e9">
                <div>
                    Guess what percent of people have stuck used gum under a table or counter?
                </div>                        
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="a smol bunny"
            role-color="#abcdef"
            avatar="https://i.imgur.com/gx0AN39.gif">
            10
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            content=""
            bot
            role-color="#52d9e9"
            :avatar="require(`@/assets/images/brand/128w/pfp.png`)">
            <DiscordMessageEmbed
                :image="require(`@/assets/images/mockup/surveysays.png`)"
                color="#52d9e9">
            </DiscordMessageEmbed>
            <DiscordMessageEmbed
                color="#52d9e9">
                The real number was <b>32%</b>
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="a real-life person"
            role-color="#febaca"
            :avatar="require(`@/assets/images/mockup/anime.jpg`)">
            absolute monsters
        </DiscordMessage>
    </div>
</template>

<script>
import DiscordMessage from '@/components/Discord/DiscordMessage.vue'
import DiscordMessageEmbed from '@/components/Discord/DiscordMessageEmbed.vue'
export default {
    name: 'CardsAgainstHumanity',
    components: {
        DiscordMessage,
        DiscordMessageEmbed
    }
}
</script>