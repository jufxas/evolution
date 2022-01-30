"use strict";
class Rectangle {
    constructor(rectangle) {
        this.x = rectangle.x;
        this.y = rectangle.y;
        this.width = rectangle.width;
        this.height = rectangle.height;
        this.outlineColor = rectangle.outlineColor;
        this.fillColor = rectangle.fillColor;
    }
    drawRectangle(canvasRendererContext) {
        canvasRendererContext.strokeStyle = this.outlineColor.format();
        canvasRendererContext.fillStyle = this.fillColor.format();
        canvasRendererContext.fillRect(this.x, this.y, this.width, this.height);
    }
}
function drawRectangle(canvasRendererContext, rectangle) {
    canvasRendererContext.strokeStyle = rectangle.outlineColor.format();
    canvasRendererContext.fillStyle = rectangle.fillColor.format();
    canvasRendererContext.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}

//jufSAVE
var rectangle = {
    Rectangle: Rectangle,
    drawRectangle: drawRectangle, 
}