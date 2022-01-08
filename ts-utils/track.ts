import { Rectangle } from "./rectangle"
import { ChunkData, DrawHandler } from "./drawHandler"
import { RGBA } from "./rgba"
export class Track {
    background: Rectangle
    finishLine: Rectangle
    obstacles: ChunkData[] = [] 
    checkForDrawingOnTrack = true 
    runRace = false 
    drawingSeparator = 0 
    constructor(background: Rectangle) {
        this.background = background
        this.finishLine = new Rectangle(new Rectangle({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            outlineColor: new RGBA(0,0,0),
            fillColor: new RGBA(0,0,0),
        }))


        if (this.background.width <= this.background.height) {
            this.finishLine.x = this.background.x
            this.finishLine.y = this.background.y + 0.9*this.background.height
            this.finishLine.width = this.background.width
            this.finishLine.height = 1
        } else {
            this.finishLine.x = this.background.x + 0.9*this.background.width 
            this.finishLine.y = this.background.y 
            this.finishLine.height = this.background.height
            this.finishLine.width = 1
        }
    }
    renderBackground(canvasRendererContext: CanvasRenderingContext2D) {
        this.background.drawRectangle(canvasRendererContext)
    }
    renderFinishLine(canvasRendererContext: CanvasRenderingContext2D) {
        this.finishLine.drawRectangle(canvasRendererContext)
    }
    onUpdate(drawHandler: DrawHandler) {
        if (!drawHandler.mouseWentDownAfterBeingUp) return 
        if (this.checkForDrawingOnTrack) {
            let copy = drawHandler.copyDrawData().filter(pixel => 
                (this.background.x <= pixel.x && pixel.x <= this.background.x + this.background.width) && 
                (this.background.y <= pixel.y && pixel.y <= this.background.y + this.background.height)
            )
            if (copy.length === 0 || copy.length - this.drawingSeparator === 0) return 
            let chunkData = new ChunkData(copy.slice(
                this.drawingSeparator, 
                copy.length 
            ))

            this.obstacles.push(chunkData)
            this.drawingSeparator = copy.length
        }
    }
}