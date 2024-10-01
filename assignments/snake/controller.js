import * as view from "./view.js";
import * as model from "./model.js";

export const ROW_SIZE = 20;
export const COL_SIZE = 30;
let direction = "left";

start();

function start() {
  model.initModel(ROW_SIZE, COL_SIZE);
  view.createBoard(ROW_SIZE, COL_SIZE);

  tick();
}

function tick() {
  setTimeout(tick, 100);

  const queue = model.getQueue();

  // loop through queue
  let current = queue.head;

  while (current != null) {
    model.writeToCell(current.data.row, current.data.col, 0);

    current = current.next;
  }

  const head = {
    row: model.getHead().data.row,
    col: model.getHead().data.col,
  };

  console.log(head);

  model.dequeue();

  document.onkeydown = checkPlayerInput;

  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = COL_SIZE - 1;
      }
      break;
    case "right":
      head.col++;
      if (head.col > COL_SIZE - 1) {
        head.col = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = ROW_SIZE - 1;
      }
      break;
    case "down":
      head.row++;
      if (head.row > ROW_SIZE - 1) {
        head.row = 0;
      }
      break;
  }

  model.enqueue(head);

  // loop through queue
  current = queue.head;

  while (current != null) {
    model.writeToCell(current.data.row, current.data.col, 1);

    current = current.next;
  }

  view.displayBoard();
}

function setDirection(dir) {
  direction = dir;
}

function checkPlayerInput(e) {
  const key = e.key;
  switch (key) {
    case "ArrowLeft":
      setDirection("left");
      break;
    case "ArrowUp":
      setDirection("up");
      break;
    case "ArrowRight":
      setDirection("right");
      break;
    case "ArrowDown":
      setDirection("down");
      break;
  }
}
