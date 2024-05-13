/**
 * 负责面板的移动和缩放操作
 */
import {StrategyBase} from "./strategyBase"
import {StrategyStyle} from "./type"
import { Point } from "../drawBoard";

export class HandStrategy extends StrategyBase<SVGElement> {
    startPoint: Point | null = null;
    speed: number = 0.5;
    totalX: number = 0;
    totalY: number = 0;

    constructor(strategyStyle: StrategyStyle, keys: Record<string, boolean>, el:SVGElement) {
        super(strategyStyle, keys);
        this.el = el;
    }

    //电脑端：空格进行移动画布，向左下角滑动画布向右上角移动 ...
    //手机端：按住进行移动画布
    override onStart(point: Point) {
        return null;
    }
             
    override onProcess(point: Point) {

        if (this.isKeyPass( ' ')) {
            console.log('开始移动');

            if (this.startPoint == null) {
                this.startPoint = point;
            }
            else {
                console.log('point', point);

                let x = point.x - this.startPoint.x;
                let y = point.y - this.startPoint.y;
                this.totalX += this.speed * x;
                this.totalY += this.speed * y;
                let transform = `translate(${this.totalX}, ${this.totalY})`;
                this.el!.setAttribute('transform', transform);
            }
        }
        else {
            console.log('结束移动');
            
            this.startPoint = null;
        }
        return null;
    }

    override onEnd(_point: Point) {
        
        return true;
    }
}

//下面这个函数就是一个line工厂函数，用来创建line策略
export function createHandStrategy(strategyStyle: StrategyStyle, keys: Record<string, boolean>, el:SVGElement): HandStrategy{
    return new HandStrategy(strategyStyle, keys, el);
}
