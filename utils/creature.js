"use strict";
class Creature {
    constructor(data) {
        this.intelligence = data.intelligence || 1;
        this.maxSpeed = data.maxSpeed || 1;
        this.sight = data.sight || 1;
        this.image = data.image || new Circle({ x: 50, y: 50, radius: 5, outlineColor: new RGBA(0, 0, 0), fillColor: new RGBA(0, 0, 0) });
    }
    move(direction, magnitude) {
        switch (direction) {
            case "up":
                this.image.y -= magnitude;
                break;
            case "down":
                this.image.y += magnitude;
                break;
            case "left":
                this.image.x -= magnitude;
                break;
            case "right":
                this.image.x += magnitude;
                break;
        }
    }
    search(trackInfo) {
        let sightCircle = new Circle({
            x: this.image.x,
            y: this.image.y,
            radius: this.image.radius + this.sight,
            outlineColor: new RGBA(0, 0, 0, 0),
            fillColor: new RGBA(0, 0, 0, 0)
        });
        // background collision check 
        console.log(CollisionHandler.circleAndEdgesOfRectangle(sightCircle, trackInfo.background));
    }
    think() {
        // decides what to do: move, search, memorize anything {omg it should have a memory of sorts}
    }
}

//jufSAVE 
var creature = {
    Creature: Creature, 
}