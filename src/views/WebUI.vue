<template>
    <div class="webui">
        <header class="webui-header">
            <div class="empty-bar">
                <div class="fill-bar">
                </div>

                <div class="fill-bar-label">{{ timeRemaining }}</div>
            </div>
        </header>
        <section class="fade-in webui-content-wrapper">
            <div class="webui-message" v-show="data.variables.message">
                <div class="webui-message-content">
                    {{ data.variables.message }}
                </div>
            </div>
            <div class="webui-content gradient-box">
                <WebUIText    :value="value" :data="data" @submit="submit" v-if="data.type === 'text'" />
                <WebUIDrawing :value="value" :data="data" @submit="submit" v-else-if="data.type === 'drawing'" />
            </div>
            <div class="webui-chat" v-if="true">

            </div>
        </section>
    </div>
</template>

<script>
import WebUIText from '@/components/WebUI/WebUIText.vue'
import WebUIDrawing from '@/components/WebUI/WebUIDrawing.vue'

import { createErrorHandler } from '@/util/errors.js'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

const Times = {
    TWO_MINUTES: 60 * 1000,
    FIVE_MINUTES: 5 * 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000,
    ONE_DAY: 24 * 60 * 60 * 1000,
}

export default {
    name: 'WebUI',
    components: {
        WebUIText,
        WebUIDrawing
    },
    data() {
        return {
            value: null,
            startTime: null,
            data: {
                type: '',
                killAt: null,
                shard: 0,
                user: {
                    id: '',
                    bot: false,
                    tag: '',
                    displayAvatarURL: '',
                },
                variables: {
                    message: '',
                    name: ''
                }
            },
            interval: false,
            timeRemaining: 'Loading...'
        }
    },
    created() {
        this.startTime = Date.now()

        this.getWebUI()
        .then(() => {
            if(!this.interval) {
                this.interval = setInterval(function() {
                    this.setTimeRemaining()
                    
                    if(!prefersReducedMotion.matches) {
                        this.animateFillBar()
                    }
                }.bind(this), 1000);
            }
        })

    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    computed: {
        id() {
            return this.$route.params.id
        },
    },
    methods: {
        getWebUI() {
            return fetch(`/api/ui/${this.id}`)
                .then(response => response.json())
                .then(data => {
                    this.data = data
                    console.log(data)
                })
                .catch(createErrorHandler('WEB_UI_MISSING', this.$router))
        },
        submit(value) {
            const body = JSON.stringify({
                id: this.id,
                value
            })

            fetch(`/api/ui/${this.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            })
                .then(() => {
                    this.$router.push('../success')
                })
                .catch(createErrorHandler('WEB_UI_MISSING', this.$router))
        },
        setTimeRemaining() {
            // Calculates the time left in a human-readable format
            let ms = this.data.killAt - Date.now()
            let s = Math.floor(ms / 1000)
            let m = Math.floor(s / 60)
            let h = Math.floor(m / 60)

            s %= 60
            m %= 60
            h %= 24

            let time = []
            if(ms >  Times.ONE_HOUR)     time.push(`${h} hours`)
            if(ms >  Times.TWO_MINUTES)  time.push(`${m} minutes`)
            if(ms <= Times.FIVE_MINUTES) time.push(`${s} seconds`)
            this.timeRemaining = time.join(', ') + ' left'
        },
        animateFillBar() {
            if(!this || !this.interval) return
            let percent = (this.data.killAt - Date.now())/(this.data.killAt - this.startTime)
            document.querySelector('.fill-bar').style.right = `${(1 - percent) * window.innerWidth}px`
        }
    }
}

</script>

<style lang="scss">
.webui {
    width: 100vw;
    height: 100vh;
    background: $light;
}

.webui-header {
    display: flex;
    align-items: center;
}

$fill-bar-height: 0.75rem;
$fill-bar-height-expanded: 2.5rem;


@mixin expanded-bar {
    height: $fill-bar-height-expanded;
    
    .fill-bar-label {
        opacity: 1;
    }

    .fill-bar {
        filter: brightness(0.9);
        -webkit-filter: brightness(0.9);
    }
}

.empty-bar {
    width: 100%;
    height: $fill-bar-height;
    background-color: $discord-background-primary;
    position: relative;
    transition: height 200ms ease;

    z-index: 2;

    .fill-bar-label {
        position: absolute;
        opacity: 0;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: white;
        transition: opacity 0.2s ease;
    }

    &:hover {
        @include expanded-bar;
    }

    .fill-bar {
        position: absolute;
        width: 100vw;
        height: 100%;
        transition: 0.5s;
        background: $gamebot-gradient;
        background-size: 300% 300%;
        background-position: 0% 50%;
        animation: reverse-gradient 20s infinite alternate ease-in-out;
        -webkit-animation: reverse-gradient 20s infinite alternate ease-in-out;
    }
}


@media (prefers-reduced-motion: reduce) {
    .empty-bar {
        transition: none;
        @include expanded-bar;

        .fill-bar {
            animation: none;
        }
    }
} 

.webui-content-wrapper {
    position: absolute;
    top: 0; 
    left: 0;

    height: 100vh;
    width: 100vw;

    display: flex;
    flex-grow: 1;
    flex: 1;
    
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.webui-content {
    background: $white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 0.5rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.05);

    padding: 2em;
    box-sizing: border-box;

    background: white;
    background-clip: border-box; 
    border: solid $border transparent;

    @media (prefers-reduced-motion: reduce) {
        &:before {
            animation: none;
        }
    }
}

@media screen and (max-width: 768px) {

    .empty-bar {
        @include expanded-bar;
    }

    .webui-content {
        padding: 0;
        padding-top: $fill-bar-height-expanded;
        box-shadow: none;
        height: 100%;
        width: 100%;
        border-radius: 0;
    }
}
</style>