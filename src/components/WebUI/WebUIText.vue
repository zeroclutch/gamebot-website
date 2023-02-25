<template>
    <div>
        <b-input v-model="text"></b-input>
        <b-button @click="submit">Submit</b-button>
    </div>
</template>

<script>
export default {
    name: 'WebUIText',
    data() {
        return {
            text: 'Hello World'
        }
    }, methods: {
        submit() {
            this.$emit('submit', this.text)
        }
    }
}
</script>
