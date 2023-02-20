<template>
    <div class="is-aligned-hero">
        <div class="vertical-centered">
            <h1 class="title is-1">
                Submission successful!
            </h1>
            <h3 class="title is-3">
                You can now close this page and return to Discord.
            </h3>
            <b-button tag="router-link" type="is-primary" :to="{ path: '/' }">Return to home</b-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.is-aligned-hero {
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
    name: 'Success',
    beforeMount() {
        
    },
    metaInfo: {
        title: 'Success | Gamebot',
    },
}
</script>