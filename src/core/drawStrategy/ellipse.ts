import {StrategyBase, StrategyStyle} from "./index"
import { Point } from "../drawBoard";

export class EllipseStrategy extends StrategyBase<SVGEllipseElement> {
    startPoint : Point | null = null;

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
        // if (this.el == null || this.startPoint == null) return false;
        // this.calculate(point)
        this.el = null;
        return true;
    }

    calculate(point: Point): void{ 
        let cx = (this.startPoint!.x + point.x) / 2;
        let cy = (this.startPoint!.y + point.y) / 2;
        let rx = Math.abs(point.x - this.startPoint!.x) / 2;
        let ry = Math.abs(point.y - this.startPoint!.y) / 2;
        
        if (this.isKeyPass('Shift')) {
            let min = Math.min(rx, ry);
            rx = min; ry = min;
        }

        this.el!.setAttribute('cx', cx.toString());
        this.el!.setAttribute('cy', cy.toString());
        this.el!.setAttribute('rx', rx.toString());
        this.el!.setAttribute('ry', ry.toString());
    }
}

export function createEllipseStrategy(strategyStyle: StrategyStyle, keys: Record<string, boolean>): EllipseStrategy{
    return new EllipseStrategy(strategyStyle, keys);
}
