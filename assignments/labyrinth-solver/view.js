export { init, displayLabyrinth };
import { labyrinth, readFromLabyrinth } from "./model.js";

function init() {
  console.log("View init");
}

function displayLabyrinth() {
  const labElement = document.querySelector("#labyrinth");
  labElement.style.setProperty("--COLS", labyrinth.cols);

  for (let r = 0; r < labyrinth.rows; r++) {
    for (let c = 0; c < labyrinth.cols; c++) {
      const cell = readFromLabyrinth(r, c);

      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");

      if (cell.east == true) {
        cellElement.classList.add("wall-east");
      }

      if (cell.south == true) {
        cellElement.classList.add("wall-south");
      }

      if (cell.west == true) {
        cellElement.classList.add("wall-west");
      }

      if (cell.north == true) {
        cellElement.classList.add("wall-north");
      }

      if (r == labyrinth.start.row && c == labyrinth.start.col) {
        cellElement.classList.add("start");
      }

      if (r == labyrinth.goal.row && c == labyrinth.goal.col) {
        cellElement.classList.add("goal");
      }

      labElement.appendChild(cellElement);
    }
  }
}
