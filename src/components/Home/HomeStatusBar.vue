<template>
    <section class="status-bar has-background-discord">
        <div class="columns is-mobile">
            <div class="column is-4-desktop is-4-tablet is-paddingless status-column">
                <!--Status and tag-->
                <div class="profile-picture">
                    <b-image 
                        :src="require(`@/assets/images/brand/64w/pfp.png`) + `.webp`"
                        :webp-fallback="require('@/assets/images/brand/64w/pfp.png')"
                        />
                </div>
                <div class="profile-name status-content is-0-mobile">
                    <span>Gamebot</span><span class="translucent">#4700</span>
                    &nbsp;
                    <span class="status-indicator" :class="{ 'online': status }"></span>
                </div>
            </div>
            <div class="column is-4 is-paddingless status-column">
                <!--Server count-->
                <div class="status-content">
                    <span id="servers">{{ status.guilds || '??' }}</span> <span class="translucent">servers</span>
                </div>
                &nbsp;
                <!--Shard count-->
                <div class="status-content is-hidden-mobile">
                    <span id="shards">{{ status.shards || '??' }}</span> <span class="translucent">shards</span>
                </div>
            </div>
            <div class="column is-2-desktop is-0-tablet is-0-mobile is-paddingless status-column">
            </div>
            <div class="column is-0-tablet is-0-mobile is-paddingless status-column">
                <!--Placeholder for dropdown-->
                &nbsp;
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'StatusBar',
    data() {
        return {
            status: {
                guilds: '??',
                shards: '??'
            }
        }
    },
    methods: {
        async fetchStatus() {
            let res = await fetch('/api/guilds')
            this.status = (await res.json()) || { guilds: '??', shards: '??'}
        }
    },

    async mounted() {
        this.fetchStatus()
    }
}
</script>

<style lang="scss" scoped>

.status-bar {
    padding: 5px;
    position: relative;
    z-index: 1;
    .columns {
        margin: 0 auto;
        max-width: $widescreen;
    }
}


.profile-picture {
    height: 56px;
    width: 56px;
    border-radius: 100%;
    border: 4px solid #5168C8;
    overflow: hidden;
    display: inline-block;
}

.profile-name {
    padding-left: 10px;
}

.status-column {
    height: 56px;
    text-align: left;
    padding: 0 20px;
}

.translucent {
    opacity: 0.6;
}

.status-content {
    display: inline-block;
    font-weight: bold;
    color:white;
    vertical-align: top;
    line-height: 56px;
    min-width: 100px;
}

.status-indicator {
    display: inline-block;
    height: 10px;
    width: 10px;
    background-color: #dddddd;
    border-radius: 100%;
    position: relative;
    line-height: 56px;
}

.status-indicator.online {
    background: #6FCF97;
}

</style>