<template>
    <footer class="hero is-dark">
        <div class="hero-body content has-text-centered">
            <p>
            <strong class="has-text-light">Gamebot</strong> by <a class="has-text-primary" href="https://github.com/zeroclutch">zeroclutch</a>, Copyright © 2021. The source code and website is 100% open source on <a class="has-text-primary" href="https://github.com/zeroclutch/gamebot">Github</a> under the 
            <a class="has-text-primary" href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC SA 4.0 license</a>.
            <br><a class="has-text-primary" href="/privacy">Privacy</a> <a class="has-text-primary" href="/terms">Terms</a>
            </p>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer.hero p a {
    color: $primary;
}

footer.hero p {
    color: #ffffff;
    height: 100%;
    max-height: 100vh;
    a {
        text-decoration: underline;
    }
}
</style>

<script>
export default {
    name: 'Footer'
}
</script>