import * as view from "./view.js";
import * as model from "./model.js";

start();

function start() {
    model.init();
    view.init();

    window.view = view;
    view.createBoard();
    setInterval(gameLoop, 1000);
}

function gameLoop() {
    const nextGeneration = model.getNextGeneration();
    model.updateNextGeneration(nextGeneration);
    view.updateBoard(nextGeneration);
}
