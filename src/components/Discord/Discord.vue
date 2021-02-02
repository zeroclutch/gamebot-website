<template>
    <section class="discord-holder" :class="{ blur }">
        <div class="channel-title ">
            <b-icon class="icon" icon="hashtag" pack="fas"></b-icon>
            <span class="channel-name">{{ channel }}</span>
        </div>
        <div class="discord-body">
            <slot></slot>
        </div>
        <div class="discord-typing"></div>
        <div class="discord-bubble">
            Message #{{ channel }}
        </div>
    </section>
</template>


<script>
export default {
  name: 'Discord',
  props: {
    channel: String,
    subheading: String,
    fadedText: String,
    typing: Boolean,
    blur: Boolean,
  }
}
</script>

<!-- Unscoped styles --> 
<style lang="scss">
    .discord-holder {
        text-align: left;
        background-color: $discord-background-primary;
        color: $discord-text-normal;
        position: relative;
        border-radius: 20px;
        -webkit-filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.25));
        filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.25));
        overflow: hidden;
        width: 100%;
        .channel-title {
            .icon {
                color: $discord-header-secondary;
            }
            color: $discord-header-primary;
            font-weight: 600;
            padding: 15px 20px;
            background-color: $discord-background-secondary;
            box-shadow: $discord-guild-header-text-shadow;
        }
        .discord-body {
            padding: 20px;
            padding-bottom: 0;
        }
        .discord-bubble {
            margin: 20px;
            border-radius: 10px;
            padding: 10px;
            color: $discord-interactive-muted;
            background-color: $discord-channeltextarea-background;
        }
        a {
            color: $discord-background-accent;
        }
        &.blur {
            background-color: rgba(54, 57, 63, 0.7);
            -webkit-backdrop-filter: blur(50px);
            backdrop-filter: blur(50px);
            opacity: 0.95;
            .channel-title {
                background-color: $discord-background-tertiary;
            }
            .discord-bubble {
                background-color: $discord-background-tertiary;
            }
        }
    }

</style>

