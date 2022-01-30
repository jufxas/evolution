import { Rectangle, drawRectangle } from "./shapes/rectangle"
import { RGBA } from "./rgba";
import { XY } from "./xy"
import { drawLine, Line } from "./shapes/line";

export class DrawHandler {
    private rectangleHolder: Rectangle[]  = []
    private isMouseDown = false 
    private ignore = false 
    mouseWentDownAfterBeingUp: boolean | undefined = undefined; 
    outlineColor: RGBA
    fillColor: RGBA
    constructor(outlineColor?: RGBA, fillColor?: RGBA) {
        this.outlineColor = outlineColor || new RGBA(255,255,255)
        this.fillColor = fillColor || new RGBA(255,255,255)
    }
    onMouseDownFunction() {
        this.isMouseDown = true 
        this.mouseWentDownAfterBeingUp = false 
    }
    copyDrawData() {
        return this.rectangleHolder
    }
    onMouseUpFunction() {
        this.isMouseDown = false 
        if (this.mouseWentDownAfterBeingUp === false) this.mouseWentDownAfterBeingUp = true 
    }
    onUpdate(mouseX: number, mouseY: number) {
        if (this.mouseWentDownAfterBeingUp) {
            this.ignore = true 
            this.mouseWentDownAfterBeingUp = false 
        }

        if (this.isMouseDown) {
            
            this.rectangleHolder.push(new Rectangle({
                x: mouseX,
                y: mouseY,
                width: 3,
                height: 3,
                outlineColor: this.outlineColor,
                fillColor: this.fillColor,
            }));


            if (this.rectangleHolder.length >= 2 && this.ignore === false ) {
    
                // last 2 elements 
                let rectangle1 = this.rectangleHolder[this.rectangleHolder.length - 2]
                let rectangle2 = this.rectangleHolder[this.rectangleHolder.length - 1]
    
    
                let deltaX = rectangle2.x - rectangle1.x 
                let deltaY = rectangle2.y - rectangle1.y
                const numberOfSteps = Math.floor(Math.sqrt(deltaX**2 + deltaY**2) / 2)   
                deltaX /= numberOfSteps
                deltaY /= numberOfSteps
    
                for (let k = 0; k < numberOfSteps; k++) {
                    this.rectangleHolder.push(new Rectangle({
                        x: rectangle1.x + k*deltaX,
                        y: rectangle1.y + k*deltaY,
                        width: rectangle1.width,
                        height: rectangle1.height,
                        outlineColor: rectangle1.outlineColor,
                        fillColor: rectangle1.fillColor,
                    }))
                }
                
            }
            if (this.ignore === true) this.ignore = false  
        }
    }
    renderRectangles(canvasRendererContext: CanvasRenderingContext2D) {
        for (const r of this.rectangleHolder) {
            r.drawRectangle(canvasRendererContext); 
        }
    }
}

export class ChunkData {
    pixelData: Rectangle[] = []
    topLeft: XY | undefined
    width: number | undefined
    height: number | undefined
    constructor(pixelData: Rectangle[]) {
        if (pixelData.length === 0) return 
        this.pixelData = pixelData 

        let pixelXValues = []
        let pixelYValues = []
        let pixelWidth = pixelData[0].width 
        let pixelHeight = pixelData[0].height
        for (const pixel of pixelData) {
            pixelXValues.push(pixel.x)
            pixelYValues.push(pixel.y)
        }
        let minX = Math.min(...pixelXValues)
        let maxX = Math.max(...pixelXValues)
        let minY = Math.min(...pixelYValues)
        let maxY = Math.max(...pixelYValues)

        
        this.width = Math.abs(maxX - minX) + pixelWidth
        this.height = Math.abs(maxY - minY) + pixelHeight
        this.topLeft = new XY(minX, minY)

    }
}

