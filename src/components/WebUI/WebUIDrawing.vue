<template>
    <main>
        <!--Drawing canvas-->
        <canvas id="drawingCanvas" width="600" height="500"></canvas>
        <aside class="buttons">
            <div class="columns">
                <div class="color-buttons column">
                    <b-button class="color canvas-button"
                        rounded
                        v-for="(color, i) in colors"
                        :key="color.name"
                        :class="{
                            selected: (selectedColor || 0) === i,
                        }"
                        @click="setColor(i)">
                        <div class="circle" :style="getColorButtonStyle(i)"></div>
                    </b-button>
                </div>
            </div>

            <div class="button-columns columns is-mobile is-multiline">
                <div class="size-buttons column is-12-mobile is-5-tablet">
                    <b-button class="size canvas-button"
                        v-for="(size, i) in sizes"
                        :key="size.name"
                        :class="{ selected: (selectedSize || 0) === i }"
                        @click="setSize(i)"
                        rounded
                        :aria-label="size.name">
                            <div class="circle" :style="size.style"></div>
                    </b-button>
                </div>

                <div class="action-buttons column is-half-mobile">
                    <b-tooltip 
                        class="canvas-button-tooltip"
                        label="Clear"
                        :delay="200"
                        type="is-light">
                        <b-button class="canvas-button"
                            @click="clearCanvas"
                            type="is-danger"
                            icon-left="times"
                            icon-pack="fas"
                            aria-label="Clear Canvas">
                        </b-button>
                    </b-tooltip>

                    <b-tooltip 
                        class="canvas-button-tooltip"
                        label="Undo"
                        :delay="200"
                        type="is-light">
                        <b-button class="canvas-button"
                            @click="undo"
                            type="is-light"
                            icon-left="arrow-left"
                            icon-pack="fas"
                            :disabled="!canUndo"
                            aria-label="Undo">
                        </b-button>
                    </b-tooltip>

                    
                    <b-tooltip 
                        class="canvas-button-tooltip"
                        label="Redo"
                        :delay="200"
                        type="is-light">
                        <b-button class="canvas-button"
                            @click="redo"
                            type="is-light"
                            icon-left="arrow-right"
                            icon-pack="fas"
                            :disabled="!canRedo"
                            aria-label="Redo">
                        </b-button>
                    </b-tooltip>
                </div>

                <div class="submit-button column is-6-mobile">
                    <b-button class="submit-button"
                        @click="submit"
                        type="is-success"
                        icon-right="arrow-circle-right"
                        icon-pack="fas"
                        aria-label="Submit">
                        Submit
                    </b-button>
                </div>
            </div>
        </aside>
    </main>
</template>

<style lang="scss">
canvas {
    border: 1px solid $gray;
}

$canvas-width: 600px;

