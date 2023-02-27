<template>
    <div class="discord-message is-mobile">
        <b-image
            class="avatar"
            rounded
            :src="avatar"
            :webp-fallback="avatar">
            <!--avatar-->
        </b-image>
        <div class="discord-message-body">
            <!--name-->
            <div class="discord-name" :style="{ color: roleColor || '#fff' }">
                <span class="username"> {{ username }} </span>
                <b-tag class="is-small is-discord" aria-close-label="Bot verified" attached v-if="bot">
                    <b-icon icon="check" pack="fas"> </b-icon>&nbsp;BOT
                </b-tag>
            </div>
            <div class="discord-content"><slot></slot></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.discord-message {
    display: flex;
    &:not(:first-child) {
        margin-top: 10px;
    }
    
    .avatar {
        width: 45px;
        height: 40px;
        border-radius: 100%;
        margin-right: 10px;
        background-position: center;
        background-size: cover;
        @include tablet {
            display: none;
        }
        @include desktop {
            display: block;
        }
    }


    .discord-message-body {
        width: calc(100%);
        font-weight: 500;
        .username {
            &:hover {
                text-decoration: underline; 
                cursor: pointer;
            }
        }
    } 
}
</style>

<script>
export default {
    name: 'DiscordMessage',
    props: {
        username: String,
        content: String,
        avatar: String,
        avatarExtension: String,
        roleColor: String,
        bot: Boolean,
    },
}
</script>