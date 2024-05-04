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

    override onEnd(_point: Point) {
        this.el = null;
        return true;
    }

    calculate(point: Point): void{ 
        let startX = this.startPoint!.x;
        let startY = this.startPoint!.y;
        let endX = point.x;
        let endY = point.y;

        let rx = Math.abs(endX - startX) / 2;
        let ry = Math.abs(endY - startY) / 2;
        
        if (this.isKeyPass('Shift')) {
            let min = Math.min(rx, ry);
            rx = min; ry = min;
        }
    
        let cx = startX + rx; let cy = startY + ry;
        if (endX < startX) { 
            cx = startX - rx;
        }
        if (endY < startY) {
            cy = startY - ry;
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
