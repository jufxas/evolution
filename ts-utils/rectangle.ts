import { RGBA } from "./rgba"
export class Rectangle {
    x: number 
    y: number 
    width: number 
    height: number
    outlineColor: RGBA
    fillColor: RGBA

    constructor(rectangle: {
        x: number, y: number, width: number, height: number, outlineColor: RGBA, fillColor: RGBA
    }) {
        this.x = rectangle.x 
        this.y = rectangle.y 
        this.width = rectangle.width
        this.height = rectangle.height
        this.outlineColor = rectangle.outlineColor
        this.fillColor = rectangle.fillColor
    }
    drawRectangle(canvasRendererContext: CanvasRenderingContext2D) {
        canvasRendererContext.strokeStyle = this.outlineColor.format()
        canvasRendererContext.fillStyle = this.fillColor.format()
        canvasRendererContext.fillRect(this.x, this.y, this.width, this.height)

    }
}