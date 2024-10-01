export { createBoard, displayBoard };
import { ROW_SIZE, COL_SIZE } from "./controller.js";
import { readFromCell } from "./model.js";

function createBoard() {
  const boardElement = document.querySelector("#board");
  boardElement.style.setProperty("--ROWS", ROW_SIZE);
  boardElement.style.setProperty("--COLS", COL_SIZE);

  for (let r = 0; r < ROW_SIZE; r++) {
    for (let c = 0; c < COL_SIZE; c++) {
      const newGridElement = document.createElement("div");
      newGridElement.classList.add("cell");
      boardElement.appendChild(newGridElement);
    }
  }
}

function displayBoard() {
  const cells = document.querySelectorAll("#board .cell");
  for (let row = 0; row < ROW_SIZE; row++) {
    for (let col = 0; col < COL_SIZE; col++) {
      const index = row * COL_SIZE + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}
