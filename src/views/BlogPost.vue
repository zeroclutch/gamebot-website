<template>
    <div class="blog-post">
        <PageHero class="is-not-mobile" />
        <div class="hero-spacer"></div>
        <div class="content-wrapper">
            <div class="article-wrapper">
                

                <article v-if="this.isLoaded">
                    <div class="hero-image">
                        <div class="hero-image-wrapper">
                            <img class="box" :src="heroImageURL" alt="Header">
                        </div>
                    </div>

                    <section class="">
                        <span class="tag is-rounded is-primary" v-for="tag in fields.tags" :key="tag">
                            {{ tag }}
                        </span>
                    </section>

                    <section class="columns content">
                        <aside class="info-box-wrapper column is-3 ">
                            <div class="info-box">
                                <img class="author-image" :src="authorImageURL" alt="Author">
                                <p class="author-name">
                                    <b>{{ author.name }}</b>
                                </p>
                                <p class="author-role">
                                    {{ author.role }}
                                </p>
                                <br>
                                <p class="author-bio" v-html="cleanHTML(author.bio)"> 
                                </p>
                            </div>
                        </aside>
                        <div class="column is-9">
                            <h1 class="title is-1">
                                {{ fields.title }}
                            </h1>
                            <h4 class="subtitle is-4" v-if="fields.subtitle"> 
                                {{  fields.subtitle }}
                            </h4>

                            <aside class="social-bar p-0">
                                <div class="columns p-0">
                                    <div class="column is-narrow article-info">
                                        {{ fields.length }} min read | {{ resolveISOString(fields.date) }}
                                    </div>
                                    <div class="is-line column"></div>
                                    <div class="social-icons column is-narrow">
                                        <a :href="`https://twitter.com/intent/tweet?text=${fields.title}&url=${this.getShareURL}&via=gamebotdiscord`" target="_blank" rel="noopener noreferrer">
                                            <b-icon pack="fab" icon="twitter" size="is-medium" type="is-gray" />
                                        </a>
                                        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${this.getShareURL}`" target="_blank" rel="noopener noreferrer">
                                            <b-icon pack="fab" icon="facebook" size="is-medium" type="is-gray" />
                                        </a>
                                        <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${this.getShareURL}&title=${fields.title}&source=Gamebot`" target="_blank" rel="noopener noreferrer">
                                            <b-icon pack="fab" icon="linkedin" size="is-medium" type="is-gray"/>
                                        </a>
                                        <a :href="`https://reddit.com/submit?url=${this.getShareURL}&title=${fields.title}`" target="_blank" rel="noopener noreferrer">
                                            <b-icon pack="fab" icon="reddit" size="is-medium" type="is-gray" />
                                        </a>
                                        <a class="copy-button" @click="copyLink" aria-role="button">
                                            <b-icon pack="fas" icon="link" size="is-medium" type="is-gray" />
                                        </a>
                                    </div>
                                </div>
                            </aside>
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

</style>

<style scoped lang="scss">

body .blog-post {
    position: relative;
    animation: fade-in 0.4s;

    margin-bottom: 120px;

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
                max-width: $widescreen;
                font-size: 1.15rem;
                margin: 0 auto;

                aside.info-box-wrapper {
                    padding: 1rem 1.75rem;
                    .info-box {
                        padding: 1.25rem;
                        border-radius: 0.5rem;

                        img.author-image {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                            margin: 0 auto 1rem auto;
                            display: block;
                        }

                        p.author-name {
                            text-align: center;
                            font-size: 1.25rem;
                            font-weight: 600;
                            color: $dark;
                            margin: 0;
                        }

                        p.author-role {
                            text-align: center;
                            font-size: 1rem;
                            font-weight: 600;
                            color: $discord-header-secondary;
                            margin: 0;
                        }

                        p.author-bio {
                            text-align: left;
                            font-size: 1rem;
                            font-weight: 400;
                            margin: 0;
                        }

                    }
                }

                aside.social-bar {
                    .article-info {
                        line-height: 2rem;
                        vertical-align: middle;
                    }

                    a:active {
                        color: $dark;
                    }
                }

                .content {
                    margin: 2rem auto;
                }

                .title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: black;
                    text-align: left;
                    margin-bottom: 0.5rem
                }

                .subtitle {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #6e7275;
                    text-align: left;
                    margin: 0.5rem 0 1.5rem 0;
                }

                .social-bar {
                    font-size: 0.9rem;
                    color: $discord-header-secondary;
                    margin-bottom: 1.5rem;
                }

                .hero-image {
                    img.box {
                        width: auto;
                        margin: 0 auto;
                        background-color: white;
                        overflow: hidden;
                        padding: 0;
                    }

                }

                section {
                    padding: 1.5rem

                    h1 {
                        font-size: 2.5rem;
                        font-weight: 800;
                    }

                    p {
                        font-family: 'Lora', 'Alegreya', 'Georgia', serif;
                        text-align: left;
                        font-size: 1.25rem;
                    }
                }
            }
        }
    }
}


@media screen and (max-width: 1216px) {
    .is-not-mobile {
        position: absolute;
        top: -450px;
    }
}

@media screen and (max-width: 1216px) {
    body .blog-post .content-wrapper .article-wrapper {
        top: 0px;
    }

    .hero-spacer {
        height: 150px;
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
            author: {},
            authorImageURL: '',
        }
    },
    mounted() {
        this.getEntry(this.$route.params.slug)
            .then(data => {
                this.fields = data.fields
                this.getImage(data.fields.hero.sys.id).then(data => {
                    this.heroImageURL = `https:${data.fields.file.url}`
                })
                // Get author
                this.getEntry(data.fields.author.sys.id).then(data => {
                    this.author = data.fields
                    this.getImage(data.fields.profilePicture.sys.id).then(data => {
                        this.authorImageURL = `https:${data.fields.file.url}`
                    })
                })
            })
    },
    methods: {
        async get(endpoint, parameter) {
            const response = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/${endpoint}/${parameter}?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}${parameter ? `&${parameter}` : ''}`)
            return await response.json()
        },
        getImage(id) {
            return this.get('assets', id)
        },
        getEntry(id) {
            return this.get('entries', id)
        },
        copyLink() {
            navigator.clipboard.writeText(this.getShareURL)
        },
        resolveISOString(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        },
        cleanHTML(html) {
            return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        },
    },
    computed: {
        isLoaded() {
            return this.heroImageURL !== ''
            // return Object.keys(this.fields).length > 0
        },
        getShareURL() {
            return `https://gamebot.rocks/post/${this.$route.params.slug}`
        }
    }
}
</script>