"use strict";
class DrawHandler {
    constructor(outlineColor, fillColor) {
        this.rectangleHolder = [];
        this.isMouseDown = false;
        this.ignore = false;
        this.mouseWentDownAfterBeingUp = undefined;
        this.outlineColor = outlineColor || new RGBA(255, 255, 255);
        this.fillColor = fillColor || new RGBA(255, 255, 255);
    }
    onMouseDownFunction() {
        this.isMouseDown = true;
        this.mouseWentDownAfterBeingUp = false;
    }
    copyDrawData() {
        return this.rectangleHolder;
    }
    onMouseUpFunction() {
        this.isMouseDown = false;
        if (this.mouseWentDownAfterBeingUp === false)
            this.mouseWentDownAfterBeingUp = true;
    }
    onUpdate(mouseX, mouseY) {
        if (this.mouseWentDownAfterBeingUp) {
            this.ignore = true;
            this.mouseWentDownAfterBeingUp = false;
        }
        if (this.isMouseDown) {
            this.rectangleHolder.push(new Rectangle({
                x: mouseX,
                y: mouseY,
                width: 3,
                height: 3,
                outlineColor: this.outlineColor,
                fillColor: this.fillColor,
            }));
            if (this.rectangleHolder.length >= 2 && this.ignore === false) {
                // last 2 elements 
                let rectangle1 = this.rectangleHolder[this.rectangleHolder.length - 2];
                let rectangle2 = this.rectangleHolder[this.rectangleHolder.length - 1];
                let deltaX = rectangle2.x - rectangle1.x;
                let deltaY = rectangle2.y - rectangle1.y;
                const numberOfSteps = Math.floor(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) / 2);
                deltaX /= numberOfSteps;
                deltaY /= numberOfSteps;
                for (let k = 0; k < numberOfSteps; k++) {
                    this.rectangleHolder.push(new Rectangle({
                        x: rectangle1.x + k * deltaX,
                        y: rectangle1.y + k * deltaY,
                        width: rectangle1.width,
                        height: rectangle1.height,
                        outlineColor: rectangle1.outlineColor,
                        fillColor: rectangle1.fillColor,
                    }));
                }
            }
            if (this.ignore === true)
                this.ignore = false;
        }
    }
    renderRectangles(canvasRendererContext) {
        for (const r of this.rectangleHolder) {
            r.drawRectangle(canvasRendererContext);
        }
    }
}
class ChunkData {
    constructor(pixelData) {
        this.pixelData = [];
        if (pixelData.length === 0)
            return;
        this.pixelData = pixelData;
        let pixelXValues = [];
        let pixelYValues = [];
        let pixelWidth = pixelData[0].width;
        let pixelHeight = pixelData[0].height;
        for (const pixel of pixelData) {
            pixelXValues.push(pixel.x);
            pixelYValues.push(pixel.y);
        }
        let minX = Math.min(...pixelXValues);
        let maxX = Math.max(...pixelXValues);
        let minY = Math.min(...pixelYValues);
        let maxY = Math.max(...pixelYValues);
        this.width = Math.abs(maxX - minX) + pixelWidth;
        this.height = Math.abs(maxY - minY) + pixelHeight;
        this.topLeft = { x: minX, y: minY };
    }
}

var draw = {
    DrawHandler: DrawHandler, 
    ChunkData: ChunkData
}