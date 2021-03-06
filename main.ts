// TODO: package utility functions and classes into separate files 
// ? Make sure the creatures do not phase through the walls 
// * Figure out how the creatures decide what actions to do 
// * Create probability table of what actions a creature can do 
// * Make searching something that takes time like the creature cannot do anything else for X seconds if they decide to think 
// * Horizontal line and ball distance checker need to be further fine tuned to handle all cases 


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

// if ever interested in canvas pixel manipulation: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas 


declare const mq:           typeof import("./ts-utils/MyQuery")
declare const draw:         typeof import("./ts-utils/drawHandler")
declare const rgba:         typeof import("./ts-utils/rgba")
declare const rectangle:    typeof import("./ts-utils/shapes/rectangle")
declare const circle:       typeof import("./ts-utils/shapes/circle")
declare const evt:          typeof import("./ts-utils/eventHandler")
declare const bg:           typeof import("./ts-utils/track")
declare const creature:     typeof import("./ts-utils/creature")
declare const clh:          typeof import("./ts-utils/collisionHandler")
declare const dst:          typeof import("./ts-utils/distance")
declare const line:         typeof import("./ts-utils/shapes/line")
declare const xy:           typeof import("./ts-utils/xy")
declare const distance:     typeof import("./ts-utils/distance")


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
const lineDrawHandler = new draw.LineDrawHandler()
let allowDrawing = true 

// track 
const track = new bg.Track(new rectangle.Rectangle({
    x: (canvas.width / 2) - 350,
    y: 50, 
    width: 700, 
    height: 700, 
    outlineColor: new rgba.RGBA(0,0,0), 
    fillColor: new rgba.RGBA(196,196,196)
}))




// event listeners 
evt.EventCargo.onmousemovePackages.shipPackage(new evt.EventPackage("updateMouse", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY 
}))
evt.EventCargo.onmousedownPackages.shipPackage(new evt.EventPackage("callDrawFunction", () => {
    lineDrawHandler.onMouseDownFunction()
}))

evt.EventCargo.onmouseupPackages.shipPackage(new evt.EventPackage("mouseUp", () => {
    lineDrawHandler.onMouseUpFunction()
    
}))


evt.EventCargo.onkeydownPackages.shipPackage(new evt.EventPackage("keyDown", (e) => {
    if (e.key === "e") {
        allowDrawing = !allowDrawing
        mq.$("h1#allowDrawing").html(`allowDrawing: ${allowDrawing}`)
    } 

    if (e.key === "w") {
        track.creatures[0].move("up", 5)
        track.creatures[0].search( { obstacles: track.returnObstacles(), background: track.background, finishLine: track.finishLine} )
    }
    if (e.key === "a") {
        track.creatures[0].move("left", 5)
        track.creatures[0].search( { obstacles: track.returnObstacles(), background: track.background, finishLine: track.finishLine} )
        console.log(distance.DistanceCalculator.circleAndLine(track.creatures[0].image, v))

    }
    if (e.key === "s") {
        track.creatures[0].move("down", 5)
        track.creatures[0].search( { obstacles: track.returnObstacles(), background: track.background, finishLine: track.finishLine} )
        
    }
    if (e.key === "d") {
        track.creatures[0].move("right", 5)
        track.creatures[0].search( { obstacles: track.returnObstacles(), background: track.background, finishLine: track.finishLine} )
        console.log(distance.DistanceCalculator.circleAndLine(track.creatures[0].image, v))
        
    }

}))

// utility functions 
function renderBackground(canvasRenderer: HTMLCanvasElement, canvasRendererContext: CanvasRenderingContext2D,  background: string) {
    canvasRendererContext.fillStyle = background
    canvasRendererContext.strokeStyle = background 
    canvasRendererContext.fillRect(0, 0, canvasRenderer.width, canvasRenderer.height)
}


track.addCreature(new creature.Creature({
    image: new circle.Circle({x: 0, y: 0, radius: 10, outlineColor: new rgba.RGBA(0,0,0), fillColor: new rgba.RGBA(0,0,0)}), 
    sight: 1000, 
}))

let v = new line.Line(new xy.XY(165, 25), new xy.XY(169, 25))

function update() {
    renderBackground(canvas, ctx, backgroundColor.format())
    track.renderBackground(ctx)
    track.onUpdate(lineDrawHandler)
    track.renderCreatures(ctx)


    // draw handler
    if (allowDrawing) {
        lineDrawHandler.onUpdate(mouseX, mouseY)
    }
    // drawHandler.renderRectangles(ctx)
    lineDrawHandler.renderLines(ctx)

    v.drawLine(ctx)

    
}



async function gameLoop() {
    while(true) {
        update()
        frameCount++
        await timer(1000/FPS)
    }
}
gameLoop()