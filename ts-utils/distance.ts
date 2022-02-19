import { Rectangle } from "./shapes/rectangle"
import { Circle } from "./shapes/circle"
import { XY } from "./xy"
import { VectorOperations } from "./shapes/line"
import { Line } from "./shapes/line"

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
    circleAndArrayOfLineCoords: function(circle: Circle, lineCoords: XY[], maxDistance?: number) {

        let b: { [key: number]: number } = {}
        for (let i = 0; i < lineCoords.length; i++) {
            if (i !== lineCoords.length - 1) {
                let A = lineCoords[i]
                let B = lineCoords[i+1]

                if (A.x === B.x && A.y === B.y) continue
                let C = new XY(circle.x, circle.y)

                
                const M = (B.y - A.y)/(B.x - A.x)
                const V = (B.x - A.x)/(A.y - B.y)
                const K = (A.y - B.y)/(B.x - A.x)
                let Dx = (-M*B.x+B.y-C.y+V*C.x)/(V-M)
                let Dy = (M/(V-M))*(-M*B.x+B.y-C.y+V*C.x)+B.y+K*B.x
                let D = new XY(Dx, Dy)
            }
        }
        return b 
    },
    circleAndLine: function(circle: Circle, line: Line, maxDistance?: number) {
        console.time("Start")
        let A = line.P1
        let B = line.P2
        if (A.x > B.x) { A = line.P2; B = line.P1 }
        // just so A is always to the left and B is to the right 

        let C = new XY(circle.x, circle.y)

        
        const M = (B.y - A.y)/(B.x - A.x)
        const V = (B.x - A.x)/(A.y - B.y)
        const K = (A.y - B.y)/(B.x - A.x)
        let Dx = (-M*B.x+B.y-C.y+V*C.x)/(V-M)
        let Dy = M*Dx+B.y+K*B.x
        let D = new XY(Dx, Dy)

        if (A.x <= D.x && D.x <= B.x) {
            console.log("inline")
            // if dist <= radius -> collision 
            let p = Math.sqrt( (circle.x - D.x)**2 + (circle.y - D.y)**2  )
            console.log({dist: p, collision: p <= circle.radius})
        }
        else {
            console.log("outline")
            if (circle.x >= B.x) { // it's closer to B 
                let p = Math.sqrt( (circle.x-B.x)**2 + (circle.y-B.y)**2 )
                console.log({dist: p, collision: p <= circle.radius})
            } else { // it's closer to A 
                let p = Math.sqrt( (circle.x-A.x)**2 + (circle.y-A.y)**2 )
                console.log({dist: p, collision: p <= circle.radius})

            }
        }
        console.timeEnd("Start")

    

        return D 
    },
}