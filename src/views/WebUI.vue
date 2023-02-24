<template>
    <div class="webui">
        <div class="webui__content">
            <WebUIText :text="value" @submit="submit()" v-if="type === 'text'" />
            <WebUIDrawing :value="value" @submit="submit()" v-else-if="type === 'drawing'" />
        </div>
    </div>
</template>

<script>
import WebUIText from '@/components/WebUI/WebUIText.vue'
import WebUIDrawing from '@/components/WebUI/WebUIDrawing.vue'

import { createErrorHandler } from '@/util/errors.js'

export default {
    name: 'WebUI',
    components: {
        WebUIText,
        WebUIDrawing
    },
    data() {
        return {
            value: '',
            type: ''
        }
    },
    mounted() {
        this.getWebUI()
    },
    computed: {
        id() {
            return this.$route.params.id
        }
    },
    methods: {
        getWebUI() {
            fetch(`/api/ui/${this.id}`)
                .then(response => response.json())
                .then(data => {
                    this.value = data.value
                    this.type = data.type
                    console.log(data)
                })
                .catch(createErrorHandler('WEB_UI_MISSING', this.$router))
        },
        submit() {
            fetch(`/api/ui/${this.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: this.value
                })
            })
                .then(() => {
                    this.$router.push('../success')
                })
                .catch(createErrorHandler('WEB_UI_MISSING', this.$router))
        },
    }
}

</script>