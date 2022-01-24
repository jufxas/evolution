"use strict";
class Circle {
    constructor(circle) {
        this.x = circle.x;
        this.y = circle.y;
        this.radius = circle.radius;
        this.outlineColor = circle.outlineColor;
        this.fillColor = circle.fillColor;
    }
    drawCircle(canvasRendererContext) {
        canvasRendererContext.beginPath();
        canvasRendererContext.strokeStyle = this.outlineColor.format();
        canvasRendererContext.fillStyle = this.fillColor.format();
        canvasRendererContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        canvasRendererContext.fill();
        canvasRendererContext.stroke();
    }
}

//jufSAVE 
var circle = {
    Circle: Circle
} 