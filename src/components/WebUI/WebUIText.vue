<template>
    <div class="columns">
        <div class="column">
            <b-input v-model="text"
            :has-counter="false"
            :maxlength="256"
            autofocus
            @keyup.native="handleKeyUp">
        </b-input>
        </div>
        <div class="column is-narrow">
            <b-button class="submit-button"
                @click="submit"
                type="is-success"
                icon-right="arrow-circle-right"
                icon-pack="fas"
                aria-label="Submit"
                :disabled="text.length === 0">
                Submit
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WebUIText',
    data() {
        return {
            text: ''
        }
    }, methods: {
        submit() {
            this.$emit('submit', this.text)
        },
        handleKeyUp(event) {
            if(event.key === 'Enter') {
                this.submit()
            }
        }
    }
}
</script>
