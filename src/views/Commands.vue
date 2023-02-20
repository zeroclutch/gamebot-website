<template>
    <div class="commands">
        <page-hero title="Commands" subtitle="Useful commands for Gamebot"/>
        <commands-table />
    </div>
</template>

<style scoped lang="scss">

</style>

<script>
import CommandsTable from '../components/Commands/CommandsTable.vue'
import PageHero from '../components/Page/PageHero.vue'
export default {
    name: 'Commands',
    metaInfo: {
        title: 'Commands | Gamebot',
    },
    components: {
        CommandsTable,
        PageHero

    }
}
</script>