aside.buttons {
    
    width: calc(#{$canvas-width} + 1.5rem);
    margin: 0 -0.75rem;

    .columns {
        margin: 0;
        text-align: center;
        .column {
            position: relative;
            padding: 0.5rem 0.75rem;
        }
    }

    .button-columns {
        width: 100%;
        margin-top: 0;
        height: auto;
        
        .column:first-child {
            text-align: left;
        }
        .column:last-child {
            text-align: right;
        }
    }
    
    .button {
        margin: 0;
    }

    .canvas-button-tooltip:not(:last-child) {
        margin-right: 0.5rem;
    }
    .canvas-button {
        height: 40px;
        width: 40px;

        &.selected {
            border: 1px solid $black;
        }
    }

    .circle {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: #000000;
        transition: all 100ms;
    }
}

@media screen and (max-width: 768px) {

    aside.buttons {
        position: absolute;
        bottom: 0.5rem;
        margin: 0;
        width: 100%;

        .columns {
            margin: 0 auto;
            .column {
                margin: 0.1rem auto;
                padding: 0;

                button.button.canvas-button:not(:last-child) {
                    margin-right: 0.1rem;
                    margin-top: 0.1rem;
                }
                &:first-child, &:last-child {
                    text-align: center;
                }
            }
        }

    }
    .canvas-holder {
        margin: -1rem;
        padding: 0;
    }
}

</style>

<script>
import { fabric } from "fabric";

const LIGHT_COLORS = [
    'White',
    'Yellow',
]

const isMobile = () => {
    // Check if mobile
    return window.matchMedia('(max-width: 768px)').matches;
}

export default {
    name: 'WebUIDrawing',
    props: {
        data: Object,
        value: Object,
    },
    data() {
        return {
            sizes: [
                { name: 'Pen',    style: { width: '2px', height: '2px' } },
                { name: 'Small',  style: { width: '10px', height: '10px' } },
                { name: 'Medium', style: { width: '20px', height: '20px' } },
                { name: 'Large',  style: { width: '30px', height: '30px' } },
            ],
            selectedSize: 0,
            colors: [
                { name: 'Red',         style: { backgroundColor: '#ff3347' } },
                { name: 'Orange',      style: { backgroundColor: '#ff6d33' } },
                { name: 'Yellow',      style: { backgroundColor: '#ffe033' } },
                { name: 'Green',       style: { backgroundColor: '#38ff5d' } },
                { name: 'Dark Green',  style: { backgroundColor: '#00853e' } },
                { name: 'Blue',        style: { backgroundColor: '#33d3ff' } },
                { name: 'Pink',        style: { backgroundColor: '#ff33b1' } },
                { name: 'Purple',      style: { backgroundColor: '#7433ff' } },
                { name: 'Tan',         style: { backgroundColor: '#ffd7a3' } },
                { name: 'Brown',       style: { backgroundColor: '#ac692f' } },
                { name: 'Black',       style: { backgroundColor: '#1c1c1c' } },
                { name: 'White',       style: { backgroundColor: '#ffffff' } },
            ],
            selectedColor: 0,
            canvas: null,
            canvasHistory: [],
            undoHistory: [],
        }
    },
    mounted() {
        this.canvasElement = document.getElementById('drawingCanvas');
        this.canvas = new fabric.Canvas('drawingCanvas');
        this.canvas.isDrawingMode = true;

        // Set a white background
        this.canvas.setBackgroundColor('white', this.canvas.renderAll.bind(this.canvas));

        this.setSize(this.selectedSize);
        this.setColor(this.selectedColor);

        this.canvas.on({
            "object:added": this.historySaveAction.bind(this),
            "object:removed": this.historySaveAction.bind(this),
            "object:modified": this.historySaveAction.bind(this)
        })

        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));
    },
    methods: {
        submit() {
            const dataURL = this.canvas.toDataURL();
            let image = dataURL.replace(/^data:image\/\w+;base64,/, '')
            this.$emit('submit', image);
        },
        setSize(i) {
            this.selectedSize = i;
            this.canvas.freeDrawingBrush.width = parseInt(this.sizes[i].style.width);
            this.canvas.freeDrawingBrush.height = parseInt(this.sizes[i].style.height);
        },
        setColor(i) {
            this.selectedColor = i;
            this.canvas.freeDrawingBrush.color = this.colors[i].style.backgroundColor;
        },
        getColorButtonStyle(i) {
            if(!this.colors[i] || !this.colors[i].style)
                return { visibility: 'hidden' }
            
            let addedStyles = {
                minHeight: '10px',
                minWidth: '10px',
            };
            if(LIGHT_COLORS.includes(this.colors[i].name)) {
                addedStyles = {...addedStyles, border: '1px solid #000000' };
            }
            return {...this.colors[i].style, ...this.sizes[this.selectedSize || 0].style, ...addedStyles};
        },
        clearCanvas() {
            this.canvas.clear();
            // Set a white background
            this.canvas.setBackgroundColor('white', this.canvas.renderAll.bind(this.canvas));
            this.canvasHistory = [];
            this.undoHistory = [];
        },
        undo() {
            let lastItem = this.canvasHistory.pop();
            if(lastItem) {
                lastItem.visible = false;
                this.undoHistory.push(lastItem)
                this.canvas.renderAll();
            }
        },
        redo() {
            let lastItem = this.undoHistory.pop();
            if(lastItem) {
                lastItem.visible = true;
                this.canvasHistory.push(lastItem)
                this.canvas.renderAll();
            }
        },
        historySaveAction(e) {
            this.canvasHistory.push(e.target)
            this.undoHistory = [];
        },
        handleResize() {
            if(isMobile()) {
                const controlsStyle = window.getComputedStyle(document.querySelector('aside.buttons'))
                const controlsHeight = parseInt(controlsStyle.height) + parseInt(controlsStyle.bottom);
                this.canvas.setWidth(window.innerWidth);
                this.canvas.setHeight(window.innerHeight - (controlsHeight + 34));
                this.canvas.calcOffset();
            } else {
                this.canvas.setWidth(600);
                this.canvas.setHeight(500);
                this.canvas.calcOffset();
            }

            // Set a white background
            this.canvas.setBackgroundColor('white', this.canvas.renderAll.bind(this.canvas));
        }
    },
    computed: {
        canUndo() {
            return this.canvasHistory.length > 0;
        },
        canRedo() {
            return this.undoHistory.length > 0;
        }
    }
}
</script>
