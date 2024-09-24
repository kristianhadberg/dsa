import Grid from "./grid.js";

const ROWS = 20;
const COLS = 20;
const grid = new Grid(ROWS, COLS);

// console.log(grid.set(0, 0, 100));
// console.log(grid.get(0, 0));
// console.log(grid.nextInRow(0, 0));
// grid.get(-1, -1);
const neighbours = grid.neighbours(1, 0);
console.log(neighbours);
