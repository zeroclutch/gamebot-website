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
    name: 'Authenticate',
    beforeMount() {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const token = fragment.get('access_token');
        //const tokenType = fragment.get('token_type');
        const maxAge = fragment.get('expires_in');
        let cookie = `token=${encodeURIComponent(token)}; max-age=${maxAge};`// domain=${window.location.host}`
        document.cookie = cookie;
        this.$store.commit('setToken', token)
        window.location = decodeURIComponent(fragment.get('state') || '%2Fshop')
        this.$gtag.event('login')
    }
}
</script>