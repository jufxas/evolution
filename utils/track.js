"use strict";
// C{0, 0} -> Canvas Coordinates (0, 0) 
// T{0, 0} -> Track coordinates (0, 0)
class Track {
    constructor(background) {
        this.obstacles = [];
        this.lineSeparator = 0;
        this.checkForDrawingOnTrack = true;
        this.runRace = false;
        this.creatures = [];
        this.margin = 10;
        this.background = background;
        this.topLeft = { x: background.x, y: background.y };
        this.finishLine = new Rectangle(new Rectangle({ x: 0, y: 0, width: 0, height: 0, outlineColor: new RGBA(0, 0, 0), fillColor: new RGBA(0, 0, 0) }));
        if (this.background.width <= this.background.height) {
            this.finishLine.x = this.background.x;
            this.finishLine.y = this.background.y + 0.9 * this.background.height;
            this.finishLine.width = this.background.width;
            this.finishLine.height = 1;
        }
        else {
            this.finishLine.x = this.background.x + 0.9 * this.background.width;
            this.finishLine.y = this.background.y;
            this.finishLine.height = this.background.height;
            this.finishLine.width = 1;
        }
    }
    renderBackground(canvasRendererContext) {
        this.background.drawRectangle(canvasRendererContext);
        this.finishLine.drawRectangle(canvasRendererContext);
    }
    // adds data drawn onto the track into the obstacles array 
    onUpdate(lineDrawHandler) {
        let lineCopy = lineDrawHandler.copyLines();
        if (lineCopy.length === 0 || lineCopy.length - this.lineSeparator === 0)
            return;
        if (lineCopy[this.lineSeparator].x === -1)
            lineCopy = lineCopy.slice(this.lineSeparator + 1, lineCopy.length);
        else
            lineCopy = lineCopy.slice(this.lineSeparator, lineCopy.length);
        let lineChunkData = new LineChunks(lineCopy);
        this.obstacles.push(lineChunkData);
        this.lineSeparator = lineCopy.length;
    }
    // A point on the track is transformed such that the top left is treated as (0,0) [ which is relative to itself ] instead of (topLeft.x, topLeft.y) [ which is relative to the canvas ]
    relatePointToTrack(coord) {
        return { x: coord.x - this.topLeft.x, y: coord.y - this.topLeft.y };
    }
    transformCanvasPointToTrackPoint(coord) {
        return { x: coord.x + this.topLeft.x, y: coord.y + this.topLeft.y };
    }
    addCreature(creature) {
        let T = this.transformCanvasPointToTrackPoint({ x: creature.image.x, y: creature.image.y });
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
        }));
    }
    renderCreatures(canvasRendererContext) {
        for (const creature of this.creatures) {
            creature.image.drawCircle(canvasRendererContext);
        }
    }
    returnTrackInfo() {
        return {
            obstacles: this.obstacles,
            background: this.background,
            finishLine: this.finishLine,
        };
    }
}

//jufSAVE
let bg = {
    Track: Track
}