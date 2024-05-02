import "./style.css"
import {createDrawBoard} from "./core"


const board = createDrawBoard({
    el :"#my_svg",
    strategyStyle: {
        stroke: "#000",
        fill: "transparent",
    }
})
