<template>
    <div class="blog">
        <page-hero title="Blog" subtitle="News, updates, and more!" />
    </div>
</template>

<style scoped lang="scss">

</style>

<script>
import PageHero from '../components/Page/PageHero.vue'

const SPACE_ID = 'oe89s2s3rmwc'
const ENVIRONMENT_ID = 'master'

export default {
    name: 'Blog',
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
        async get(endpoint, parameter, include=1, contentType) {
            const response = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/${endpoint}/${parameter}?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}&include=${include}${contentType ? `&content_type=${contentType}` : ''}`)
            return await response.json()
        },
        getPosts() {
            this.get('entries', '', 2, 'blogPost')
            .then(posts => {
                this.posts = posts.items
                console.log(this.posts)
            })
        }
    }
}
</script>