import { getStroke } from 'perfect-freehand'
import {StrategyBase, StrategyStyle} from "./index"
import { Point } from "../drawBoard";

export class BrushStrategy extends StrategyBase<SVGPathElement> {
    points: Point[] = []; 

    override onStart(point: Point) {
        this.el = this.createElement('path');
        // reset points
        this.points = [point]; 
        return this.el;
    }

    override onProcess(point: Point) {
        if (this.el == null) return false;
        this.points.push(point);
        this.el!.setAttribute('d', BrushStrategy.getSvgPathD(this.points, this.strategyStyle));
        return true;
    }

    override onEnd(point: Point) {
        if (this.el == null) return false;
        this.el = null;
        return true;
    }


    static getSvgPathD(inputPoint: Point[], strategyStyle: StrategyStyle): string {
        const stroke = getStroke(inputPoint, {
            size: strategyStyle.strokeWidth,
            thinning: 0.9,
            simulatePressure: false,
            start: {
              taper: 5,
            },
            end: {
              taper: 5,
            },
            //defining your options outside of the getStroke function
            ...strategyStyle.strokeOptions  
        })

        return StrategyBase.getSvgPathFromStroke(stroke)

    }

}

export function createBrushStrategy(strategyStyle: StrategyStyle, keys: Record<string, boolean>): BrushStrategy{
    return new BrushStrategy(strategyStyle, keys);
}
