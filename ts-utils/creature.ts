import { Circle } from "./shapes/circle"
import { RGBA } from "./rgba"
import { CollisionHandler } from "./collisionHandler"
import { DistanceCalculator } from "./distance"
import { LineChunks } from "./drawHandler"
import { Rectangle } from "./shapes/rectangle"

export class Creature {
    intelligence: number                       // 1 to 100
    maxSpeed: number                           // 1 to 100
    sight: number                              // Minimum 1 
    image: Circle  // note that the center of the circle is just its xy coords 
    constructor(data: {intelligence?: number, maxSpeed?: number, sight?: number, image?: Circle}) {
        this.intelligence = data.intelligence || 1 
        this.maxSpeed = data.maxSpeed || 1 
        this.sight = data.sight || 1
        this.image = data.image || new Circle({x:50,y:50,radius:5,outlineColor: new RGBA(0,0,0), fillColor: new RGBA(0,0,0)})
    }
    move(direction: "up" | "down" | "left" | "right", magnitude: number ) {
        switch (direction) {
            case "up":
                this.image.y -= magnitude
                break; 
            case "down": 
                this.image.y += magnitude
                break; 
            case "left":
                this.image.x -= magnitude
                break; 
            case "right":
                this.image.x += magnitude
                break; 
        }
    }
    search(trackInfo: {obstacles: LineChunks[], background: Rectangle ,finishLine: Rectangle}) {

        // wall searching 
        let wallDistances = DistanceCalculator.circleInsideBoxAndBoxEdges(this.image, trackInfo.background, this.sight)
        console.log(wallDistances)

        // obstacle searching 
        let v = DistanceCalculator.circleAndArrayOfBoxCoords(this.image, trackInfo.obstacles[0].lineCoords, trackInfo.obstacles[0].width!, trackInfo.obstacles[0].height!, this.sight)

        console.log(v)

    }
    think() {
        // decides what to do: move, search, memorize anything {omg it should have a memory of sorts}
    }
}