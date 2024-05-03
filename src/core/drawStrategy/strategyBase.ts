import {StrategyStyle} from "./index"
import {camelToSnake, getSvgCoordinates, average} from "../../utils"
import { Point } from "../drawBoard";

//策略的基类
export abstract class StrategyBase <T extends SVGElement>{
    el : T | null = null; //每次创建的svg元素

    constructor(public strategyStyle:StrategyStyle) {

    }

    //设置svg元素的样式属性，给el
    setStyle<U extends keyof SVGElementTagNameMap>(el: SVGElementTagNameMap[U]) {
       for (let key in this.strategyStyle) {
            if (this.strategyStyle.hasOwnProperty(key)) {
                let styleKey = key as keyof StrategyStyle;
                el!.setAttribute(camelToSnake(key), String(this.strategyStyle[styleKey]))
            }
       }
    }

    //创建元素和设置样式基本一致, 放回创建的元素
    /**
     * @param tag 用泛型去约束tag的类型，保证是svg的标签的字符串
     * @returns 
     */
    createElement<U extends keyof SVGElementTagNameMap>(tag: U) : SVGElementTagNameMap[U] {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        this.setStyle(el);
        return el;
    }

    /**
     * 画的过程：
     * （1）起始init --- 鼠标左键点击
     * （2）过程 --- 鼠标移动
     * （3）结束 --- 鼠标松开
     */
    onStart(_point: Point): T | undefined {
        return undefined;
    }

    onProcess(_point: Point): boolean | undefined{
        return undefined
    }

    onEnd(_point: Point): boolean | undefined {
        return undefined;
    };

    /**
     * 下面的方法是对上面的三个函数的封装，将三个函数的公共方法提取出来
     * 比如说：鼠标相对坐标的获取
     */
    _eventStart(event: PointerEvent, svg: SVGSVGElement) {
        let point = getSvgCoordinates(event, svg);
        return this.onStart(point);
    }

    _eventProcess(event: PointerEvent, svg: SVGSVGElement) {
        let point = getSvgCoordinates(event, svg);
        return this.onProcess(point);
    }

    _eventEnd(event: PointerEvent, svg: SVGSVGElement) {
        let point = getSvgCoordinates(event, svg);
        return this.onEnd(point);
    }

    static getSvgPathFromStroke(points: number[][]): string{
        const len = points.length

        if (len < 4) {
            return ``
        }

        let a: number[] = points[0]
        let b: number[] = points[1]
        const c: number[] = points[2]
          
        let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
            2
        )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
            b[1],
            c[1]
        ).toFixed(2)} T`
          
        for (let i = 2, max = len - 1; i < max; i++) {
            a = points[i]
            b = points[i + 1]
            result += `${average(a[0], b[0]).toFixed(2)},${average(a[1], b[1]).toFixed(
            2
            )} `
        }

        result += 'Z'
        
        return result
    }
    
}