<template>
<section class="gb-hero-background">
    <section class="gb-hero fade-in">
        <div class="hero-content-wrapper">
            <h1 class="title is-marginless main-title"><span class="faded-text">{{ fadedText }}</span>{{ title }}</h1>
            <h3 class="title is-marginless main-title">{{ subtitle }}</h3>
            <slot></slot>
        </div>
    </section>
</section>
</template>


<script>
export default {
  components: {  },
  name: 'PageHero',
  props: {
    title: String,
    subtitle: String,
    fadedText: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.gb-hero-background {
    max-height: 360px;
    height: auto;
}

.gb-hero {
    background: unset !important;
    position: relative;
    margin-top: 3.5rem;
    width: 100%;

    .hero-content-wrapper {
        margin: 0 auto;
        max-width: $widescreen;
        padding: calc(3.5rem + 20px) 40px;
        text-align: left;

        @include mobile {
            padding: calc(3.5rem + 10px) 20px 40px;
        }
        .main-title {
            color: white;
        }
        h1 {
            padding: 20px 20px 20px 0px;
            font-size: 60px;
            font-weight: bold;
            @include mobile {
                font-size: 40px;
            }
        }
        .faded-text {
            opacity: 0.8;
        }
    }
}

</style>
