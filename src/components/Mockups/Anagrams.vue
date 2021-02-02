<template>
    <div class="discord-mockup-content">
        <DiscordMessage
            username="Gamebot"
            role-color="#52d9e9"
            bot
            avatar="https://i.imgur.com/gx0AN39.gif">
            <DiscordMessageEmbed
                color="#52d9e9"
                title="Anagrams"
            >
            The letters are: <b>S H B I G G I</b>
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="Shou"
            role-color="#e95252"
            avatar="https://cdn.discordapp.com/avatars/542939471172075520/a_17857e8cba5fae682adf07cb17219145.gif">
            big
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            bot
            role-color="#52d9e9"
            avatar="https://cdn.discordapp.com/avatars/620307267241377793/636c2aa0886239a8c795a90706bf6a23.png?size=128">
            <DiscordMessageEmbed
                color="#52d9e9"
            >
            <b>Shou</b> got <b>BIG</b> for <b>50 points</b>
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="Shou"
            role-color="#e95252"
            avatar="https://cdn.discordapp.com/avatars/542939471172075520/a_17857e8cba5fae682adf07cb17219145.gif">
            bruh<br>
            ish
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            bot
            role-color="#52d9e9"
            avatar="https://cdn.discordapp.com/avatars/620307267241377793/636c2aa0886239a8c795a90706bf6a23.png?size=128">
            <DiscordMessageEmbed
                color="#52d9e9"
            >
            <b>Shou</b> got <b>ISH</b> for <b>50 points</b>
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            bot
            role-color="#52d9e9"
            avatar="https://cdn.discordapp.com/avatars/620307267241377793/636c2aa0886239a8c795a90706bf6a23.png?size=128">
            <DiscordMessageEmbed
                title="The game is over!"
                color="#52d9e9"
            >
            <b>Shou</b> got <b>BIG, ISH</b><br>
            <br>
            The pangram was <b>BIGGISH</b>
            </DiscordMessageEmbed>
        </DiscordMessage>
        <DiscordMessage
            username="Shou"
            role-color="#e95252"
            avatar="https://cdn.discordapp.com/avatars/542939471172075520/a_17857e8cba5fae682adf07cb17219145.gif">
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