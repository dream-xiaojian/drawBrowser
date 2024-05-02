
import { StrategyTag, StrategyStyle} from "../drawStrategy";
/**
 * @description 绘制画板的初始化配置项
 * （1）部分配置项是必填的，比如el、strokeColor
 * （2）部分配置初始化之后是可变的，比如width、height、样式、画的策略
 */
export interface Options {
    el? : SVGSVGElement | string; 

    /**
     * @default line 
     */
    strategyTag?: StrategyTag;

    /**
     * @default {stroke: '#000'}
     */
    strategyStyle?: StrategyStyle;

    /**
     * board-width
     * @default 1
     */
    width?: number; 

    /**
     * board-height
     * @default 1
     */
    height?: number; 
}

/**
 * @description 相对画板的坐标点
 */
export interface Point {
    x : number;
    y : number;
}



