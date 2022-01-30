"use strict";
class Line {
    constructor(P1, P2, color) {
        this.P1 = P1;
        this.P2 = P2;
        this.color = color || new RGBA(0, 0, 0);
    }
    drawLine(canvasRendererContext) {
        canvasRendererContext.beginPath();
        canvasRendererContext.moveTo(this.P1.x, this.P1.y);
        canvasRendererContext.lineTo(this.P2.x, this.P2.y);
        canvasRendererContext.strokeStyle = this.color.format();
        canvasRendererContext.stroke();
    }
}
function drawLine(canvasRendererContext, P1, P2, color) {
    canvasRendererContext.beginPath();
    canvasRendererContext.moveTo(P1.x, P1.y);
    canvasRendererContext.lineTo(P2.x, P2.y);
    canvasRendererContext.strokeStyle = color.format();
    canvasRendererContext.stroke();
}

//jufSAVE 
var line = {
    Line: Line,
    drawLine: drawLine, 
}