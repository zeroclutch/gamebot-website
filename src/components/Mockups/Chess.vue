
<template>
    <div class="discord-mockup-content">
        <DiscordMessage
            username="a smol bunny"
            role-color="#abcdef"
            :avatar="require('@/assets/images/mockup/bunny.gif')">
            it's a king's pawn kind of day<br>
            &e4
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            content="Black's turn to move"
            bot
            role-color="#52d9e9"
            :avatar="require('@/assets/images/brand/64w/pfp.png')"
            avatarExtension=".webp">
            <DiscordMessageEmbed
                color="#000000"
                :image="require('@/assets/images/mockup/chess.jpeg')"
            >
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="a real-life person"
            role-color="#febaca"
            :avatar="require('@/assets/images/mockup/person.jpeg')"
            avatarExtension=".webp">
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