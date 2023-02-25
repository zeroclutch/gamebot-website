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

            <div class="button-columns columns">
                <div class="size-buttons column">
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

                <div class="action-buttons column">
                    <b-button class="canvas-button"
                        @click="clearCanvas"
                        aria-label="Clear Canvas">
                        &times;
                    </b-button>
                    <b-button class="canvas-button"
                        @click="undo"
                        :disabled="!canUndo"
                        aria-label="Undo">
                        &hookleftarrow;
                    </b-button>
                    <b-button class="canvas-button"
                        @click="redo"
                        :disabled="!canRedo"
                        aria-label="Redo">
                        &hookrightarrow;
                    </b-button>
                </div>

                <div class="submit-button column is-3">
                    <b-button class="submit-button"
                        @click="submit"
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

    .canvas-button {
        height: 40px;
        width: 40px;

        border: 1px solid $gray-light;

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
</style>

<script>
import { fabric } from "fabric";

const LIGHT_COLORS = [
    'White',
    'Yellow',
]



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
