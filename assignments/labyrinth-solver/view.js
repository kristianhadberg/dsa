export { displayLabyrinth, displayLabRoute };
import { labyrinth, readFromLabyrinth } from "./model.js";
import Stack from "./data-structures/stack.js";

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

async function displayLabRoute(labRoute) {
  const cells = document.querySelectorAll("#labyrinth .cell");

  let cur = labRoute.tail;
  let reversedStack = new Stack();

  // populate reversedStack in order to show the route in the 'right' order
  while (cur != null) {
    reversedStack.push(cur.data);
    cur = cur.next;
  }

  cur = reversedStack.tail;
  while (cur != null) {
    const index = cur.data.row * labyrinth.cols + cur.data.col;

    cells[index].classList.add("route");

    await sleep(100);
    cur = cur.next;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
