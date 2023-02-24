<template>
    <main>
        <input type="text" v-model="text" />
        this is a drawing!
        <button @click="submit">Submit</button>
    </main>
</template>

<script>
export default {
    name: 'WebUIDrawing',
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
