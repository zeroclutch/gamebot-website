<template>
    <div class="discord-mockup-content">
        <DiscordMessage
            username="Gamebot"
            role-color="#52d9e9"
            bot
            :avatar="require(`@/assets/images/brand/64w/pfp.png`)"
            avatarExtension=".webp">
            <DiscordMessageEmbed
                color="#52d9e9"
                title="Anagrams"
            >
            The letters are: <b>S H B I G G I</b>
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="a rubber duck"
            role-color="#f9df48"
            :avatar="require('@/assets/images/mockup/duck.jpg')"
            avatarExtension=".webp">
            big
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            bot
            role-color="#52d9e9"
            :avatar="require(`@/assets/images/brand/64w/pfp.png`)"
            avatarExtension=".webp">
            <DiscordMessageEmbed
                color="#52d9e9"
            >
            <b>a rubber duck</b> got <b>BIG</b> for <b>50 points</b>
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="a rubber duck"
            role-color="#f9df48"
            :avatar="require('@/assets/images/mockup/duck.jpg')"
            avatarExtension=".webp">
            ish
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            bot
            role-color="#52d9e9"
            :avatar="require(`@/assets/images/brand/64w/pfp.png`)">
            <DiscordMessageEmbed
                color="#52d9e9"
            >
            <b>a rubber duck</b> got <b>ISH</b> for <b>50 points</b>
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            bot
            role-color="#52d9e9"
            :avatar="require(`@/assets/images/brand/64w/pfp.png`)">
            <DiscordMessageEmbed
                title="The game is over!"
                color="#52d9e9"
            >
            <b>a rubber duck</b> got <b>BIG, ISH</b><br>
            <br>
            The pangram was <b>BIGGISH</b>
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="a rubber duck"
            role-color="#f9df48"
            :avatar="require('@/assets/images/mockup/duck.jpg')"
            avatarExtension=".webp">
                <img src="@/assets/images/emoji/eyes.png">
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