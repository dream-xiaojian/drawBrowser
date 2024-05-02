import {StrategyBase, StrategyStyle} from "./index"
import { Point } from "../drawBoard";

export class EllipseStrategy extends StrategyBase<SVGEllipseElement> {
    startPoint : Point | null = null;
    /**
     * 因为每次画都只是一个策略
     * 所以在一次画的过程，起点，过程，终点都调用的是一个策略
     * 所以把root svg传进来，或者将结果返回都是可以的
     * 但是更好的还是返回，这个类就可以更纯粹的做画，样式这两件事
     */
    override onStart(point: Point) {
        this.el = this.createElement('ellipse');
        this.startPoint = point;
        return this.el;
    }

    override onProcess(point: Point) {
        if (this.el == null || this.startPoint == null) return false;
        this.calculate(point)
        return true;
        
    }

    override onEnd(point: Point) {
        if (this.el == null || this.startPoint == null) return false;
        this.calculate(point)
        this.el = null;
        return true;
    }

    calculate(point: Point): void{ 
        let cx = (this.startPoint!.x + point.x) / 2;
        let cy = (this.startPoint!.y + point.y) / 2;
        let rx = Math.abs(point.x - this.startPoint!.x) / 2;
        let ry = Math.abs(point.y - this.startPoint!.y) / 2;
        this.el!.setAttribute('cx', cx.toString());
        this.el!.setAttribute('cy', cy.toString());
        this.el!.setAttribute('rx', rx.toString());
        this.el!.setAttribute('ry', ry.toString());
    }
}

export function createEllipseStrategy(strategyStyle: StrategyStyle): EllipseStrategy{
    return new EllipseStrategy(strategyStyle);
}
