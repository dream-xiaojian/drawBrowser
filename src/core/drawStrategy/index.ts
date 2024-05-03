//统一的导出接口
import { createLineStrategy } from "./line"
import {createEllipseStrategy} from "./ellipse"
import { createBrushStrategy } from "./brush"
import { StrategyBase } from "./strategyBase"
import {StrategyStyle} from "./type"

export * from './strategyBase'
export * from './type'

export type StrategyTag = 'line' | 'ellipse' | 'brush';
export function CreateDrawStrategy(strategyStyle: StrategyStyle): Record<StrategyTag, StrategyBase<SVGElement>>{
    return {
        line: createLineStrategy(strategyStyle),
        ellipse: createEllipseStrategy(strategyStyle),
        brush: createBrushStrategy(strategyStyle)
    }
}






