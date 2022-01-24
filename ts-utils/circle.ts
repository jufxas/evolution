
import { RGBA } from "./rgba"

export class Circle {
    x: number 
    y: number 
    radius: number
    outlineColor: RGBA
    fillColor: RGBA

    constructor(circle: {
        x: number, y: number, radius: number, outlineColor: RGBA, fillColor: RGBA
    }) {
        this.x = circle.x 
        this.y = circle.y 
        this.radius = circle.radius
        this.outlineColor = circle.outlineColor
        this.fillColor = circle.fillColor
    }
    drawCircle(canvasRendererContext: CanvasRenderingContext2D) {
        canvasRendererContext.beginPath()
        canvasRendererContext.strokeStyle = this.outlineColor.format()
        canvasRendererContext.fillStyle = this.fillColor.format()
        canvasRendererContext.arc(this.x, this.y, this.radius , 0, 2*Math.PI)
        canvasRendererContext.fill()
        canvasRendererContext.stroke()

    }
}