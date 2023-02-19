<template>
    <div class="blog-image">
        <img loading="lazy" :src="src" />
    </div>
</template>

<script>

const SPACE_ID = 'oe89s2s3rmwc'
const ENVIRONMENT_ID = 'master'

export default {
    name: 'BlogImage',
    props: {
        image: String
    },

    data() {
        return {
            src: ''
        }
    },

    methods: {
        get(endpoint, parameter) {
            const response = fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/${endpoint}/${parameter}?access_token=${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`)
            return response.json()
        },
        getImage() {
            console.log(this)
            this.get('assets', this.image)
            .then(image => {
                this.src = image.fields.file.url
            })
        },
    },

    mounted() {
        this.getImage()
    }
}
</script>