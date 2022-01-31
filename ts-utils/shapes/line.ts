import { XY } from "../xy"
import { RGBA } from "../rgba"
export class Line {
    P1: XY 
    P2: XY 
    color: RGBA 
    constructor(P1: XY, P2: XY, color?: RGBA) {
        this.P1 = P1 
        this.P2 = P2 
        this.color = color || new RGBA(0,0,0)
    }
    drawLine(canvasRendererContext: CanvasRenderingContext2D) {
        canvasRendererContext.beginPath()
        canvasRendererContext.moveTo(this.P1.x, this.P1.y)
        canvasRendererContext.lineTo(this.P2.x, this.P2.y)
        canvasRendererContext.strokeStyle = this.color.format()
        canvasRendererContext.stroke()
    }
}
export function drawLine(canvasRendererContext: CanvasRenderingContext2D, P1: XY, P2: XY, color: RGBA) {
    canvasRendererContext.beginPath()
    canvasRendererContext.moveTo(P1.x, P1.y)
    canvasRendererContext.lineTo(P2.x, P2.y)
    canvasRendererContext.strokeStyle = color.format()
    canvasRendererContext.stroke()
}

// from https://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm 
export const VectorOperations = {
    add: function(P1: XY, P2: XY) {
        return new XY(P1.x + P2.x, P1.y + P2.y)
    },
    subtract: function(P1: XY, P2: XY) {
        return new XY(P1.x - P2.x, P1.y - P2.y)
    },
    dp2D: function(P1: XY, P2: XY) { // dot product for 2 dimensional vectors 
        return P1.x*P2.x + P1.y*P2.y
    },
    proj: function(P1: XY, P2: XY) {
        const k = this.dp2D(P1, P2) / this.dp2D(P2, P2)
        return new XY(k*P2.x, k*P2.y)
    },
    hypot2: function(P1: XY, P2: XY) { 
        return this.dp2D(this.subtract(P1, P2), this.subtract(P1, P2))
    }
}
