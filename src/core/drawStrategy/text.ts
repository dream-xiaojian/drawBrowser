import {StrategyBase} from "./strategyBase"
import {StrategyStyle} from "./type"
import { Point } from "../drawBoard";

export class TextStrategy extends StrategyBase<SVGForeignObjectElement> {
    startPoint : Point | null = null;
    textarea: HTMLTextAreaElement | null = null;
    borderWidth: number = 2;
    rectBorder: HTMLDivElement  | null = null;
    processFlag: boolean = false;


    setGlobalStyle() {
        this.textarea!.classList.add('drawBrowser-textarea');
        this.rectBorder!.classList.add('drawBrowser-textarea-border');

    }

    createForeignObject(): SVGForeignObjectElement {
        const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        const container = document.createElement('div');
        this.rectBorder = document.createElement('div');
        this.textarea = document.createElement('textarea');

        foreignObject.style.position = 'relative';

        
        container.style.position = 'absolute';
        container.style.width = '100%';
        container.style.height = '100%';


        this.textarea!.style.width = '100%';
        this.textarea!.style.height = '100%';
        this.textarea!.style.boxSizing = 'border-box';

        this.rectBorder.style.position = 'absolute';
        this.textarea!.style.boxSizing = 'border-box';
        this.rectBorder.style.width = '100%';
        this.rectBorder.style.height = '100%';



        this.setGlobalStyle()
        container.appendChild(this.rectBorder)
        container.appendChild(this.textarea)
        foreignObject.appendChild(container);
        return foreignObject;
    }

    /**
       <foreignObject width="120" height="250">
            <textarea name="" id=""></textarea>
        </foreignObject>
     * @param point 
     * @returns 
     */
    override onStart(point: Point) {
        this.el = this.createForeignObject();
        this.startPoint = point;
        this.processFlag = true;

        // x, y, width, height
        this.el!.setAttribute('x', point.x.toString());
        this.el!.setAttribute('y', point.y.toString());

        return this.el;
    }

    override onProcess(point: Point) {
        if (this.processFlag == false) return false;
        
        const width = point.x - this.el!.getBoundingClientRect().left;
        const height = point.y - this.el!.getBoundingClientRect().top;
    
        this.el!.setAttribute('width', `${width + this.borderWidth}px`);
        this.el!.setAttribute('height', `${height + this.borderWidth}px`);


        return true;
    }

    override onEnd(_point: Point) {
        if (this.processFlag == false) return false;

        this.textarea!.focus();
        this.textarea!.style.height = 'auto';  // 重置高度

        this.rectBorder!.style.display = 'none';
        this.resetHeight = this.resetHeight.bind(this);

        // let that = this;
        // this.textarea!.addEventListener('blur', () => {
        //     that.textarea!.setAttribute('readonly', 'true');  // 设置为只读，使其不能被选中
        //     that.textarea!.setAttribute('tabindex', '-1');  // 设置 tabindex 为 -1，使其不能被聚焦
        // });

        //监听事件
        this.textarea!.addEventListener('input', this.resetHeight);

        this.processFlag = false; 
        return true;
    }

    resetHeight() {
        this.textarea!.style.height = 'auto';  // 重置高度
        let scrollHeight = this.textarea!.scrollHeight;
        console.log(this.textarea!.scrollHeight);
        
    
        this.el!.setAttribute('height', `${scrollHeight}px`);
        this.textarea!.style.height = `${scrollHeight}px`; 
    }
}

export function createTextStrategy(strategyStyle: StrategyStyle, keys: Record<string, boolean>): TextStrategy{
    return new TextStrategy(strategyStyle, keys);
}
