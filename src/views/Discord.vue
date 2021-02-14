<template>
    <div class="loading">
        <b-loading :is-full-page="true" active></b-loading>
    </div>
</template>

<style lang="scss" scoped>
.loading {
    height: calc(100vh - 144px);
}
</style>

<script>
export default {
    name: 'Login',
    beforeMount() {
        const urlParams = new URLSearchParams(window.location.search)
        this.$gtag.event('join_community', {'event_category': 'community_update','event_label': urlParams.get('ref') || 'unknown'})
        window.location = `https://discord.com/oauth2/authorize?client_id=${process.env.VUE_APP_DISCORD_CLIENT_ID}&scope=bot&permissions=1547041872`
    }
}
</script>