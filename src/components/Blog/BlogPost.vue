<template>
    <div class="blog-post">
        <page-hero :title="fields.title" />
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <RichTextRenderer  v-if="isLoaded()" :document="fields.content"/>
                    <div class="loading" v-else>
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>

<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import PageHero from '../components/Page/PageHero.vue'
export default {
    name: 'Commands',
    components: {
        PageHero,
        RichTextRenderer
    },
    data() {
        return {
            fields: {}
        }
    },
    mounted() {
        this.getPost(this.$route.params.slug)
    },
    methods: {
        getPost(slug) {
            fetch(`https://gamebot.app/api/blog/${slug}?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`)
                .then(response => response.json())
                .then(data => {
                    this.fields = data.fields
                })
        }
    },
    computed: {
        isLoaded() {
            return Object.keys(this.fields).length > 0
        }
    }
}
</script>