export { init, labyrinth, readFromLabyrinth, visitCell, getRoute };
import Stack from "./data-structures/stack.js";

let labyrinth;
const route = new Stack();
let goalReached = false;

async function init() {
  await readLabyrinthFromJson();
  visitCell(labyrinth.start.row, labyrinth.start.col);
}

/* const labyrinth = {
  rows: 4,
  cols: 4,
  start: { row: 0, col: 0 },
  goal: { row: 2, col: 3 },
  maze: [
    [
      { row: 0, col: 0, north: true, east: true, west: true, south: false },
      { row: 0, col: 1, north: true, east: false, west: true, south: false },
      { row: 0, col: 2, north: true, east: false, west: false, south: true },
      { row: 0, col: 3, north: true, east: true, west: false, south: false },
    ],
    [
      { row: 1, col: 0, north: false, east: false, west: true, south: true },
      { row: 1, col: 1, north: false, east: true, west: false, south: true },
      { row: 1, col: 2, north: true, east: false, west: true, south: false },
      { row: 1, col: 3, north: false, east: true, west: false, south: true },
    ],
    [
      { row: 2, col: 0, north: true, east: false, west: true, south: false },
      { row: 2, col: 1, north: true, east: true, west: false, south: true },
      { row: 2, col: 2, north: false, east: true, west: true, south: false },
      { row: 2, col: 3, north: true, east: true, west: true, south: false },
    ],
    [
      { row: 3, col: 0, north: false, east: false, west: true, south: true },
      { row: 3, col: 1, north: true, east: false, west: false, south: true },
      { row: 3, col: 2, north: false, east: false, west: false, south: true },
      { row: 3, col: 3, north: false, east: true, west: false, south: true },
    ],
  ],
}; */

function visitCell(row, col) {
  if (goalReached) return;

  const cell = readFromLabyrinth(row, col);

  cell.visited = true;

  route.push(cell);

  if (row == labyrinth.goal.row && col == labyrinth.goal.col) {
    console.log(`goal reached @ ${row} ${col}`);
    goalReached = true;
    return;
  }

  if (cell.east == false && !readFromLabyrinth(row, col + 1).visited) {
    visitCell(row, col + 1);
  }

  if (cell.south == false && !readFromLabyrinth(row + 1, col).visited) {
    visitCell(row + 1, col);
  }

  if (cell.west == false && !readFromLabyrinth(row, col - 1).visited) {
    visitCell(row, col - 1);
  }

  if (cell.north == false && !readFromLabyrinth(row - 1, col).visited) {
    visitCell(row - 1, col);
  }

  if (anyAvailablePathsForCell(cell) == null && !goalReached) {
    route.pop();
  }
}

function anyAvailablePathsForCell(cell) {
  const paths = [];
  if (cell.north == false) paths.push({ north: false });
  if (cell.east == false) paths.push({ east: false });
  if (cell.south == false) paths.push({ south: false });
  if (cell.west == false) paths.push({ west: false });

  const unvisited = [];

  for (const p in paths) {
    if (paths[p].north == false) {
      if (!readFromLabyrinth(cell.row - 1, cell.col).visited) {
        unvisited.push(paths[p]);
      }
    }

    if (paths[p].east == false) {
      if (!readFromLabyrinth(cell.row, cell.col + 1).visited) {
        unvisited.push(paths[p]);
      }
    }

    if (paths[p].south == false) {
      if (!readFromLabyrinth(cell.row + 1, cell.col).visited) {
        unvisited.push(paths[p]);
      }
    }

    if (paths[p].west == false) {
      if (!readFromLabyrinth(cell.row, cell.col - 1).visited) {
        unvisited.push(paths[p]);
      }
    }
  }

  return unvisited.length == 0 ? null : unvisited;
}

function getRoute() {
  return route;
}

function readFromLabyrinth(row, col) {
  return labyrinth.maze[row][col];
}

async function readLabyrinthFromJson() {
  const res = await fetch("./data/maze.json");
  labyrinth = await res.json();
}
