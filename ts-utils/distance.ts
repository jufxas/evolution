import { Rectangle } from "./shapes/rectangle"
import { Circle } from "./shapes/circle"
import { XY } from "./xy"

export const DistanceCalculator = {

    // void keyword is temporary 

    // returns the distance the outside of a circle is from the left, right, up, and down side of a wall
    circleInsideBoxAndBoxEdges: function(circle: Circle, rectangle: Rectangle, maxDistance?: number): 
{leftSide?: number, rightSide?: number, ceiling?: number, floor?: number } 

    {
        let distances: any = {}
        let leftSide = Math.abs(rectangle.x - (circle.x - circle.radius))
        let rightSide = Math.abs(rectangle.x + rectangle.width - (circle.x + circle.radius))
        let ceiling = Math.abs(rectangle.y - (circle.y - circle.radius))
        let floor = Math.abs(rectangle.y + rectangle.height - (circle.y + circle.radius))

        if (maxDistance) {
            if (leftSide <= maxDistance) distances["leftSide"] = leftSide
            if (rightSide <= maxDistance) distances["rightSide"] = rightSide
            if (ceiling <= maxDistance) distances["ceiling"] = ceiling
            if (floor <= maxDistance) distances["floor"] = floor
            return distances
        }

        return {
            leftSide: leftSide, 
            rightSide: rightSide, 
            ceiling: ceiling, 
            floor: floor, 
        }
    },
    circleAndArrayOfBoxCoords: function(circle: Circle, boxCoords: XY[], width: number, height: number, maxDistance?: number) {
        let b = {}
        for (let i = 0; i < boxCoords.length; i++) {

        }
    
    },
    

}