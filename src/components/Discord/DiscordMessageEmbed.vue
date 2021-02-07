<template>
    <div class="embed"
    :style="{ 'border-left-color': color || 'black'}"
    >
        <div class="embed-title">{{ title }}</div>
        <div class="embed-description">{{ description }}<slot></slot></div>
        <b-image
        :src="image"
        placeholder="@/assets/images/brand/128x128.png"
        alt="A random image"
        lazy
        class="embed-image" v-if="image"
        >
        </b-image>
        <div class="embed-footer">{{ footer }}</div>
    </div>
</template>

<style lang="scss" scoped>
    .embed {
        display: inline-block;
        background-color: $discord-background-secondary;
        padding: 10px;
        border-left: 4px solid;
        margin-top: 5px;
        border-radius: 4px;
        .embed-description {
            font-size: 0.9rem;
        }

        .embed-title {
            color: white;
            font-size: 1rem;
            font-weight: bold;
        }

        .embed-image {
            border-radius: 5px;
            height: auto;
            max-width: 240px;
        }
        
        .embed-footer {
            color: white;
            font-size: 0.6rem;
            font-weight: bold;
        }
    }
</style>

<script>
export default {
    name: 'DiscordEmbed',
    props: {
        title: String,
        description: String,
        color: String,
        image: String,
        footer: String
    }
}
</script>