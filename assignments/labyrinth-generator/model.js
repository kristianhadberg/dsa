export { readFromLabyrinth, generateLabyrinth };

const frontier = new Set();
const ROWS = 4;
const COLS = 4;
let labyrinth = {
  rows: ROWS,
  cols: COLS,
  start: { row: 0, col: 0 },
  goal: { row: 3, col: 3 },
  maze: [],
};

async function generateLabyrinth() {
  const initialGrid = [];

  // Generate initial grid where all cells are only walls
  for (let r = 0; r < ROWS; r++) {
    const newRow = [];
    for (let c = 0; c < COLS; c++) {
      const newCell = {
        row: r,
        col: c,
        north: true,
        east: true,
        west: true,
        south: true,
      };
      newRow.push(newCell);
    }
    initialGrid.push(newRow);
  }

  const maze = []; // used to track which cells are currently in the maze
  const randomCell = initialGrid[3][2];
  maze.push(randomCell);

  const previousFrontier = []; // used to track all cells that have been in the frontier
  if (randomCell.col < COLS - 1) {
    frontier.add(initialGrid[randomCell.row][randomCell.col + 1]);
  }
  addFrontier(randomCell.r, randomCell.c);

  while (frontier.size > 0) {
    // select random from frontier
    const rnd = Math.floor(Math.random() * frontier.size);
    let count = 0;

    // select random element from frontier
    frontier.forEach((ele) => {
      if (count == rnd) {
        const randomNeighbourInMaze = neighbours(ele.row, ele.col, maze); // select random neighbour from the selected frontier cell, that is in the maze
        createPassage(ele, randomNeighbourInMaze);

        maze.push(ele);

        // remember to add the frontier cell to the maze
        if (!previousFrontier.includes(ele)) {
          addFrontier(ele.row, ele.col, initialGrid);
        }

        previousFrontier.push(ele);
        frontier.delete(ele);
      }
      count++;
    });
  }

  labyrinth.maze = initialGrid;
  return labyrinth;
}

// creates passages between two cells by removing opposite walls
function createPassage(cell1, cell2) {
  if (cell1.row - 1 == cell2.row && cell1.col == cell2.col) {
    cell1.north = false;
    cell2.south = false;
  }

  if (cell1.row + 1 == cell2.row && cell1.col == cell2.col) {
    cell1.south = false;
    cell2.north = false;
  }

  if (cell1.row == cell2.row && cell1.col - 1 == cell2.col) {
    cell1.west = false;
    cell2.east = false;
  }

  if (cell1.row == cell2.row && cell1.col + 1 == cell2.col) {
    cell1.east = false;
    cell2.west = false;
  }
}

function addFrontier(row, col, initialGrid) {
  if (row > 0) {
    frontier.add(initialGrid[row - 1][col]);
  }

  if (row < ROWS - 1) {
    frontier.add(initialGrid[row + 1][col]);
  }

  if (col > 0) {
    frontier.add(initialGrid[row][col - 1]);
  }

  if (col < COLS - 1) {
    frontier.add(initialGrid[row][col + 1]);
  }
}

function neighbours(r, c, maze) {
  const n = [];

  maze.forEach((element) => {
    if ((element.row - 1 == r) & (element.col == c)) {
      n.push(element);
    }

    if ((element.row + 1 == r) & (element.col == c)) {
      n.push(element);
    }

    if ((element.row == r) & (element.col - 1 == c)) {
      n.push(element);
    }

    if ((element.row == r) & (element.col + 1 == c)) {
      n.push(element);
    }
  });

  const randomNeighbour = n[Math.floor(Math.random() * n.length)];
  return randomNeighbour;
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

function readFromLabyrinth(row, col) {
  return labyrinth.maze[row][col];
}
