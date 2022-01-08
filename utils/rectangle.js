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


var rectangle = {
    Rectangle: Rectangle
}