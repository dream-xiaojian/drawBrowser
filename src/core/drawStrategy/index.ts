//统一的导出接口
import { createLineStrategy } from "./line"
import {createEllipseStrategy} from "./ellipse"
import { createBrushStrategy } from "./brush"
import { createRectStrategy } from "./rect"
import { createTextStrategy } from "./text"
import {createHandStrategy} from "./hand"
import { StrategyBase } from "./strategyBase"
import { Board } from "../drawBoard"

export * from './strategyBase'
export * from './type'

export type StrategyTag = 'line' | 'ellipse' | 'brush' | 'rect' | 'text' | 'hand';
export function CreateDrawStrategy(board: Board): Record<StrategyTag, StrategyBase<null | SVGElement>>{
    //这里的传参数其实是不合适的，不符合封装的原则，对象的属性应该私有化
    return {
        line: createLineStrategy(board.options.strategyStyle!, board.keys),
        ellipse: createEllipseStrategy(board.options.strategyStyle!, board.keys),
        brush: createBrushStrategy(board.options.strategyStyle!, board.keys),
        rect: createRectStrategy(board.options.strategyStyle!, board.keys),
        text: createTextStrategy(board.options.strategyStyle!, board.keys),
        hand: createHandStrategy(board.options.strategyStyle!, board.keys, board.el!)
    }
}






