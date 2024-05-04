import {StrategyBase} from "./strategyBase"
import {StrategyStyle} from "./type"
import { Point } from "../drawBoard";

export class LineStrategy extends StrategyBase<SVGLineElement> {

    override onStart(point: Point) {
        this.el = this.createElement('line');
        this.el.setAttribute('x1', point.x.toString());
        this.el.setAttribute('y1', point.y.toString());
        
        //取消x2, y2的默认值
        this.el.setAttribute('x2', point.x.toString());
        this.el.setAttribute('y2', point.y.toString());
        return this.el;
    }

    override onProcess(point: Point) {
        if (this.el == null) return false;

        if (this.isKeyPass('Shift')) {
            const x = point.x - parseInt(this.el.getAttribute('x1')!);
            const y = point.y - parseInt(this.el.getAttribute('y1')!);
            let angle = Math.atan2(y, x) * 180 / Math.PI;
        
            angle = Math.round(angle / 45) * 45;

            const distance = Math.sqrt(x * x + y * y);
            point.x = parseInt(this.el.getAttribute('x1')!) + distance * Math.cos(angle * Math.PI / 180);
            point.y = parseInt(this.el.getAttribute('y1')!) + distance * Math.sin(angle * Math.PI / 180);
        }

        this.el!.setAttribute('x2', point.x.toString());
        this.el!.setAttribute('y2', point.y.toString());
        return true;
        
    }

    override onEnd(_point: Point) {
        this.el = null;
        return true;
    }
}

//下面这个函数就是一个line工厂函数，用来创建line策略
export function createLineStrategy(strategyStyle: StrategyStyle, keys: Record<string, boolean>): LineStrategy{
    return new LineStrategy(strategyStyle, keys);
}
