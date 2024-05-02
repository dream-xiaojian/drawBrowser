import { StrategyBase, StrategyTag, CreateDrawStrategy} from '../drawStrategy'
import { Options } from './type'

export class Board {
    private el: SVGSVGElement | null = null; //画布根元素
    private drawStrategies: Record<StrategyTag, StrategyBase<SVGElement>>; //绘制策略
    

    constructor(public options: Options = {}) {
        this.drawStrategies = CreateDrawStrategy(this.options.strategyStyle || {stroke: '#000'})
        
        if (options.el) {
            this.mounted(options.el)
        }
    }

    get strategy() { //自动根据策略标签获取对应的策略
        return this.drawStrategies[this.options.strategyTag || 'line'];
    }


    mounted(el: SVGSVGElement | string) {
        //因为是初始化，所以一开始el就是null
        if (this.el) {
            return new Error('The board has been mounted')
        }

        const element = document.querySelector(el as string);

        if (!element) {
            return new Error('The element is not exist')
        }
        if (element.tagName !== 'svg') {
            return new Error('The element must be a svg element')
        }
        this.el = element as SVGSVGElement;

        this.setListenMethod()
    }

    setListenMethod() {
        const target = this.el as SVGSVGElement;
        
        //这里会存在一个问题，就是this指向的问题，方法中的this指向的是调用这个方法的对象，而不是Board对象
        this.onStart = this.onStart.bind(this)
        this.onProcess = this.onProcess.bind(this)
        this.onEnd = this.onEnd.bind(this)

        target.addEventListener("pointerdown", this.onStart)
        target.addEventListener("pointermove", this.onProcess)
        target.addEventListener("pointerup", this.onEnd)

        //还有一个问题，事件监听器是不会被销毁的，所以这里需要一个销毁的方法
    }

    onStart(event: PointerEvent) {
        const currentDom = this.strategy.onStart(event)
        
        if (currentDom) {
            this.el!.appendChild(currentDom)
        }
    }

    onProcess(event: PointerEvent) {
        this.strategy.onProcess(event)
    }

    onEnd(event: PointerEvent) {
        this.strategy.onEnd(event)
    }
}

export function createDrawBoard(options: Options) {
    return new Board(options);
}