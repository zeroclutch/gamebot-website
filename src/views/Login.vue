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
    data() {
        return {
        }
    },
    beforeMount() {
        let clientId = process.env.VUE_APP_DISCORD_CLIENT_ID
        let redirectURI = process.env.BASE_URL + `/authenticate`
        window.location = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=token&scope=identify`
    }
}
</script>