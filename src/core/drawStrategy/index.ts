//统一的导出接口

import { createLineStrategy } from "./line"
import { StrategyBase } from "./strategyBase"
import {StrategyStyle} from "./type"

export * from './strategyBase'
export * from './line'
export * from './type'

export type StrategyTag = 'line';
export function CreateDrawStrategy(strategyStyle: StrategyStyle): Record<StrategyTag, StrategyBase<SVGElement>>{
    return {
        line: createLineStrategy(strategyStyle)
    }
}






