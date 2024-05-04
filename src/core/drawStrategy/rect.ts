import {StrategyBase} from "./strategyBase"
import {StrategyStyle} from "./type"
import { Point } from "../drawBoard";

export class RectStrategy extends StrategyBase<SVGRectElement> {
    startPoint : Point | null = null;

    override onStart(point: Point) {
        this.el = this.createElement('rect');
        this.startPoint = point;

        // x, y, width, height
        this.el!.setAttribute('x', point.x.toString());
        this.el!.setAttribute('y', point.y.toString());

        return this.el;
    }

    override onProcess(point: Point) {
        if (this.el == null || this.startPoint == null) return false;

        let startX = this.startPoint!.x; 
        let startY = this.startPoint!.y;
        let endX = point.x; let endY = point.y;
        let width = Math.abs(endX - startX);
        let height = Math.abs(endY - startY);


        if (this.isKeyPass('Shift')) {
            let min = Math.min(width, height);
            width = min; height = min;
        } 

        if (endX < startX) { 
            startX = startX - width;
        }
        if (endY < startY) {
            startY = startY - height;
        }

        this.el.setAttribute('x', startX.toString());
        this.el.setAttribute('y', startY.toString());
        this.el.setAttribute('width', width.toString());
        this.el.setAttribute('height', height.toString());
        return true;
    }

    override onEnd(_point: Point) {
        if (this.el == null) return false;

        this.el = null;
        return true;
    }
}

export function createRectStrategy(strategyStyle: StrategyStyle, keys: Record<string, boolean>): RectStrategy{
    return new RectStrategy(strategyStyle, keys);
}
