"use strict";
// TODO: package utility functions and classes into separate files 
// ? Make sure the creatures do not phase through the walls 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// global components / boilerplate 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const timer = (ms) => new Promise(res => setTimeout(res, ms));
const FPS = 30;
let mouseX = 0;
let mouseY = 0;
let frameCount = 0;
let backgroundColor = new rgba.RGBA(100, 100, 255);
// draw handler 
const lineDrawHandler = new draw.LineDrawHandler();
let allowDrawing = true;
// track 
const track = new bg.Track(new rectangle.Rectangle({
    x: (canvas.width / 2) - 350,
    y: 50,
    width: 700,
    height: 700,
    outlineColor: new rgba.RGBA(0, 0, 0),
    fillColor: new rgba.RGBA(196, 196, 196)
}));
// event listeners 
evt.EventCargo.onmousemovePackages.shipPackage(new evt.EventPackage("updateMouse", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}));
evt.EventCargo.onmousedownPackages.shipPackage(new evt.EventPackage("callDrawFunction", () => {
    lineDrawHandler.onMouseDownFunction();
}));
evt.EventCargo.onmouseupPackages.shipPackage(new evt.EventPackage("mouseUp", () => {
    lineDrawHandler.onMouseUpFunction();
}));
let j = new xy.XY(0, 0);
evt.EventCargo.onkeyupPackages.shipPackage(new evt.EventPackage("keyUp", (e) => {
    if (e.key === "e") {
        allowDrawing = !allowDrawing;
        mq.$("h1#allowDrawing").html(`allowDrawing: ${allowDrawing}`);
    }
    if (e.key.includes("Arrow")) {
        let key = e.key.replace("Arrow", "").toLocaleLowerCase();
        track.creatures[0].move(key, 5);
        j = distance.DistanceCalculator.circleAndLine(track.creatures[0].image, v);
    }
}));
// utility functions 
function renderBackground(canvasRenderer, canvasRendererContext, background) {
    canvasRendererContext.fillStyle = background;
    canvasRendererContext.strokeStyle = background;
    canvasRendererContext.fillRect(0, 0, canvasRenderer.width, canvasRenderer.height);
}
track.addCreature(new creature.Creature({
    image: new circle.Circle({ x: 0, y: 0, radius: 10, outlineColor: new rgba.RGBA(0, 0, 0), fillColor: new rgba.RGBA(0, 0, 0) })
}));
let v = new line.Line(new xy.XY(178, 105), new xy.XY(310, 188));
function update() {
    renderBackground(canvas, ctx, backgroundColor.format());
    track.renderBackground(ctx);
    track.onUpdate(lineDrawHandler);
    track.renderCreatures(ctx);
    // draw handler
    if (allowDrawing) {
        lineDrawHandler.onUpdate(mouseX, mouseY);
    }
    // drawHandler.renderRectangles(ctx)
    lineDrawHandler.renderLines(ctx);
    v.drawLine(ctx);
    new circle.Circle({ x: j.x, y: j.y, radius: 1, outlineColor: new rgba.RGBA(0, 0, 0), fillColor: new rgba.RGBA(0, 0, 0) }).drawCircle(ctx);
}
function gameLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            update();
            frameCount++;
            yield timer(1000 / FPS);
        }
    });
}
gameLoop();
