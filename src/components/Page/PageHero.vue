<template>
<section class="gb-hero-background">
    <PageGradient class="gradient-canvas" :colors="['#79eac1', '#79eac1', '#33ceff', '#e550d3', '#5865F2']"></PageGradient>
    <section class="gb-hero  m-0">
        <div class="hero-content-wrapper ">
            <h1 class="title is-marginless main-title"><span class="faded-text">{{ fadedText }}</span>{{ title }}</h1>
            <h3 class="title is-marginless main-title">{{ subtitle }}</h3>
            <slot></slot>
        </div>
    </section>
</section>
</template>


<script>
import PageGradient from './PageGradient.vue'
export default {
  components: { PageGradient },
  name: 'PageHero',
  props: {
    title: String,
    subtitle: String,
    fadedText: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.gb-hero-background {
    max-height: 400px;
    height: auto;
}

.gradient-canvas {
    animation: fade-in-static 2s;
    height: 100%;
    max-height: 400px;
    width: 100%;
    margin-bottom: -6px;
    z-index: 0;
}

.gb-hero {
    background: unset !important;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

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

.hero-holder {
    position: absolute;
    max-width: 400px;
}

</style>
