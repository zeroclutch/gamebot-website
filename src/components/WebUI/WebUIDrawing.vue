<template>
    <main>
        <!--Drawing canvas-->
        <canvas id="drawingCanvas" width="500" height="500"></canvas>
        <aside class="buttons">
            <div class="size-buttons">
                <b-button class="size canvas-button"
                    v-for="(size, i) in sizes"
                    :key="size.name"
                    :class="{ selected: (selectedSize || 0)  === i }"
                    @click="setSize(i)"
                    :aria-label="size.name">
                        <div class="circle" :style="size.style"></div>
                </b-button>
            </div>
            <div class="color-buttons">
                <b-button class="color canvas-button"
                    v-for="(color, i) in colors"
                    :key="color.name"
                    :class="{ selected: (selectedColor || 6) === i }"
                    @click="setColor(i)">
                    <div class="circle" :style="getColorButtonStyle(i)"></div>
                </b-button>
            </div>
            <div class="action-buttons">
                <b-button class="canvas-button"
                    @click="clearCanvas"
                    aria-label="Clear Canvas">
                    &times;
                </b-button>
                <b-button class="canvas-button"
                    @click="undo"
                    aria-label="Undo">
                    &hookleftarrow;
                </b-button>
                <b-button class="canvas-button"
                    @click="redo"
                    aria-label="Redo">
                    &hookrightarrow;
                </b-button>
            </div>
        </aside>
    </main>
</template>

<style lang="scss">
canvas {
    border: 1px solid $black;
}

aside.buttons {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
</style>

<script>
import { fabric } from "fabric";

const LIGHT_COLORS = [
    'White',
    'Yellow',
]

let canvasHistory = []
let undoHistory = []

export default {
    name: 'WebUIDrawing',
    props: {
        data: Object,
        value: Object,
    },
    data() {
        return {
            sizes: [
                { name: 'Small',  style: { width: '10px', height: '10px' } },
                { name: 'Medium', style: { width: '20px', height: '20px' } },
                { name: 'Large',  style: { width: '30px', height: '30px' } },
            ],
            selectedSize: 0,
            colors: [
                { name: 'Red',    style: { backgroundColor: '#ff0000' } },
                { name: 'Orange', style: { backgroundColor: '#ffa500' } },
                { name: 'Yellow', style: { backgroundColor: '#ffff00' } },
                { name: 'Green',  style: { backgroundColor: '#008000' } },
                { name: 'Blue',   style: { backgroundColor: '#0000ff' } },
                { name: 'Purple', style: { backgroundColor: '#800080' } },
                { name: 'Black',  style: { backgroundColor: '#000000' } },
                { name: 'White',  style: { backgroundColor: '#ffffff' } },
            ],
            selectedColor: 6,
            canvas: null,
        }
    },
    mounted() {
        this.canvas = new fabric.Canvas('drawingCanvas');
        this.canvas.isDrawingMode = true;
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
            this.$emit('submit', this.text)
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
            
            let addedStyles = {};
            if(LIGHT_COLORS.includes(this.colors[i].name)) {
                addedStyles = { border: '1px solid #000000' };
            }
            return {...this.colors[i].style, ...this.sizes[this.selectedSize || 0].style, ...addedStyles};
        },
        clearCanvas() {
            this.canvas.clear();
        },
        undo() {
            let lastItem = canvasHistory.pop();
            if(lastItem) {
                lastItem.visible = false;
                undoHistory.push(lastItem)
                this.canvas.renderAll();
            }
        },
        redo() {
            let lastItem = undoHistory.pop();
            if(lastItem) {
                lastItem.visible = true;
                canvasHistory.push(lastItem)
                this.canvas.renderAll();
            }
        },
        historySaveAction(e) {
            canvasHistory.push(e.target)
            undoHistory = [];
        }
    },

}
</script>
