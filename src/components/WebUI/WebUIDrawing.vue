<template>
    <main>
        <b-input type="text" v-model="text" />
        <b-button @click="submit" />
    </main>
</template>

<script>
export default {
    name: 'WebUIDrawing',
    props: {
        data: Object,
        value: Object,
    },
    data() {
        return {
            text: 'Hello World'
        }
    },
    methods: {
        submit() {
            this.$emit('submit', this.text)
        }
    }
}
</script>
