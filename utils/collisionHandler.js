"use strict";
// a family of functions that handles certain situations to check for collisions. if a collision function is called and returns true, there was a collision and it's up to you to handle what happens afterward.  
const CollisionHandler = {
    circleAndEdgesOfRectangle: function (circle, rectangle) {
        return (circle.x - circle.radius <= rectangle.x ||
            circle.x + circle.radius >= rectangle.x + rectangle.width ||
            circle.y - circle.radius <= rectangle.y ||
            circle.y + circle.radius >= rectangle.y + rectangle.height);
    },
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
    }
};

//jufSAVE
var clh = {
    CollisionHandler: CollisionHandler
}