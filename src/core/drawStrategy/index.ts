//统一的导出接口
import { createLineStrategy } from "./line"
import {createEllipseStrategy} from "./ellipse"
import { createBrushStrategy } from "./brush"
import { createRectStrategy } from "./rect"
import { createTextStrategy } from "./text"
import { StrategyBase } from "./strategyBase"
import {StrategyStyle} from "./type"

export * from './strategyBase'
export * from './type'

export type StrategyTag = 'line' | 'ellipse' | 'brush' | 'rect' | 'text';
export function CreateDrawStrategy(strategyStyle: StrategyStyle, keys: Record<string, boolean>): Record<StrategyTag, StrategyBase<SVGElement>>{
    return {
        line: createLineStrategy(strategyStyle, keys),
        ellipse: createEllipseStrategy(strategyStyle, keys),
        brush: createBrushStrategy(strategyStyle, keys),
        rect: createRectStrategy(strategyStyle, keys),
        text: createTextStrategy(strategyStyle, keys),
    }
}






