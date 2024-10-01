import Queue from "./queue.js";

export {
  initModel,
  writeToCell,
  readFromCell,
  addToQueue,
  getQueue,
  getQueueNode,
  enqueue,
  dequeue,
  getHead,
};

const queue = new Queue();
const grid = [];

function initModel(ROW_SIZE, COL_SIZE) {
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

function addToQueue(data) {
  queue.enqueue(data);
}

function getQueue() {
  return queue;
}

function getHead() {
  return queue.get(0);
}

function getQueueNode(index) {
  return queue.get(index);
}

function enqueue(data) {
  queue.enqueue(data);
}

function dequeue() {
  queue.dequeue();
}
