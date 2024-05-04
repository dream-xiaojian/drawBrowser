import "./style.css"
import {createDrawBoard} from "./core"


const board = createDrawBoard({
    el :"#my_svg",
    strategyStyle: {
        stroke: "#000",
        fill: "transparent",
        strokeWidth: 4,
    }
})


let strategyDoms: NodeListOf<Element> = document.querySelectorAll('[data-strategy]');

strategyDoms.forEach(element => {
    element.addEventListener('click', function(event) {
        reset(strategyDoms);
        element.classList.add('active');
        board.strategyTag = element.getAttribute('data-strategy') as any;
    });
});

let styleColorDoms: NodeListOf<Element> = document.querySelectorAll('[data-color]');

styleColorDoms.forEach(element => {
    element.addEventListener('click', function(event) {
        reset(styleColorDoms);
        element.classList.add('active');
        board.options.strategyStyle!.stroke = element.getAttribute('data-color') as any;
    });
});

let sizeInput: HTMLInputElement = document.getElementById('size') as HTMLInputElement;
sizeInput!.addEventListener('change', function(event) {
    board.options.strategyStyle!.strokeWidth = Number(sizeInput!.value);
});

function reset(doms: NodeListOf<Element>) :void {
    doms.forEach(dom => {
        dom.classList.remove('active');
    });
}











