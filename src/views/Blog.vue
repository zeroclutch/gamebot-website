<template>
    <main class="blog">
        <page-hero title="Blog" subtitle="News, updates, and more!" />
        <div class="blog-post-wrapper">
            <article class="box">
                <section class="blog-post-items columns is-multiline">
                    <div class="blog-post" v-for="post in posts" :key="post.sys.id">
                        <div class="article-content">
                            <p class="has-text-gray blog-post-info">
                                <img loading="lazy" class="author-image" :src="setSize(post.fields.authorImage, 100)"/>
                                &nbsp;{{ post.fields.author }} on {{ post.fields.date.toLocaleDateString() }} | {{ post.fields.length }} min read
                            </p>
                            <h2 class="title is-4 clickable" @click="() => route(post.sys.id)" aria-role="button">{{ post.fields.title }}</h2>
                            <p class="blog-preview clickable" @click="() => route(post.sys.id)" aria-role="button">{{ post.preview }}</p>
                            <router-link :to="`/post/${post.sys.id}`" class="link has-text-info">Read more</router-link>
                        </div>
                        <img loading="lazy" class="blog-image clickable" @click="() => route(post.sys.id)" aria-role="button" :src="setSize(post.fields.image, 600)"/>
                    </div>
                </section>
                <div class="end-of-blog">
                    <p class="has-text-centered has-text-gray">Sorry, you've reached the end of the blog. Thanks for reading!</p>
                </div>
            </article>
        </div>
    </main>
</template>

<style scoped lang="scss">

.clickable {
    cursor: pointer;
}

@media screen and (max-width: 768px) {
    .blog-post .blog-image {
        display: none;
    }
}

.blog {
    background-color: #eee;
    min-height: 700px;
    padding-bottom: 100px;

    .blog-post-wrapper {
        display: block;
        position: relative;
        max-width: $widescreen;
        margin: 0 auto;
        padding: 1.5rem;

        .blog-post-items {
            display: flex;
            background-color: white;

        
            .blog-post {
                display: flex;
                padding: 2rem;
                text-align: left;
                font-size: 1.25rem;

                align-items: center;

                .author-image {
                    width: 35px;
                    height: 35px;
                    object-fit: cover;
                    object-position: center;
                    border-radius: 50%;
                    transform: translateY(25%);
                    margin-right: 0.5rem;
                }

                .blog-post-info {
                    line-height: 50px;
                    vertical-align: middle;
                }
                
                .blog-image {
                    width: 300px;
                    height: auto;
                    object-fit: cover;
                    object-position: left;
                    border-radius: 0.5rem;
                }

                .title {
                    text-align: left;
                    margin-top: 1rem;
                    color: black;
                    letter-spacing: -0.05rem;

                }

                img {
                    object-fit: cover;
                    width: 300px;
                    border-radius: 0.5rem
                }

                .blog-preview {
                    margin-top: 1rem;
                    color: #666;
                    margin-bottom: 1rem;
                    padding-right: 1rem;
                }

                &:not(:last-child) {
                    border-bottom: 0.5px solid $gray-light;
                }
            }

            min-height: 450px;
        }
    }

}

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
            allPosts: [],
            posts: [],
            includes: {},
        }
    },
    mounted() {
        this.getPosts()

        let observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updatePosts.bind(this)()
                    if(this.posts.length >= this.allPosts.length) {
                        observer.unobserve(entry.target)
                    }
                }
            })
        }.bind(this))

        let target = document.querySelector('.end-of-blog')
        observer.observe(target)
    },
    methods: {
        async get(endpoint, parameter, include=1, contentType) {
            const response = await fetch(`https://${process.env.VUE_APP_CONTENTFUL_ENVIRONMENT}.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/${endpoint}/${parameter}?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}&include=${include}${contentType ? `&content_type=${contentType}` : ''}`)
            return await response.json()
        },
        getPosts() {
            this.get('entries', '', 2, 'blogPost')
            .then(posts => {
                this.includes = posts.includes

                this.allPosts = posts.items.map(post => {
                    post.fields.image = this.getAsset(post.fields.hero.sys.id)
                    post.fields.authorImage = this.getAsset(this.getEntry(post.fields.author.sys.id).fields.profilePicture.sys.id)
                    post.fields.author = this.getEntry(post.fields.author.sys.id).fields.name
                    post.fields.date = new Date(post.fields.date)
                    post.preview = post.fields.content.content.filter(block => block.nodeType === 'paragraph').map(node => node.content[0].value).join(' ').substring(0, 200) + '...'
                    return post
                }).sort((a, b) => b.fields.date - a.fields.date)

                // Push the next 10 posts to the posts array
                this.posts = this.allPosts.slice(0, 10)
            })
        },
        updatePosts() {
            return this.posts = this.allPosts.slice(0, this.posts.length + 10)
        },
        getEntry(entryId) {
            return this.includes.Entry.find(entry => entry.sys.id === entryId)
        },  
        getAsset(assetId) {
            return this.includes.Asset.find(asset => asset.sys.id === assetId).fields.file.url
        },
        setSize(url, w='', h='') {
            if(w) w = '&w=' + w
            if(h) h = '&h=' + h
            return url + '?fm=jpg' + w + h
        },
        route(id) {
            this.$router.push(`/post/${id}#`)
        }
    },
    computed: {
    }
}
</script>