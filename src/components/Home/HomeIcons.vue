<template>
    <section class="tiles columns is-marginless">
        <div class="column is-3">
            <div class="icon-holder faded-out" v-animate-onscroll="'fade-in-delayed'">
                <!--Icon SVG-->
                <img src="@/assets/images/icon/gem.svg">
            </div>
            <h6 class="icon-title faded-out" v-animate-onscroll="'fade-in-delayed'">Economy System</h6>
            <div class="icon-desc faded-out" v-animate-onscroll="'fade-in-delayed'">Gamebot features a full economy system with tons of unlockable content</div>
        </div>

        <div class="column is-3">
            <div class="icon-holder faded-out" v-animate-onscroll="'fade-in-delayed'">
                <!--Icon SVG-->
                <img src="@/assets/images/icon/controller.svg">
            </div>
            <h6 class="icon-title faded-out" v-animate-onscroll="'fade-in-delayed'">Tons of Content</h6>
            <div class="icon-desc faded-out" v-animate-onscroll="'fade-in-delayed'">Frequent updates with new games, new commands, and improvements</div>
        </div>

        <div class="column is-3">
            <div class="icon-holder faded-out" v-animate-onscroll="'fade-in-delayed'">
                <!--Icon SVG-->
                <img src="@/assets/images/icon/paintbrush.svg">
            </div>
            <h6 class="icon-title faded-out" v-animate-onscroll="'fade-in-delayed'">Feature-Rich</h6>
            <div class="icon-desc faded-out" v-animate-onscroll="'fade-in-delayed'">Brings unique features beyond multiplayer gaming, including creating drawings on Discord</div>
        </div>



        <div class="column is-3">
            <div class="icon-holder faded-out" v-animate-onscroll="'fade-in-delayed'">
                <!--Icon SVG-->
                <img src="@/assets/images/icon/github.svg">
            </div>
            <h6 class="icon-title faded-out" v-animate-onscroll="'fade-in-delayed'">Open Source</h6>
            <div class="icon-desc faded-out" v-animate-onscroll="'fade-in-delayed'">100% open source on Github under the CC BY-NC SA 4.0 license</div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

.tiles {
    background-color: #f2f2f2;
}

.tiles > .column {
    text-align: center;
    padding: 80px 10px;
    @include mobile {
        padding: 20px 10px;
    }
}

.icon-holder {
    height: 80px;
    width: 80px;
    margin: 0 auto;
}

h6.icon-title {
    font-size: 24px;
    font-weight: bold
}

div.icon-title {
    font-size: 24px;
}

</style>

<script>
export default {
    name: 'HomeIcons'
}
</script>