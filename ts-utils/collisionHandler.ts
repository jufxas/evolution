import { Rectangle } from "./shapes/rectangle"
import { Circle } from "./shapes/circle"
import { XY } from "./xy"
import { Line } from "./shapes/line"
import { DistanceCalculator } from "./distance"
import { VectorOperations } from "./shapes/line"

// a family of functions that handles certain situations to check for collisions. if a collision function is called and returns true, there was a collision and it's up to you to handle what happens afterward.  

export const CollisionHandler = {
    circleAndEdgesOfRectangle: function(circle: Circle, rectangle: Rectangle) { // circle is inside a rectangle
        return (
            circle.x - circle.radius <= rectangle.x || 
            circle.x + circle.radius >= rectangle.x + rectangle.width || 
            circle.y - circle.radius <= rectangle.y || 
            circle.y + circle.radius >= rectangle.y + rectangle.height 
        )
    },

    // does not check for if circle is inside rectangle or vice versa 
    circleAndRectangle: function(circle: Circle, rectangle: Rectangle) {
        return (
            // left edge 
            ( (circle.x + circle.radius <= rectangle.x) && (circle.x + circle.radius >= rectangle.x)) || 

            // right edge
            ( (circle.x - circle.radius >= rectangle.x + rectangle.width) && (circle.x - circle.radius <= rectangle.x + rectangle.width)) || 

            // top edge 
            ( (circle.y + circle.radius <= rectangle.y) && (circle.y + circle.radius >= rectangle.y)) || 

            // bottom edge 
            ( (circle.y - circle.radius >= rectangle.y + rectangle.height) && (circle.y - circle.radius <= rectangle.y + rectangle.height) )

        )
    },
    circleAndLine: function(circle: Circle, line: Line) {
        return DistanceCalculator.circleAndLine(circle, line)! <= 0
    },

    circleAndArrayOfLineCoords: function(circle: Circle, lineCoords: XY[]) {
        for (let i = 0; i < lineCoords.length; i++) {
            if (i !== lineCoords.length - 1) {
                if (this.circleAndLine(circle, new Line(lineCoords[i], lineCoords[i+1]))) return true 
            }
        }
        return false 

    },
}