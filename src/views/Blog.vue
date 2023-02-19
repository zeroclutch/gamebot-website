<template>
    <div class="commands">
        <page-hero title="Gamebot Blog"/>
    </div>
</template>

<style scoped lang="scss">

</style>

<script>
import PageHero from '../components/Page/PageHero.vue'
export default {
    name: 'Commands',
    components: {
        PageHero

    },

    data() {
        return {
            posts: []
        }
    },
    mounted() {
        this.getPosts()
    },
    methods: {
        getPosts() {
            const SPACE_ID = 'oe89s2s3rmwc'
            const ENVIRONMENT_ID = 'master'
            fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`)
                .then(response => response.json())
                .then(data => {
                    this.posts = data
                })
        }
    }
}
</script>