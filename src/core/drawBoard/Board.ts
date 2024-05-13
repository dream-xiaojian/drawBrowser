import { StrategyBase, StrategyTag, CreateDrawStrategy} from '../drawStrategy'
import { Options } from './type'

export class Board {
    el: SVGSVGElement | null = null; //画布根元素
    private drawStrategies: Record<StrategyTag, StrategyBase<SVGElement | null>>; //绘制策略
    keys: Record<string, boolean> = {}; //键盘按键状态

    constructor(public options: Options = {}) {
        if (options.el) {
            this.mounted(options.el)
        }
        this.drawStrategies = CreateDrawStrategy(this)
    }

    get strategyTag() { //自动根据策略标签获取对应的策略
        return this.options.strategyTag || 'brush';
    }

    set strategyTag(strategyTag: StrategyTag) {
        this.options.strategyTag = strategyTag;
    }

    mounted(el: SVGSVGElement | string, listenWindow: Window = window) {
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

        this.setListenMethod(listenWindow)
    }

    setListenMethod(listenWindow: Window = window) {
        const target = this.el as SVGSVGElement;
        
        //这里会存在一个问题，就是this指向的问题，方法中的this指向的是调用这个方法的对象，而不是Board对象
        this.onStart = this.onStart.bind(this)
        this.onProcess = this.onProcess.bind(this)
        this.onEnd = this.onEnd.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)

        
        
        target.addEventListener("pointerdown", this.onStart, {passive: false})
        listenWindow.addEventListener("pointermove", this.onProcess, {passive: false})
        listenWindow.addEventListener("pointerup", this.onEnd, {passive: false})
        listenWindow.addEventListener("pointercancel", this.onEnd, {passive:false})
       
        listenWindow.addEventListener("keydown", this.handleKeyDown)
        listenWindow.addEventListener("keyup", this.handleKeyUp)

        //还有一个问题，事件监听器是不会被销毁的，所以这里需要一个销毁的方法
    }

    recallProcess () {
        let pointEvent = this.drawStrategies[this.strategyTag].pointEvent;
        if (pointEvent) {
            if (this.strategyTag != 'hand')
                this.drawStrategies[this.strategyTag]._eventProcess(pointEvent, this.el!)
        }
    }

    handleKeyDown(event: KeyboardEvent) {
         this.keys[event.key] = true;
         this.recallProcess();
    }

    handleKeyUp(event: KeyboardEvent) {
        this.keys[event.key] = false;
        this.recallProcess();
   }

    onStart(event: PointerEvent) {
        // return;
        const currentDom = this.drawStrategies[this.strategyTag]._eventStart(event, this.el!) //抽离
        if (currentDom) {
            this.el!.appendChild(currentDom)
        }
    }

    onProcess(event: PointerEvent) {
        event.preventDefault()
        if (this.drawStrategies[this.strategyTag]._eventProcess(event, this.el!)) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    onEnd(event: PointerEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.drawStrategies[this.strategyTag]._eventEnd(event, this.el!)
    }
}

export function createDrawBoard(options: Options) {
    return new Board(options);
}