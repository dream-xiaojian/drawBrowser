import {StrokeOptions} from "perfect-freehand"

/**
 * @description 绘制策略的样式，比如线条的颜色、宽度、样式等
 */
export interface StrategyStyle {
    /**
     * stroke 
     * @default #000 
     */
    stroke?: string; 
    

    /**
     * board-stroke-width
     * @default 1
     */
    strokeWidth?: number; 

    /**
     * board-stroke-linecap
     * @default butt
     */
    fill?: string; 

    /**
     * perfect-freehand Options
    */
    strokeOptions?: StrokeOptions 
}