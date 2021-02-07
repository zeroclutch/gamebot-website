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
        let clientId = '620307577678462995'
        let redirectURI = `http://localhost:8080/authenticate`
        window.location = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=token&scope=identify`
    }
}
</script>