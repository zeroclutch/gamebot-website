<template>
<section class="gb-hero-background">
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
export default {
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
    background: radial-gradient(circle, rgba(121,234,193,1) 25%, rgba(51,206,255,1) 25%, rgba(121,234,193,1) 48%, rgba(255,51,137,1) 48%, rgba(121,234,193,1) 73%, rgba(51,206,255,1) 73%);
    background-size: 400% 400%;
	animation: reverse-gradient 60s ease-in-out infinite alternate;
}

.gb-hero {
    background: rgb(51,206,255);
    background: linear-gradient(153deg, rgba(51,206,255,1) 0%, rgba(92,222,219,0.7469581582633054) 7%, rgba(121,234,193,1) 12%, rgba(61,223,224,1) 18%, rgba(0,212,255,0.8169861694677871) 24%, rgba(69,225,220,1) 28%, rgba(121,234,193,0.9178265056022409) 31%, rgba(80,218,229,1) 36%, rgba(51,206,255,0.8029805672268908) 44%, rgba(61,212,253,1) 48%, rgba(75,220,249,0.9570421918767507) 54%, rgba(89,224,232,1) 57%, rgba(121,234,193,1) 64%, rgba(167,168,201,0.9066220238095238) 70%, rgba(229,80,211,1) 78%, rgba(205,97,217,0.7469581582633054) 81%, rgba(132,149,235,1) 90%, rgba(100,172,243,1) 94%, rgba(51,206,255,1) 100%);
	background-size: 800% 800%;
    animation: gradient 27s ease infinite alternate;

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
