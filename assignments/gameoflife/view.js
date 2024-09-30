import * as controller from "./controller.js";
import { ROWS, COLS, readFromCell, writeToCell } from "./model.js";
export { init, createBoard, updateBoard };

function init() {
    console.log("view init");
}

function createBoard() {
    const board = document.querySelector("#board");
    board.style.setProperty("--COLS", COLS);

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = readFromCell(row, col);

            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            if (cell === 1) {
                cellElement.classList.add("active-cell");
            }
            board.appendChild(cellElement);
        }
    }
}

function updateBoard() {
    const board = document.querySelector("#board");
    board.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = readFromCell(row, col);

            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            if (cell === 1) {
                cellElement.classList.add("active-cell");
            }
            board.appendChild(cellElement);
        }
    }
}

// function updateBoard(nextGeneration) {
//     for (let row = 0; row < ROWS; row++) {
//         for (let col = 0; col < COLS; col++) {
//             const value = nextGeneration.get(row, col);
//             writeToCell(row, col, value);
//         }
//     }
// }
