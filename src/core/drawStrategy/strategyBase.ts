//策略的基类
abstract class StrategyBase <T extends SVGElement>{
    el : T | null = null; //每次创建的svg元素

    constructor() {

    }

    //设置svg元素的样式属性
    setStyle(el: SVGElement) {
        el.setAttribute('stroke', 'black');
    }

    //创建元素和设置样式基本一致, 放回创建的元素
    /**
     * 
     * @param tag 用泛型去约束tag的类型，保证是svg的标签的字符串
     * @returns 
     */
    createElement<T extends keyof SVGElementTagNameMap>(tag: T) : SVGElementTagNameMap[T] {
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
    onStart(point: PointerEvent): T | undefined {
        return undefined;
    }

    onProcess(point: PointerEvent): void {
        return undefined
    }

    onEnd(point: PointerEvent): void {
        return undefined;
    };
}