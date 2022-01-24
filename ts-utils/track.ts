// C{0, 0} -> Canvas Coordinates (0, 0) 
// T{0, 0} -> Track coordinates (0, 0)

import { Rectangle } from "./rectangle"
import { ChunkData, ChunkCompressedData, DrawHandler, CompressedDrawHandler } from "./drawHandler"
import { RGBA } from "./rgba"
import { Creature } from "./creature"
import { Circle } from "./circle"
export class Track {
    background: Rectangle
    private finishLine: Rectangle
    private obstacles: any = [] //  it's really  ChunkData[] | ChunkCompressedData[]
    private checkForDrawingOnTrack = true 
    private runRace = false 
    private drawingSeparator = 0 
    private topLeft: {x: number, y: number}
    creatures: Creature[] = []
    private margin = 10
    constructor(background: Rectangle) {
        this.background = background
        this.topLeft = {x: background.x, y: background.y}
        this.finishLine = new Rectangle(new Rectangle({x:0,y:0,width:0,height:0,outlineColor:new RGBA(0,0,0),fillColor:new RGBA(0,0,0)}))


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
        this.finishLine.drawRectangle(canvasRendererContext)
    }

    // adds data drawn onto the track into the obstacles array 
    onUpdate(drawHandler: DrawHandler | CompressedDrawHandler) {

        if (!drawHandler.mouseWentDownAfterBeingUp && this.checkForDrawingOnTrack) return 

        if (drawHandler instanceof DrawHandler) {

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
            
        } else if (drawHandler instanceof CompressedDrawHandler) {

                let copy = drawHandler.copyDrawData().filter(pixel => 
                    (this.background.x <= pixel.x && pixel.x <= this.background.x + this.background.width) && 
                    (this.background.y <= pixel.y && pixel.y <= this.background.y + this.background.height)
                )
                if (copy.length === 0 || copy.length - this.drawingSeparator === 0) return 

                

                let chunkData = new ChunkCompressedData(copy.slice(
                    this.drawingSeparator, 
                    copy.length 
                ))

                this.obstacles.push(chunkData)
                this.drawingSeparator = copy.length
            
        }
    }

    // A point on the track is transformed such that the top left is treated as (0,0) [ which is relative to itself ] instead of (topLeft.x, topLeft.y) [ which is relative to the canvas ]
    relatePointToTrack(coord: {x: number, y: number}): {x: number, y: number} { 
        return {x: coord.x - this.topLeft.x, y: coord.y - this.topLeft.y}
    }

    transformCanvasPointToTrackPoint(coord: {x: number, y: number}): {x: number, y: number} {
        return {x: coord.x + this.topLeft.x, y: coord.y + this.topLeft.y}
    }

    addCreature(creature: Creature) {
        let T = this.transformCanvasPointToTrackPoint({x: creature.image.x, y: creature.image.y})
        this.creatures.push(new Creature({
            intelligence: creature.intelligence, 
            maxSpeed: creature.maxSpeed, 
            sight: creature.sight, 
            image: new Circle({
                x: T.x + this.margin + creature.image.radius, y: T.y + this.margin + creature.image.radius, 

                radius: creature.image.radius, 
                fillColor: creature.image.fillColor, 
                outlineColor: creature.image.outlineColor
            }), 
        }))
    }

    renderCreatures(canvasRendererContext: CanvasRenderingContext2D) {
        for (const creature of this.creatures) {
            creature.image.drawCircle(canvasRendererContext)
        }
    }

    returnTrackInfo() {
        return {
            obstacles: this.obstacles, 
            background: this.background, 
            finishLine: this.finishLine, 
        }
    }
}