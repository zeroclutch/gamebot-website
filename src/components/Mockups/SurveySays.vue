
<template>
    <div class="discord-mockup-content">
        <DiscordMessage
            username="Gamebot"
            content=""
            bot
            role-color="#52d9e9"
            :avatar="require(`@/assets/images/brand/64w/pfp.png`)"
            avatarExtension=".webp">
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
            :avatar="require('@/assets/images/mockup/bunny.gif')">
            10
        </DiscordMessage>
        <DiscordMessage
            username="Gamebot"
            content=""
            bot
            role-color="#52d9e9"
            :avatar="require(`@/assets/images/brand/64w/pfp.png`)"
            avatarExtension=".webp">
            <DiscordMessageEmbed
                :image="require(`@/assets/images/mockup/surveysays.jpeg`)"
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
            :avatar="require(`@/assets/images/mockup/person.jpeg`)"
            avatarExtension=".webp">
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