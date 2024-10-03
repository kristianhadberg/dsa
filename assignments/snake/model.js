import { COL_SIZE, ROW_SIZE } from "./controller.js";
import Queue from "./queue.js";

export {
  initModel,
  writeToCell,
  readFromCell,
  addToQueue,
  getQueueNode,
  enqueue,
  dequeue,
  getHead,
  getTail,
  getLength,
  spawnFood,
  getFood,
  eatFood,
  clearFood,
};

let queue;
const grid = [];
let food = null;

function initModel(ROW_SIZE, COL_SIZE) {
  queue = new Queue();
  queue.enqueue({ row: 5, col: 5 });
  queue.enqueue({ row: 5, col: 6 });
  queue.enqueue({ row: 5, col: 7 });

  initGrid(ROW_SIZE, COL_SIZE);
}

function initGrid(ROW_SIZE, COL_SIZE) {
  for (let r = 0; r < ROW_SIZE; r++) {
    const newRow = [];
    for (let c = 0; c < COL_SIZE; c++) {
      newRow.push(0);
    }
    grid.push(newRow);
  }
}

function writeToCell(row, col, value) {
  grid[row][col] = value;
}

function readFromCell(row, col) {
  return grid[row][col];
}

function spawnFood() {
  const availableRows = [];
  food = {}; // set temporary food, so food only gets spawned once

  setTimeout(() => {
    // generate 2d array with available rows (cells where player is not on)
    for (let r = 0; r < ROW_SIZE; r++) {
      const newRow = [];
      for (let c = 0; c < COL_SIZE; c++) {
        if (readFromCell(r, c) == 0) {
          newRow.push({ row: r, col: c });
        }
      }
      availableRows.push(newRow);
    }

    // select a random (row, col) object from the available rows to spawn the food on
    const randomArray =
      availableRows[Math.floor(Math.random() * availableRows.length)];
    const randomItem =
      randomArray[Math.floor(Math.random() * randomArray.length)];

    food = {
      row: randomItem.row,
      col: randomItem.col,
    };

    writeToCell(food.row, food.col, 2);
  }, 2000);
}

function eatFood(row, col) {
  // reset food
  clearFood();
  queue.enqueue({ row, col });
}

function getFood() {
  return food ? food : null;
}

function clearFood() {
  food = null;
}

function addToQueue(data) {
  queue.enqueue(data);
}

function getHead() {
  return queue.head;
}

function getTail() {
  return queue.tail;
}

function getQueueNode(index) {
  return queue.get(index);
}

function getLength() {
  return queue.size();
}

function enqueue(data) {
  queue.enqueue(data);
}

function dequeue() {
  queue.dequeue();
}
