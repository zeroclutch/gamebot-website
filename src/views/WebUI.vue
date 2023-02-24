<template>
    <div class="webui">
        <header class="webui-header">
            <div class="empty-bar">
                <div class="fill-bar">
                </div>

                <div class="fill-bar-label">{{ timeRemaining }}</div>
            </div>
        </header>
        <div class="webui-content">
            <WebUIText    :value="value" :data="data" @submit="submit()" v-if="data.type === 'text'" />
            <WebUIDrawing :value="value" :data="data" @submit="submit()" v-else-if="data.type === 'drawing'" />
        </div>
    </div>
</template>

<script>
import WebUIText from '@/components/WebUI/WebUIText.vue'
import WebUIDrawing from '@/components/WebUI/WebUIDrawing.vue'

import { createErrorHandler } from '@/util/errors.js'

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
                variables: {}
            }
        }
    },
    mounted() {
        this.startTime = Date.now()

        this.getWebUI()
        .then(() => {
            setInterval(function() { this.updateFillBar() }.bind(this), 1000);
        })

    },
    computed: {
        id() {
            return this.$route.params.id
        },
        timeRemaining() {
            // Calculates the time left in a human-readable format
            
            const ms = this.data.killAt - Date.now()
            const s = Math.floor(ms / 1000)
            const m = Math.floor(s / 60)
            const h = Math.floor(m / 60)

            if(h > 0) return `${h} hours left`
            else if(m > 2) return `${m} minutes left`
            else return `${s} seconds left`
        }
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
        submit() {
            fetch(`/api/ui/${this.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: this.value
                })
            })
                .then(() => {
                    this.$router.push('../success')
                })
                .catch(createErrorHandler('WEB_UI_MISSING', this.$router))
        },
        updateFillBar() {
            let percent = (this.data.killAt - Date.now())/(this.data.killAt - this.startTime) 
            console.log(percent, this.data.killAt, this.startTime)
            document.querySelector('.fill-bar').style.width      = `${percent * window.innerWidth}px`
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

$fill-bar-height: 8px;

.empty-bar {
    width: 100%;
    height: $fill-bar-height;
    background-color: $discord-background-primary;
    position: relative;

    transition: height 200ms ease;

    .fill-bar-label {
        position: absolute;
        opacity: 0;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: white;
    }

    &:hover {
        height: 55px;
        .fill-bar-label {
            opacity: 1;
        }
    }

    .fill-bar {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        background: $gamebot-gradient;
        background-size: 200% 200%;
        background-position: 0% 50%;
        animation: reverse-gradient 20s infinite alternate ease-in-out;
        -webkit-animation: reverse-gradient 20s infinite alternate ease-in-out;
    }
}

.webui-content {
    background: $white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 0.5rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.05);
}
</style>