export class CompressedDrawHandler {
    rectangleCoordHolder: XY[]  = []
    private isMouseDown = false 
    private ignore = false 
    mouseWentDownAfterBeingUp: boolean | undefined = undefined; 
    outlineColor: RGBA
    fillColor: RGBA
    width: number 
    height: number 
    constructor(width?: number, height?: number, outlineColor?: RGBA, fillColor?: RGBA) {
        this.width = width || 3
        this.height = height || 3
        this.outlineColor = outlineColor || new RGBA(255,255,255)
        this.fillColor = fillColor || new RGBA(255,255,255)
    }
    onMouseDownFunction() {
        this.isMouseDown = true 
        this.mouseWentDownAfterBeingUp = false 
    }
    copyDrawData() {
        return this.rectangleCoordHolder
    }
    onMouseUpFunction() {
        this.isMouseDown = false 
        if (this.mouseWentDownAfterBeingUp === false) this.mouseWentDownAfterBeingUp = true 
    }
    onUpdate(mouseX: number, mouseY: number) {
        if (this.mouseWentDownAfterBeingUp) {
            this.ignore = true 
            this.mouseWentDownAfterBeingUp = false 
        }

        if (this.isMouseDown) {
            
            this.rectangleCoordHolder.push(new XY(mouseX, mouseY));


            if (this.rectangleCoordHolder.length >= 2 && this.ignore === false ) {
    
                // last 2 elements 
                let rectangle1 = this.rectangleCoordHolder[this.rectangleCoordHolder.length - 2]
                let rectangle2 = this.rectangleCoordHolder[this.rectangleCoordHolder.length - 1]
    
    
                let deltaX = rectangle2.x - rectangle1.x 
                let deltaY = rectangle2.y - rectangle1.y
                const numberOfSteps = Math.floor(Math.sqrt(deltaX**2 + deltaY**2) / 2)   
                deltaX /= numberOfSteps
                deltaY /= numberOfSteps
    
                for (let k = 0; k < numberOfSteps; k++) {
                    this.rectangleCoordHolder.push(
                        new XY(rectangle1.x + k*deltaX, rectangle1.y + k*deltaY)
                    )
                    
                }
                
            }
            if (this.ignore === true) this.ignore = false  
        }
    }
    renderRectangles(canvasRendererContext: CanvasRenderingContext2D) {
        for (const r of this.rectangleCoordHolder) {
            canvasRendererContext.strokeStyle = this.outlineColor.format()
            canvasRendererContext.fillStyle = this.fillColor.format()
            canvasRendererContext.fillRect(r.x, r.y, this.width, this.height)
        }
    }
}

export class ChunkCompressedData {
    coordData: XY[] = []
    topLeft: XY | undefined
    width: number | undefined
    height: number | undefined
    constructor(coordData: XY[], pixelWidth?: number, pixelHeight?: number) {
        if (coordData.length === 0) return 
        this.coordData = coordData 

        let coordXValues = []
        let coordYValues = []

        for (const coord of coordData) {
            coordXValues.push(coord.x)
            coordYValues.push(coord.y)
        }
        let minX = Math.min(...coordXValues)
        let maxX = Math.max(...coordXValues)
        let minY = Math.min(...coordYValues)
        let maxY = Math.max(...coordYValues)

        
        this.width = Math.abs(maxX - minX) + (pixelWidth || 3)
        this.height = Math.abs(maxY - minY) + (pixelHeight || 3)
        this.topLeft = new XY(minX, minY)
    }
}

export class LineDrawHandler {
    pointHolder: XY[] = []
    mouseWentDownAfterBeingUp: boolean | undefined = undefined
    color: RGBA
    isMouseDown = false 
    ignore = false 

    constructor(color?: RGBA) {
        this.color = color || new RGBA(255,255,255)
    }

    copyLines() {
        return this.pointHolder
    }
    
    onUpdate(mouseX: number, mouseY: number) {

        if (this.mouseWentDownAfterBeingUp) {
            this.mouseWentDownAfterBeingUp = false
            this.pointHolder.push(new XY(-1,-1));  // need some null points or identifiers so that when the pen is up then goes down, it doesn't link them up 
        }

        if (this.isMouseDown) {
            this.pointHolder.push(new XY(mouseX, mouseY));
        }
    }

    renderLines(canvasRendererContext: CanvasRenderingContext2D) {
        for (let i = 0; i < this.pointHolder.length; i++) {
            if (i !== this.pointHolder.length - 1 && this.pointHolder[i].x !== -1 && this.pointHolder[i+1].x !== -1) {
                drawLine(canvasRendererContext, this.pointHolder[i], this.pointHolder[i+1], this.color)
            } 
        }
    }

    onMouseDownFunction() {
        this.isMouseDown = true 
        this.mouseWentDownAfterBeingUp = false 

    }
    onMouseUpFunction() {
        this.isMouseDown = false 
        if (this.mouseWentDownAfterBeingUp === false) this.mouseWentDownAfterBeingUp = true 
    }

}

export class LineChunks {
    lineCoords: XY[] = []
    topLeft: XY | undefined
    width: number | undefined
    height: number | undefined   
    constructor(lineCoords: XY[]) {

        if (lineCoords.length === 0) return 
        this.lineCoords = lineCoords 

        let coordXValues = []
        let coordYValues = []

        for (const coord of lineCoords) {
            coordXValues.push(coord.x)
            coordYValues.push(coord.y)
        }
        let minX = Math.min(...coordXValues)
        let maxX = Math.max(...coordXValues)
        let minY = Math.min(...coordYValues)
        let maxY = Math.max(...coordYValues)

        
        this.width = Math.abs(maxX - minX) 
        this.height = Math.abs(maxY - minY) 
        this.topLeft = new XY(minX, minY)
    }
}