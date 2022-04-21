"use strict";
// a family of functions that handles certain situations to check for collisions. if a collision function is called and returns true, there was a collision and it's up to you to handle what happens afterward.  
const CollisionHandler = {
    circleAndEdgesOfRectangle: function (circle, rectangle) {
        return (circle.x - circle.radius <= rectangle.x ||
            circle.x + circle.radius >= rectangle.x + rectangle.width ||
            circle.y - circle.radius <= rectangle.y ||
            circle.y + circle.radius >= rectangle.y + rectangle.height);
    },
    // does not check for if circle is inside rectangle or vice versa 
    circleAndRectangle: function (circle, rectangle) {
        return (
        // left edge 
        ((circle.x + circle.radius <= rectangle.x) && (circle.x + circle.radius >= rectangle.x)) ||
            // right edge
            ((circle.x - circle.radius >= rectangle.x + rectangle.width) && (circle.x - circle.radius <= rectangle.x + rectangle.width)) ||
            // top edge 
            ((circle.y + circle.radius <= rectangle.y) && (circle.y + circle.radius >= rectangle.y)) ||
            // bottom edge 
            ((circle.y - circle.radius >= rectangle.y + rectangle.height) && (circle.y - circle.radius <= rectangle.y + rectangle.height)));
    },
    circleAndLine: function (circle, line) {
        return DistanceCalculator.circleAndLine(circle, line) <= 0;
    },
    circleAndArrayOfLineCoords: function (circle, lineCoords) {
        for (let i = 0; i < lineCoords.length; i++) {
            if (i !== lineCoords.length - 1) {
                if (this.circleAndLine(circle, new Line(lineCoords[i], lineCoords[i + 1])))
                    return true;
            }
        }
        return false;
    },
};

//jufSAVE
var clh = {
    CollisionHandler: CollisionHandler
}