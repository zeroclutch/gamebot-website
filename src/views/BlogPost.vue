<template>
    <main class="blog-post">
        <div class="hero-spacer"></div>
        <div class="content-wrapper">
            <div class="article-wrapper">
                

                <article>
                    <div class="hero-image">
                        <div class="hero-image-wrapper">
                            <img 
                                class="box box-clear" 
                                :class="{
                                    'fade-in': this.isLoaded
                                }"
                                :src="heroImageURL"
                                @load="handleLoad">
                        </div>
                    </div>

                    <section v-if="this.isLoaded" class="columns content fade-in">
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
                                        <b-tooltip label="Twitter" type="is-gray">
                                            <a @click="share('twitter')" :href="`https://twitter.com/intent/tweet?text=${fields.title}&url=${this.getShareURL}&via=gamebotdiscord`" target="_blank" rel="noopener noreferrer">
                                                <b-icon pack="fab" icon="twitter" size="is-medium" type="is-gray" />
                                            </a>
                                        </b-tooltip>

                                        <b-tooltip label="Facebook" type="is-gray">
                                            <a @click="share('facebook')" :href="`https://www.facebook.com/sharer/sharer.php?u=${this.getShareURL}`" target="_blank" rel="noopener noreferrer">
                                                <b-icon pack="fab" icon="facebook" size="is-medium" type="is-gray" />
                                            </a>
                                        </b-tooltip>

                                        <b-tooltip label="LinkedIn" type="is-gray">
                                            <a @click="share('linkedin')" :href="`https://www.linkedin.com/shareArticle?mini=true&url=${this.getShareURL}&title=${fields.title}&source=Gamebot`" target="_blank" rel="noopener noreferrer">
                                                <b-icon pack="fab" icon="linkedin" size="is-medium" type="is-gray"/>
                                            </a>
                                        </b-tooltip>

                                        <b-tooltip label="Reddit" type="is-gray">
                                            <a @click="share('reddit')" :href="`https://reddit.com/submit?url=${this.getShareURL}&title=${fields.title}`" target="_blank" rel="noopener noreferrer">
                                                <b-icon pack="fab" icon="reddit" size="is-medium" type="is-gray" />
                                            </a>
                                        </b-tooltip>

                                        <b-tooltip label="Copy Link" type="is-gray">
                                            <a class="copy-button" @click="copyLink" aria-role="button">
                                                <b-icon pack="fas" icon="link" size="is-medium" type="is-gray" />
                                            </a>
                                        </b-tooltip>
                                    </div>
                                </div>
                            </aside>
                            <RichTextRenderer  v-if="this.isLoaded" :document="fields.content" :nodeRenderers="renderNodes()"/>
                            <div class="loading" v-else>
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>

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
                        
                    </section>

                    <section v-else>
                        <div class="content-placeholder"></div>
                    </section>
                </article>
            </div>
        </div>
    </main>
</template>

<style lang="css">

</style>

<style scoped lang="scss">

body .blog-post {
    position: relative;

    margin-bottom: 120px;
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
    .content-wrapper {
        .article-wrapper {
            position: relative;
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

                .content-placeholder {
                    height: 100vh;
                    width: 100%;
                }

                aside.info-box-wrapper {
                    padding: 1rem 1.75rem;
                    .info-box {
                        padding: 1.25rem;
                        border-radius: 0.5rem;

                        img.author-image {
                            width: 80px;
                            height: 80px;
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
                    text-align: left;

                    a {
                        color: $info;
                        text-decoration: underline;

                        &:hover {
                            color: $info-dark;
                            text-decoration: underline;
                        }
                    }

                    .embedded-image {
                        margin: 2rem auto;
                        display: block;
                        max-width: 100%;
                        height: auto;
                    }
                }

                .title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: black;
                    text-align: left;
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.05rem;
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
                        background-color: rgba(0,0,0,0);
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
    body .blog-post .content-wrapper .article-wrapper {
        top: 0px;
    }
}

.hero-spacer {
    height: 8rem;
}

</style>

<script>

const SPACE_ID = 'oe89s2s3rmwc'
const ENVIRONMENT_ID = 'master'

import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import BlogImage from '../components/Blog/BlogImage.vue'

import { BLOCKS, MARKS } from '@contentful/rich-text-types'


const embeddedImage = (includes, node, key, h) => {
    const file = includes.Asset.find(asset => asset.sys.id === node.data.target.sys.id).fields.file
    return h('div', {
        class:'embedded-image',
        style: {
            content: `url(https:${file.url})`
        },
        key
    })
}

export default {
    name: 'BlogPost',
    components: {
        RichTextRenderer,
        BlogImage, //eslint-disable-line
    },
    data() {
        return {
            fields: {},
            includes: {},
            heroImageURL: '',
            author: {},
            authorImageURL: '',
            isLoaded: false,
            isErrored: false,
        }
    },
    mounted() {
        const slug = this.$route.params.slug
        this.get('entries', '', 2, 'blogPost', '&sys.id=' + slug )
            .then(data => {
                this.fields = data.items[0].fields
                this.includes = data.includes

                this.heroImageURL = this.includes.Asset.find(asset => asset.sys.id === this.fields.hero.sys.id).fields.file.url
                this.author = this.includes.Entry.find(entry => entry.sys.id === this.fields.author.sys.id).fields
                this.authorImageURL = this.includes.Asset.find(asset => asset.sys.id === this.author.profilePicture.sys.id).fields.file.url
                
            })
    },
    methods: {
        async get(endpoint, parameter, include=1, contentType, other='') {
            const response = await fetch(`https://${process.env.VUE_APP_CONTENTFUL_ENVIRONMENT}.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/${endpoint}/${parameter}?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}&include=${include}${contentType ? `&content_type=${contentType}` : ''}${other}`)
            return await response.json()
        },
        getImage() {
            return this.get('assets', '')
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
        renderMarks() {
            return {
                [MARKS.CODE]: text => `<code>${text}</code>`,
            }
        },
        renderNodes() {
            return {
                [BLOCKS.EMBEDDED_ENTRY]: (node, key) => console.log(JSON.stringify(node), key),
                [BLOCKS.EMBEDDED_ASSET]: (...args) => {
                    return embeddedImage(this.includes, ...args)
                }
            }
        },
        share(platform) {
            this.$gtag.event('event', `share_${platform}`, {
                event_category: 'blog',
                event_label: this.$route.params.slug,
            })
        },
        cleanHTML(html) {
            if(!html) return ''
            return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        },
        handleLoad() {
            this.isLoaded = true
        },
    },
    computed: {
        getShareURL() {
            return `https://gamebot.gg/post/${this.$route.params.slug}`
        }
    }
}
</script>