// C{0, 0} -> Canvas Coordinates (0, 0) 
// T{0, 0} -> Track coordinates (0, 0)

import { Rectangle } from "./shapes/rectangle"
import { LineDrawHandler, LineChunks } from "./drawHandler"
import { RGBA } from "./rgba"
import { Creature } from "./creature"
import { Circle } from "./shapes/circle"
import { XY } from "./xy"
import { Line } from "./shapes/line"

export class Track {
    background: Rectangle
    finishLine: Line
    private obstacles: LineChunks[] = []
    private lineSeparator = 0 
    private checkForDrawingOnTrack = true 
    private runRace = false 
    private topLeft: {x: number, y: number}
    creatures: Creature[] = []
    private margin = 10
    constructor(background: Rectangle) {
        this.background = background
        this.topLeft = {x: background.x, y: background.y}
        this.finishLine = new Line(new XY(0, 0), new XY(0, 0), new RGBA(0,0,0))


        if (this.background.width <= this.background.height) {
            this.finishLine.P1 = new XY(this.background.x, this.background.y + 0.9*this.background.height)
            this.finishLine.P2 = new XY(this.background.x + this.background.width, this.background.y + 0.9*this.background.height)
        } else {
            this.finishLine.P1 = new XY(this.background.x + 0.9*this.background.width, this.background.y )
            this.finishLine.P2 = new XY(this.background.x + 0.9*this.background.width, this.background.y + this.background.height)
        }
    }
    returnObstacles() { return this.obstacles } // for debugging purposes 

    renderBackground(canvasRendererContext: CanvasRenderingContext2D) {
        this.background.drawRectangle(canvasRendererContext)
        this.finishLine.drawLine(canvasRendererContext)
    }

    // adds data drawn onto the track into the obstacles array 
    onUpdate(lineDrawHandler: LineDrawHandler) {

        if (!lineDrawHandler.mouseWentDownAfterBeingUp && this.checkForDrawingOnTrack) return 

        let lineCopy = lineDrawHandler.copyLines()
        if (lineCopy.length === 0 || lineCopy.length - this.lineSeparator === 0) return 

        if (lineCopy[this.lineSeparator].x === -1) 
            lineCopy = lineCopy.slice(this.lineSeparator + 1, lineCopy.length)
        else 
            lineCopy = lineCopy.slice(this.lineSeparator, lineCopy.length)


        let lineChunkData = new LineChunks(lineCopy)

        this.obstacles.push(lineChunkData)
        this.lineSeparator = lineCopy.length
        
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

    returnTrackInfo(): {obstacles: LineChunks[], background: Rectangle ,finishLine: Line} {
        return {
            obstacles: this.obstacles, 
            background: this.background, 
            finishLine: this.finishLine, 
        }
    }
}