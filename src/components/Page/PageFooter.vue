<template>
    <footer class="has-background-dark">
        <div class="footer-columns columns is-mobile is-multiline">
            <div class="column is-1-desktop is-0-tablet"></div>
            <div class="column is-4-tablet is-12-mobile footer-brand">
                <div class="footer-brand-wrapper">
                    <div class="footer-brand-text has-text-left p-6">
                        <h1 class="title has-text-darkest is-4">         
                            <img
                                draggable="false"
                                class="logo-dark"
                                src="@/assets/images/brand/logo-icon.svg"
                                alt="Gamebot Logo"
                                width="28px">
                            &nbsp;Gamebot.
                        </h1>
                        <p class="subtitle has-text-darkest">Play on Discord!</p>
                        <p class="copyright has-text-darkest-light">Copyright &copy; 2019 - {{new Date().getFullYear()}} Zero </p>
                    </div>
                </div>
            </div>
            <div class="column is-2-tablet is-3-mobile footer-links">
                <div class="footer-links-wrapper">
                    <div class="footer-links-text has-text-left p-6">
                        <h1 class="has-text-darkest-light is-4">CONTACT</h1>
                        <p class="has-text-darkest-light is-6">
                            <a href="https://discord.gg/g3qU24mfbK" target="_blank" rel="noopener noreferrer">Support</a>
                            <a href="https://gamebot.rocks/discord" target="_blank" rel="noopener noreferrer">Discord</a>
                            <a href="https://twitter.com/gamebotdiscord" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://www.tiktok.com/@gamebotfordiscord" target="_blank" rel="noopener noreferrer">TikTok</a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="column is-2-tablet is-3-mobile footer-links">
                <div class="footer-links-wrapper">
                    <div class="footer-links-text has-text-left p-6">
                        <h1 class="has-text-darkest-light is-4">DEVELOPER</h1>
                        <p class="has-text-darkest-light is-6">
                            <a href="https://github.com/zeroclutch/gamebot" target="_blank" rel="noopener noreferrer">Github</a>
                            <a href="https://discord.gg/fgcfwmaxjF" target="_blank" rel="noopener noreferrer">Bug Report</a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="column is-2-tablet is-3-mobile footer-links">
                <div class="footer-links-wrapper">
                    <div class="footer-links-text has-text-left p-6">
                        <h1 class="has-text-darkest-light is-4">LEGAL</h1>
                        <p class="has-text-darkest-light is-6">
                            <a href="/privacy">Privacy</a>
                            <a href="/terms">Terms</a>
                            <a href="https://github.com/zeroclutch/gamebot/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">Twitter</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">


footer {
    padding: 0 0 2rem 0;
    .footer-columns {
        margin: 0 auto;
        max-width: $widescreen;
        position: relative;

        .copyright {
            position: absolute;
            bottom: 0;
            font-size: 0.75rem;
        }

        .footer-brand-text {
            letter-spacing: -0.3px;
            .title {
                font-weight: 700;
            }

            .subtitle {
                font-weight: 500;
                opacity: 0.8;
            }
            .logo-dark {
                filter: invert(1) brightness(0.35);
            }
        }

        .footer-links {
            h1 {
                font-weight: 500;
                font-size: 0.75rem;
            }

            a {
                color: $darkest-invert;
                margin-top: 0.75rem;
                display: block;
            }
        }
    }
}
</style>

<script>
export default {
    name: 'Footer'
}
</script>