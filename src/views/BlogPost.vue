<template>
    <div class="blog-post">
        <PageHero class="is-not-mobile" />
        <div class="content-wrapper">
            <div class="article-wrapper">
                

                <article>
                    <div class="hero-image" v-if="heroImageURL">
                        <div class="hero-image-wrapper">
                            <img class="box" :src="heroImageURL" alt="Header">
                        </div>
                    </div>

                    <h1>
                        {{ fields.title }}
                    </h1>
                    <section class="columns">
                        <aside class="column is-2 ">
                            <img class="author-image" alt="Author">
                            <p>
                                <b>{{ author.name }}</b>
                            </p>
                            <p>
                                {{ fields.date }}
                            </p>
                        </aside>
                        <div class="column is-10">
                            <RichTextRenderer  v-if="this.isLoaded" :document="fields.content"/>
                            <div class="loading" v-else>
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    </div>
</template>

<style lang="css">
@media screen and (max-width: 1216px) {
    .is-not-mobile .gradient-canvas {
        display: none;
    }
}
</style>

<style scoped lang="scss">

body .blog-post {
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
    .content-wrapper {
        .article-wrapper {
            position: relative;
            top: -150px;
            left: 0;
            padding: 0 3rem;
            width: 100%;

            @media (max-width: 768px) {
                padding: 0 1rem;
            }
            

            article {
                .hero-image {
                    img.box {
                        width: auto;
                        margin: 0 auto;
                        background-color: white;
                        overflow: hidden;
                        padding: 0;
                    }

                }

                max-width: $widescreen;
                margin: 0 auto;

                font-size: 1.15rem;

                section {
                    padding: 1.5rem

                    h1 {
                        font-size: 2.5rem;
                        font-weight: 800;
                    }

                    p {
                        font-family: 'Alegreya' serif;
                        text-align: left;
                    }
                }
            }
        }
    }
}
</style>

<script>

const SPACE_ID = 'oe89s2s3rmwc'
const ENVIRONMENT_ID = 'master'

import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import PageHero from '../components/Page/PageHero.vue'
export default {
    name: 'Commands',
    components: {
        RichTextRenderer,
        PageHero
    },
    data() {
        return {
            fields: {},
            heroImageURL: '',
            author: {}
        }
    },
    mounted() {
        this.getPost(this.$route.params.slug)
    },
    methods: {
        getPost(slug) {
            fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries/${slug}?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`)
                .then(response => response.json())
                .then(data => {
                    this.fields = data.fields
                    this.getImage(data.fields.hero.sys.id)
                    this.getAuthor(data.fields.author.sys.id)
                })
        },
        getImage(id) {
            fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/assets/${id}?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`)
                .then(response => response.json())
                .then(data => {
                    this.heroImageURL = `https:${data.fields.file.url}`
                    console.log(this.heroImageURL)
                })
        },
        getAuthor(id) {
            fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries/${id}?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`)
                .then(response => response.json())
                .then(data => {
                    this.author = data.fields
                })
        },
        onLoad() {

        }
    },
    computed: {
        isLoaded() {
            return Object.keys(this.fields).length > 0
        }
    }
}
</script>