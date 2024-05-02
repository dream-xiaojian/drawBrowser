import {StrategyBase} from "./strategyBase"
import {StrategyStyle} from "./type"
import { Point } from "../drawBoard";

export class LineStrategy extends StrategyBase<SVGLineElement> {
    /**
     * 因为每次画都只是一个策略
     * 所以在一次画的过程，起点，过程，终点都调用的是一个策略
     * 所以把root svg传进来，或者将结果返回都是可以的
     * 但是更好的还是返回，这个类就可以更纯粹的做画，样式这两件事
     */
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
        this.el!.setAttribute('x2', point.x.toString());
        this.el!.setAttribute('y2', point.y.toString());
        return true;
        
    }

    override onEnd(point: Point) {
        if (this.el == null) return false;
        this.el!.setAttribute('x2', point.x.toString());
        this.el!.setAttribute('y2', point.y.toString());
        this.el = null;
        return true;
    }
}

//下面这个函数就是一个line工厂函数，用来创建line策略
export function createLineStrategy(strategyStyle: StrategyStyle): LineStrategy{
    return new LineStrategy(strategyStyle);
}
