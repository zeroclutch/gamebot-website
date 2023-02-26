
<template>
    <div class="discord-mockup-content">
        <DiscordMessage
            username="a smol bunny"
            role-color="#abcdef"
            avatar="https://i.imgur.com/gx0AN39.gif">
            it's a king's pawn kind of day<br>
            &e4
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            content="Black's turn to move"
            bot
            role-color="#52d9e9"

            :avatar="require(`@/assets/images/brand/128w/pfp.png`)">
            <DiscordMessageEmbed
                color="#000000"
                :image="require('@/assets/images/mockup/chess.png')"
            >
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="a real-life person"
            role-color="#febaca"
            avatar="@/assets/images/mockup/anime.jpg">
            wow, feeling adventurous, huh?
        </DiscordMessage>
    </div>
</template>

<script>
import DiscordMessage from '@/components/Discord/DiscordMessage.vue'
import DiscordMessageEmbed from '@/components/Discord/DiscordMessageEmbed.vue'
export default {
    name: 'Chess',
    components: {
        DiscordMessage,
        DiscordMessageEmbed
    }
}
</script>