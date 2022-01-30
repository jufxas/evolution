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
        this.topLeft = new XY(minX, minY);
    }
}
class CompressedDrawHandler {
    constructor(width, height, outlineColor, fillColor) {
        this.rectangleCoordHolder = [];
        this.isMouseDown = false;
        this.ignore = false;
        this.mouseWentDownAfterBeingUp = undefined;
        this.width = width || 3;
        this.height = height || 3;
        this.outlineColor = outlineColor || new RGBA(255, 255, 255);
        this.fillColor = fillColor || new RGBA(255, 255, 255);
    }
    onMouseDownFunction() {
        this.isMouseDown = true;
        this.mouseWentDownAfterBeingUp = false;
    }
    copyDrawData() {
        return this.rectangleCoordHolder;
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
            this.rectangleCoordHolder.push(new XY(mouseX, mouseY));
            if (this.rectangleCoordHolder.length >= 2 && this.ignore === false) {
                // last 2 elements 
                let rectangle1 = this.rectangleCoordHolder[this.rectangleCoordHolder.length - 2];
                let rectangle2 = this.rectangleCoordHolder[this.rectangleCoordHolder.length - 1];
                let deltaX = rectangle2.x - rectangle1.x;
                let deltaY = rectangle2.y - rectangle1.y;
                const numberOfSteps = Math.floor(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) / 2);
                deltaX /= numberOfSteps;
                deltaY /= numberOfSteps;
                for (let k = 0; k < numberOfSteps; k++) {
                    this.rectangleCoordHolder.push(new XY(rectangle1.x + k * deltaX, rectangle1.y + k * deltaY));
                }
            }
            if (this.ignore === true)
                this.ignore = false;
        }
    }
    renderRectangles(canvasRendererContext) {
        for (const r of this.rectangleCoordHolder) {
            canvasRendererContext.strokeStyle = this.outlineColor.format();
            canvasRendererContext.fillStyle = this.fillColor.format();
            canvasRendererContext.fillRect(r.x, r.y, this.width, this.height);
        }
    }
}
class ChunkCompressedData {
    constructor(coordData, pixelWidth, pixelHeight) {
        this.coordData = [];
        if (coordData.length === 0)
            return;
        this.coordData = coordData;
        let coordXValues = [];
        let coordYValues = [];
        for (const coord of coordData) {
            coordXValues.push(coord.x);
            coordYValues.push(coord.y);
        }
        let minX = Math.min(...coordXValues);
        let maxX = Math.max(...coordXValues);
        let minY = Math.min(...coordYValues);
        let maxY = Math.max(...coordYValues);
        this.width = Math.abs(maxX - minX) + (pixelWidth || 3);
        this.height = Math.abs(maxY - minY) + (pixelHeight || 3);
        this.topLeft = new XY(minX, minY);
    }
}
class LineDrawHandler {
    constructor(color) {
        this.pointHolder = [];
        this.mouseWentDownAfterBeingUp = undefined;
        this.startedLineButUnfinished = false;
        this.isMouseDown = false;
        this.mouseClicked = false;
        this.color = color || new RGBA(255, 255, 255);
    }
    onUpdate(mouseX, mouseY) {
        if (this.mouseClicked) {
            if (!this.startedLineButUnfinished) {
                console.log("pushed");
                this.pointHolder.push(new XY(mouseX, mouseY));
                this.startedLineButUnfinished = true;
            }
            else {
                this.startedLineButUnfinished = false;
            }
            if (this.isMouseDown)
                this.mouseClicked = false;
        }
        if (this.startedLineButUnfinished) {
            if (this.pointHolder.length === 1) {
                this.pointHolder.push(new XY(mouseX, mouseY));
            }
            else {
                this.pointHolder[this.pointHolder.length - 1] = new XY(mouseX, mouseY);
            }
        }
    }
    renderLines(canvasRendererContext) {
        for (let i = 0; i < this.pointHolder.length / 2; i++) {
            if (this.pointHolder.length % 2 !== 0 && (i * 2 + 1) === this.pointHolder.length) {
            }
            else
                (0, drawLine)(canvasRendererContext, this.pointHolder[i * 2], this.pointHolder[i * 2 + 1], this.color);
        }
    }
    onMouseDownFunction() {
        this.mouseClicked = true;
        this.isMouseDown = true;
        this.mouseWentDownAfterBeingUp = false;
    }
    onMouseUpFunction() {
        this.mouseClicked = false;
        this.isMouseDown = false;
        if (this.mouseWentDownAfterBeingUp === false)
            this.mouseWentDownAfterBeingUp = true;
    }
}

//jufSAVE
var draw = {
    DrawHandler: DrawHandler, 
    CompressedDrawHandler: CompressedDrawHandler,
    ChunkCompressedData: ChunkCompressedData,
    ChunkData: ChunkData,
    LineDrawHandler: LineDrawHandler, 
}