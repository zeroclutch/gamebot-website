<template>
    <footer class="hero is-dark">
        <div class="hero-body content has-text-centered">
            <p>
            <strong class="has-text-light">Gamebot</strong> by <a href="https://github.com/zeroclutch">zeroclutch</a>, Copyright © 2021. The source code and website is 100% open source on Github under the 
            <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC SA 4.0 license</a>.
            <br><a href="/privacy">Privacy</a>.
            </p>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer a {
    color: $primary;
}

footer {
    color: white;
    height: 100%;
    max-height: 100vh;
}
</style>

<script>
export default {
    name: 'Footer'
}
</script>