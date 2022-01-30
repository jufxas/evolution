"use strict";
class LineDrawHandler {
    constructor(color) {
        this.pointHolder = [];
        this.mouseWentDownAfterBeingUp = undefined;
        this.isMouseDown = false;
        this.ignore = false;
        this.color = color || new RGBA(255, 255, 255);
    }
    copyLines() {
        return this.pointHolder;
    }
    onUpdate(mouseX, mouseY) {
        if (this.mouseWentDownAfterBeingUp) {
            this.mouseWentDownAfterBeingUp = false;
            this.pointHolder.push(new XY(-1, -1)); // need some null points or identifiers so that when the pen is up then goes down, it doesn't link them up 
        }
        if (this.isMouseDown) {
            this.pointHolder.push(new XY(mouseX, mouseY));
        }
    }
    renderLines(canvasRendererContext) {
        for (let i = 0; i < this.pointHolder.length; i++) {
            if (i !== this.pointHolder.length - 1 && this.pointHolder[i].x !== -1 && this.pointHolder[i + 1].x !== -1) {
                (0, drawLine)(canvasRendererContext, this.pointHolder[i], this.pointHolder[i + 1], this.color);
            }
        }
    }
    onMouseDownFunction() {
        this.isMouseDown = true;
        this.mouseWentDownAfterBeingUp = false;
    }
    onMouseUpFunction() {
        this.isMouseDown = false;
        if (this.mouseWentDownAfterBeingUp === false)
            this.mouseWentDownAfterBeingUp = true;
    }
}
class LineChunks {
    constructor(lineCoords) {
        this.lineCoords = [];
        if (lineCoords.length === 0)
            return;
        this.lineCoords = lineCoords;
        let coordXValues = [];
        let coordYValues = [];
        for (const coord of lineCoords) {
            coordXValues.push(coord.x);
            coordYValues.push(coord.y);
        }
        let minX = Math.min(...coordXValues);
        let maxX = Math.max(...coordXValues);
        let minY = Math.min(...coordYValues);
        let maxY = Math.max(...coordYValues);
        this.width = Math.abs(maxX - minX);
        this.height = Math.abs(maxY - minY);
        this.topLeft = new XY(minX, minY);
    }
}

//jufSAVE
var draw = {
    LineDrawHandler: LineDrawHandler, 
    LineChunks: LineChunks,
}