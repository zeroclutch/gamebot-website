
<template>
    <div class="discord-mockup-content">
        <DiscordMessage
            username="Gamebot"
            content="This round's black card"
            bot
            role-color="#52d9e9"
            :avatar="require(`@/assets/images/brand/64w/pfp.png`)"
            avatarExtension=".webp">
            <DiscordMessageEmbed
                title=""
                description=""
                color="#52d9e9"
                :image="require(`@/assets/images/mockup/unicorn-display.jpeg`)"
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
            username="a smol bunny"
            role-color="#abcdef"
            :avatar="require('@/assets/images/mockup/bunny.gif')">
            I gotta say I like crystal meth<br>
            wait that came out wrong
        </DiscordMessage>
        <DiscordMessage
            username="a real-life person"
            role-color="#febaca"
            :avatar="require(`@/assets/images/mockup/person.jpeg`)"
            avatarExtension=".webp">
            oh dear
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