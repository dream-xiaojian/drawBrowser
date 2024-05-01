import "./style.css"


//获取svg根元素
let svg: SVGSVGElement = document.querySelector("#svg") as SVGSVGElement

//鼠标事件
/**
 * （1）鼠标左键，获取x1, y1, x2, y2 创建一个line，同时要添加到svg,使得
 * 鼠标在移动的过程，线是可见的
 * （2）鼠标移动，修改这个line的x2, y2
 * （3）鼠标松开，确定下x2，y2，取消控制这个line标签
 */
let line: SVGLineElement | null;

//这里选择Point事件来代替mouse事件，因为可以可以处理所有的指针设备，包括鼠标、触摸屏和触控笔等。
svg.addEventListener('pointerdown', (event) => {
    line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', event.clientX.toString());
    line.setAttribute('y1', event.clientY.toString());
    line.setAttribute('x2', event.clientX.toString());
    line.setAttribute('y2', event.clientY.toString());
    line.setAttribute('stroke', 'black');
    svg.appendChild(line);
  });

// 鼠标移动事件
svg.addEventListener('pointermove', (event) => {
    console.log(event.clientX, event.clientY);
    if (!line) return;
    line.setAttribute('x2', event.clientX.toString());
    line.setAttribute('y2', event.clientY.toString());
  });
  
// 鼠标左键松开事件
svg.addEventListener('pointerup', (event) => {
    if (!line) return;
    line.setAttribute('x2', event.clientX.toString());
    line.setAttribute('y2', event.clientY.toString());
    line = null; //取消控制
});


