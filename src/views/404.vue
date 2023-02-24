<template>
    <div class="is-404">
        <div class="is-404-content vertical-centered">
            <h1 class="title is-1">
                {{ error.message || '404' }}
            </h1>
            <h3 class="title is-3">
                {{ error.description || '' }}
            </h3>
            <b-button
                tag="router-link"
                type="is-light"
                :to="{ path: '/' }"
                icon-left="home"
                icon-pack="fas"
                size="is-medium" >Return to home</b-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.is-404 {
    background-color: $discord-background-primary;
    height: calc(100vh - 144px);
    width: 100vw;
    position: relative;
}

.is-404-content {
    text-align: left;
    max-width: $widescreen;
    margin: 0 auto;
    padding: 1rem;

    .title.is-1 {
        color: $light;
        font-size: 5rem;
        margin-bottom: 1rem;
    }

    .title.is-3 {
        color: $light;
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }
}

.vertical-centered {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>

<script>
import { Errors } from '@/util/errors.js'

export default {
    name: 'PageNotFound',
    beforeMount() {
        const errorCode = this.$route.query.code
        if(errorCode && Errors[errorCode]) {
            this.error = Errors[errorCode]
        }
    },
    data() {
        return {
            error: Errors.DEFAULT
        }
    },
}
</script>