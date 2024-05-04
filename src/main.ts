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


let strategyDom = document.querySelectorAll('[data-strategy]');

strategyDom.forEach(element => {
    element.addEventListener('click', function(event) {
        board.strategyTag = element.getAttribute('data-strategy') as any;
    });
});



