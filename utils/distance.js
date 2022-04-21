"use strict";
const DistanceCalculator = {
    // returns the distance the outside of a circle is from the left, right, up, and down side of a wall
    circleInsideBoxAndBoxEdges: function (circle, rectangle, maxDistance) {
        let distances = {};
        let leftSide = Math.abs(rectangle.x - (circle.x - circle.radius));
        let rightSide = Math.abs(rectangle.x + rectangle.width - (circle.x + circle.radius));
        let topSide = Math.abs(rectangle.y - (circle.y - circle.radius));
        let bottomSide = Math.abs(rectangle.y + rectangle.height - (circle.y + circle.radius));
        if (maxDistance) {
            if (leftSide <= maxDistance)
                distances["leftSide"] = leftSide;
            if (rightSide <= maxDistance)
                distances["rightSide"] = rightSide;
            if (topSide <= maxDistance)
                distances["topSide"] = topSide;
            if (bottomSide <= maxDistance)
                distances["bottomSide"] = bottomSide;
            return distances;
        }
        return {
            leftSide: leftSide,
            rightSide: rightSide,
            topSide: topSide,
            bottomSide: bottomSide,
        };
    },
    circleAndArrayOfLineCoords: function (circle, lineCoords, maxDistance) {
        let nthLineDistance = {};
        for (let i = 0; i < lineCoords.length; i++) {
            if (i !== lineCoords.length - 1) {
                nthLineDistance[i] = this.circleAndLine(circle, new Line(lineCoords[i], lineCoords[i + 1]), maxDistance);
                console.log({
                    P1: lineCoords[i],
                    P2: lineCoords[i + 1],
                    distance: this.circleAndLine(circle, new Line(lineCoords[i], lineCoords[i + 1]), maxDistance)
                });
            }
        }
        return nthLineDistance;
    },
    circleAndLine: function (circle, line, maxDistance) {
        // if {return} is <= 0 , collision has happened 
        let A = line.P1;
        let B = line.P2;
        let distance;
        if (A.x > B.x) {
            A = line.P2;
            B = line.P1;
        } // just so A is always to the left and B is to the right 
        // vertical line 
        else if (A.x === B.x) {
            // A is on the top 
            if (A.y > B.y) {
                A = line.P2;
                B = line.P1;
            }
            if (circle.y + circle.radius < A.y) { // circle is above line segment
                distance = Math.sqrt(Math.pow((circle.y + circle.radius - A.y), 2) + Math.pow((circle.x - A.x), 2));
            }
            else if (circle.y - circle.radius > B.y) { // circle is below line segment
                distance = Math.sqrt(Math.pow((circle.y - circle.radius - A.y), 2) + Math.pow((circle.x - A.x), 2));
            }
            else if (circle.x + circle.radius < A.x) { // circle is left of the line 
                distance = -circle.x - circle.radius + A.x;
            }
            else if (circle.x > A.x) { // circle is right of line 
                distance = circle.x - circle.radius - A.x;
            }
            else { // circle is inside line i think
                distance = -1;
            }
            return maxDistance ? (distance <= maxDistance ? distance : undefined) : distance;
        }
        // horizontal line 
        else if (A.y === B.y) {
            if (A.x <= circle.x + circle.radius && circle.x + circle.radius <= B.x) {
                if (circle.y + circle.radius <= A.y) {
                    distance = A.y - circle.y - circle.radius;
                }
                else if (circle.y - circle.radius >= A.y) {
                    distance = circle.y - circle.radius - A.y;
                }
                else { // circle is inside line i think
                    distance = -1;
                }
            }
            else {
                if (circle.x + circle.radius <= A.x) { // circle is left of line 
                    distance = Math.sqrt(Math.pow((circle.x + circle.radius - A.x), 2) + Math.pow((circle.y - A.y), 2));
                }
                else if (circle.x - circle.radius >= B.x) { // circle is right of line 
                    distance = Math.sqrt(Math.pow((circle.x - circle.radius - B.x), 2) + Math.pow((circle.y - B.y), 2));
                }
                else if (circle.radius * 2 >= B.x - A.x) { // or circle.x - circle.radius <= A.x && circle.x + circle.radius >= B.x  
                    if (circle.y - circle.radius > A.y) { // circle below line
                        distance = Math.sqrt(Math.pow((circle.x - (A.x + B.x) / 2), 2) + Math.pow((circle.y - circle.radius - A.y), 2));
                    }
                    else if (circle.y + circle.radius < A.y) { // circle above line 
                        distance = Math.sqrt(Math.pow((circle.x - (A.x + B.x) / 2), 2) + Math.pow((circle.y + circle.radius - A.y), 2));
                    }
                    else {
                        distance = -1;
                    }
                }
                else {
                    distance = -1;
                }
            }
            return maxDistance ? (distance <= maxDistance ? distance : undefined) : distance;
        }
        let C = new XY(circle.x, circle.y);
        const M = (B.y - A.y) / (B.x - A.x);
        const V = (B.x - A.x) / (A.y - B.y);
        const K = (A.y - B.y) / (B.x - A.x);
        let Dx = (-M * B.x + B.y - C.y + V * C.x) / (V - M);
        let Dy = M * Dx + B.y + K * B.x;
        let D = new XY(Dx, Dy);
        if (A.x <= D.x && D.x <= B.x) {
            distance = Math.sqrt(Math.pow((circle.x - D.x), 2) + Math.pow((circle.y - D.y), 2)) - circle.radius;
        }
        else {
            if (circle.x >= B.x) { // it's closer to B 
                distance = Math.sqrt(Math.pow((circle.x - B.x), 2) + Math.pow((circle.y - B.y), 2)) - circle.radius;
            }
            else { // it's closer to A 
                distance = Math.sqrt(Math.pow((circle.x - A.x), 2) + Math.pow((circle.y - A.y), 2)) - circle.radius;
            }
        }
        return maxDistance ? (distance <= maxDistance ? distance : undefined) : distance;
    },
};

//jufSAVE
var distance = {
    DistanceCalculator: DistanceCalculator   
}