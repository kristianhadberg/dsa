import Grid from "./grid.js";

const ROWS = 20;
const COLS = 20;
const grid = new Grid(ROWS, COLS);

// console.log(grid.set(0, 0, 100));
// console.log(grid.get(0, 0));
// console.log(grid.nextInRow(0, 0));
// grid.get(-1, -1);
// const neighbours = grid.neighbours(1, 0);
// const neighbours = grid.neighbours({ row: 1, col: 1 });
// const neighbours = grid.neighbours(1, 1);
// console.log(neighbours);

// grid.set({ row: 0, col: 0 }, 5);
// grid.set(1, 0, 5);

// grid.fill(5);
//
console.log(grid.north(0, 0));
console.log(grid.north({ row: 0, col: 0 }));
// console.log(grid.get(1, 0));
