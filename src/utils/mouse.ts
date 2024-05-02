
import { Point } from '../core';
/**
 * 
 * @param event 
 * @param svg 
 * @returns Point
 */
export function getSvgCoordinates(event: PointerEvent, svg: SVGSVGElement): Point {
    let rect = svg.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

  
    //缩放的问题
    // let scale = svg.viewBox.baseVal.width / rect.width;
    // x *= scale;
    // y *= scale;
  
    return {x, y};
}