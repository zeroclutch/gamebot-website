<template>
    <div class="box shop-header">
        <h4 class="title is-4"><b-icon class="v-align-middle" :icon="icon" :pack="pack" />&nbsp;{{ title }}</h4>
        <div class="columns is-multiline">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.v-align-middle {
    vertical-align: middle;
}

.box.shop-header {
    &:not(:last-child) {
        margin-bottom: 0px;
    }
    padding: 20px;
    padding-bottom: 40px;
    .title {
        text-align: left;
        font-weight: bold;
    }
}
</style>

<script>
export default {
    name: 'ShopHeader',
    props: {
        title: String,
        icon: String,
        pack: String
    }
}
</script>