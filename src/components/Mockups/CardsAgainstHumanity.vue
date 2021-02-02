
<template>
    <div class="discord-mockup-content">
        <DiscordMessage
            username="Gamebot"
            content="This round's black card"
            bot
            role-color="#52d9e9"
            :avatar="require(`@/assets/images/brand/128x128.png`)">
            <DiscordMessageEmbed
                title=""
                description=""
                color="#52d9e9"
                :image="require(`@/assets/images/mockup/unicorn-display.png`)"
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