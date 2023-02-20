<template>
    <div class="is-404">
        <div class="vertical-centered">
            <h1 class="title is-1">
                404!
            </h1>
            <h3 class="title is-3">
                Your page was not found. Sorry about that!
            </h3>
            <b-button tag="router-link" type="is-primary" :to="{ path: '/' }">Return to home</b-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.is-404 {
    height: calc(100vh - 144px);
    text-align: center;
}

.vertical-centered {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>

<script>
export default {
    name: 'PageNotFound',
    metaInfo: {
        title: '404 - Page Not Found | Gamebot'
    },
    beforeMount() {
        
    }
}
</script>