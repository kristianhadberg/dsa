export { createBoard, displayBoard };
import { ROW_SIZE, COL_SIZE, direction } from "./controller.js";
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
          cells[index].classList.remove(
            "player",
            "food",
            "snake-head",
            "snake-tail"
          );
          break;
        case 1:
          cells[index].classList.remove("snake-tail");
          cells[index].classList.remove("snake-head");
          cells[index].classList.add("player");

          break;
        case 2:
          cells[index].classList.add("food");
          break;
        case 3:
          cells[index].classList.remove("player");
          cells[index].classList.remove("snake-tail");
          cells[index].classList.add("snake-head");
          break;
        case 4:
          cells[index].classList.remove("player");
          cells[index].classList.remove("snake-head");
          cells[index].classList.add("snake-tail");
      }

      /* 
        questionable code to manage sprite direction
      */
      switch (direction) {
        case "right":
          cells[index].classList.remove(
            "direction-down",
            "direction-left",
            "direction-up"
          );
          cells[index].classList.add("direction-right");
          break;
        case "down":
          cells[index].classList.remove(
            "direction-right",
            "direction-left",
            "direction-up"
          );
          cells[index].classList.add("direction-down");
          break;
        case "left":
          cells[index].classList.remove(
            "direction-right",
            "direction-down",
            "direction-up"
          );
          cells[index].classList.add("direction-left");
          break;
        case "up":
          cells[index].classList.remove(
            "direction-right",
            "direction-down",
            "direction-left"
          );
          cells[index].classList.add("direction-up");
          break;
      }
    }
  }
}
