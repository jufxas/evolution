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
