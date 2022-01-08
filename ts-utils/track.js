"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const rectangle_1 = require("./rectangle");
const drawHandler_1 = require("./drawHandler");
const rgba_1 = require("./rgba");
class Track {
    constructor(background) {
        this.obstacles = [];
        this.checkForDrawingOnTrack = true;
        this.runRace = false;
        this.drawingSeparator = 0;
        this.background = background;
        this.finishLine = new rectangle_1.Rectangle(new rectangle_1.Rectangle({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            outlineColor: new rgba_1.RGBA(0, 0, 0),
            fillColor: new rgba_1.RGBA(0, 0, 0),
        }));
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
    }
    renderFinishLine(canvasRendererContext) {
        this.finishLine.drawRectangle(canvasRendererContext);
    }
    onUpdate(drawHandler) {
        if (!drawHandler.mouseWentDownAfterBeingUp)
            return;
        if (this.checkForDrawingOnTrack) {
            let copy = drawHandler.copyDrawData().filter(pixel => (this.background.x <= pixel.x && pixel.x <= this.background.x + this.background.width) &&
                (this.background.y <= pixel.y && pixel.y <= this.background.y + this.background.height));
            if (copy.length === 0 || copy.length - this.drawingSeparator === 0)
                return;
            let chunkData = new drawHandler_1.ChunkData(copy.slice(this.drawingSeparator, copy.length));
            this.obstacles.push(chunkData);
            this.drawingSeparator = copy.length;
        }
    }
}
exports.Track = Track;
