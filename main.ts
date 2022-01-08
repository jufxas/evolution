// TODO: package utility functions and classes into separate files 
// ? Make sure the creatures do not phase through the walls 

// compiling to higher versions of js without errors: 
// tsc --noEmitOnError --strictNullChecks  --skipLibCheck true  --target es6  main.ts
// compile on save: cmd + shift + b -> select tsc: watch - tsconfig.json

// you can automatically clean out the exports statements in the compiled javascript stuff by entering the compiled js into https://jufxas.github.io/file-fixer/   
// make sure the var draw = { ... } still remains  

// making gitignore work : https://stackoverflow.com/questions/25436312/gitignore-not-working
/*
The files/folder in your version control will not just delete themselves just because you added them to the .gitignore. They are already in the repository and you have to remove them. You can just do that with this:
Remember to commit everything you've changed before you do this!
git rm -rf --cached .
git add .
*/ 


declare const mq: typeof import("./ts-utils/MyQuery")
declare const draw: typeof import("./ts-utils/drawHandler")
declare const rgba: typeof import("./ts-utils/rgba")
declare const rectangle: typeof import("./ts-utils/rectangle")
declare const evt: typeof import("./ts-utils/eventHandler")
declare const bg: typeof import ("./ts-utils/track")


// global components / boilerplate 
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
const timer = (ms: number) => new Promise(res => setTimeout(res, ms))
const FPS = 30
let mouseX = 0
let mouseY = 0
let frameCount = 0
let backgroundColor =  new rgba.RGBA(100, 100, 255) 

// draw handler 
const drawHandler = new draw.DrawHandler()  
let allowDrawing = true 

// track 
const track = new bg.Track(new rectangle.Rectangle({
    x: (canvas.width / 2) - 350,
    y: 50, 
    width: 700, 
    height: 800, 
    outlineColor: new rgba.RGBA(0,0,0), 
    fillColor: new rgba.RGBA(196,196,196)
}))

// because typescript's weirdness, i cant directly put ChunkData or Rectangle 
// ? Note sure if these will be needed 
let filler = new draw.ChunkData([])
type ChunkData = typeof filler 
let filler2 = new rectangle.Rectangle({x: 0,y: 0, width: 0, height: 0, outlineColor: new rgba.RGBA(0,0,0), fillColor: new rgba.RGBA(0,0,0)})



type Rectangle = typeof filler2 
type DrawHandler = typeof drawHandler


// event listeners 
evt.EventCargo.onmousemovePackages.shipPackage(new evt.EventPackage("updateMouse", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
}))
evt.EventCargo.onmousedownPackages.shipPackage(new evt.EventPackage("callDrawFunction", () => {
    drawHandler.onMouseDownFunction()
}))
evt.EventCargo.onmouseupPackages.shipPackage(new evt.EventPackage("mouseUp", () => {
    drawHandler.onMouseUpFunction() 

}))


evt.EventCargo.onkeyupPackages.shipPackage(new evt.EventPackage("keyUp", (e) => {
    if (e.key === "e") {
        allowDrawing = !allowDrawing
        mq.$("h1#allowDrawing").html(`allowDrawing: ${allowDrawing}`)
    }
}))




// utility functions 
function renderBackground(canvasRenderer: HTMLCanvasElement, canvasRendererContext: CanvasRenderingContext2D,  background: string) {
    canvasRendererContext.fillStyle = background
    canvasRendererContext.strokeStyle = background 
    canvasRendererContext.fillRect(0, 0, canvasRenderer.width, canvasRenderer.height)
}

class Obstacle {}



class Creature {}
const Collision = {}  // handles the collisions 

function update() {
    renderBackground(canvas, ctx, backgroundColor.format())
    track.renderBackground(ctx)
    track.renderFinishLine(ctx)
    track.onUpdate(drawHandler)


    // draw handler
    if (allowDrawing) drawHandler.onUpdate(mouseX, mouseY)
    drawHandler.renderRectangles(ctx)
    
    
}

async function gameLoop() {
    while(true) {
        update()
        frameCount++
        await timer(1000/FPS)
    }
}
gameLoop()