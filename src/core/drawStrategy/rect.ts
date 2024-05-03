import {StrategyBase} from "./strategyBase"
import {StrategyStyle} from "./type"
import { Point } from "../drawBoard";

export class RectStrategy extends StrategyBase<SVGRectElement> {

    override onStart(point: Point) {
        this.el = this.createElement('rect');
        // x, y, width, height
        this.el!.setAttribute('x', point.x.toString());
        this.el!.setAttribute('y', point.y.toString());

        return this.el;
    }

    override onProcess(point: Point) {
        if (this.el == null) return false;
        let x = parseFloat(this.el.getAttribute('x')!);
        let y = parseFloat(this.el.getAttribute('y')!);
        let width = point.x - x; let height = point.y - y;
        
        //shift 状态下绘制正方形
        if (this.isKeyPass('Shift')) {
            let min = Math.min(width, height);
            width = min; height = min;
        }
        
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
