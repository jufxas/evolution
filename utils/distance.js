"use strict";
const DistanceCalculator = {
    // returns the distance the outside of a circle is from the left, right, up, and down side of a wall
    circleInsideBoxAndBoxEdges: function (circle, rectangle, maxDistance) {
        let distances = {};
        let leftSide = Math.abs(rectangle.x - (circle.x - circle.radius));
        let rightSide = Math.abs(rectangle.x + rectangle.width - (circle.x + circle.radius));
        let ceiling = Math.abs(rectangle.y - (circle.y - circle.radius));
        let floor = Math.abs(rectangle.y + rectangle.height - (circle.y + circle.radius));
        if (maxDistance) {
            if (leftSide <= maxDistance)
                distances["leftSide"] = leftSide;
            if (rightSide <= maxDistance)
                distances["rightSide"] = rightSide;
            if (ceiling <= maxDistance)
                distances["ceiling"] = ceiling;
            if (floor <= maxDistance)
                distances["floor"] = floor;
            return distances;
        }
        return {
            leftSide: leftSide,
            rightSide: rightSide,
            ceiling: ceiling,
            floor: floor,
        };
    },
    circleAndArrayOfLineCoords: function (circle, lineCoords, maxDistance) {
        let b = {};
        for (let i = 0; i < lineCoords.length; i++) {
            if (i !== lineCoords.length - 1) {
                let A = lineCoords[i];
                let B = lineCoords[i + 1];
                if (A.x === B.x && A.y === B.y)
                    continue;
                let C = new XY(circle.x, circle.y);
                const M = (B.y - A.y) / (B.x - A.x);
                const V = (B.x - A.x) / (A.y - B.y);
                const K = (A.y - B.y) / (B.x - A.x);
                let Dx = (-M * B.x + B.y - C.y + V * C.x) / (V - M);
                let Dy = (M / (V - M)) * (-M * B.x + B.y - C.y + V * C.x) + B.y + K * B.x;
                let D = new XY(Dx, Dy);
            }
        }
        return b;
    },
    circleAndLine: function (circle, line, maxDistance) {
        let A = line.P1;
        let B = line.P2;
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
            // if {return} is <= 0 , collision has happened 
            if (circle.y < A.y) { // circle is above line segment
                return -circle.y - circle.radius + A.y;
            }
            else if (circle.y > B.y) { // circle is below line segment
                return circle.y - circle.radius - B.y;
            }
            else if (circle.x < A.x) { // circle is left of the line 
                return -circle.x - circle.radius + A.x;
            }
            else if (circle.x > A.x) { // circle is right of line 
                return circle.x - circle.radius - A.x;
            }
        }
        let C = new XY(circle.x, circle.y);
        const M = (B.y - A.y) / (B.x - A.x);
        const V = (B.x - A.x) / (A.y - B.y);
        const K = (A.y - B.y) / (B.x - A.x);
        let Dx = (-M * B.x + B.y - C.y + V * C.x) / (V - M);
        let Dy = M * Dx + B.y + K * B.x;
        let D = new XY(Dx, Dy);
        if (A.x <= D.x && D.x <= B.x) {
            // if dist <= radius -> collision 
            // let p = Math.sqrt( (circle.x - D.x)**2 + (circle.y - D.y)**2  )
            // console.log({dist: p, collision: p <= circle.radius})
            return Math.sqrt(Math.pow((circle.x - D.x), 2) + Math.pow((circle.y - D.y), 2)) - circle.radius;
        }
        else {
            if (circle.x >= B.x) { // it's closer to B 
                // let p = Math.sqrt( (circle.x-B.x)**2 + (circle.y-B.y)**2 )
                // console.log({dist: p, collision: p <= circle.radius})
                return Math.sqrt(Math.pow((circle.x - B.x), 2) + Math.pow((circle.y - B.y), 2)) - circle.radius;
            }
            else { // it's closer to A 
                // let p = Math.sqrt( (circle.x-A.x)**2 + (circle.y-A.y)**2 )
                // console.log({dist: p, collision: p <= circle.radius})
                return Math.sqrt(Math.pow((circle.x - A.x), 2) + Math.pow((circle.y - A.y), 2)) - circle.radius;
            }
        }
    },
};

//jufSAVE
var distance = {
    DistanceCalculator: DistanceCalculator   
}