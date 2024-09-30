import Grid from "./grid.js";

export { init, ROWS, COLS, readFromCell, getNeighbourValues, writeToCell, getNextGeneration, updateNextGeneration };

const ROWS = 30;
const COLS = 50;
let grid;

function init() {
    grid = new Grid(ROWS, COLS);
    setInitialCells(grid);
}

function writeToCell(row, col, value) {
    grid.set(row, col, value);
}

function setInitialCells(grid) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const randomValue = getRandomValue();

            if (randomValue < 0.15) {
                writeToCell(row, col, 1);
            } else {
                writeToCell(row, col, 0);
            }
        }
    }
}

function getNextGeneration() {
    const nextGeneration = new Grid(ROWS, COLS);

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const neighbourValues = getNeighbourValues(row, col);
            const numberOfLiveNeighbourCells = neighbourValues.filter((value) => value === 1).length;

            const cellValue = readFromCell(row, col);

            let newCellValue;
            if (numberOfLiveNeighbourCells < 2 || numberOfLiveNeighbourCells > 3) {
                newCellValue = 0; // underpopulation
            } else if ((numberOfLiveNeighbourCells === 3) & (cellValue == 0)) {
                newCellValue = 1; // repopulation
            } else if ((numberOfLiveNeighbourCells == 2 && cellValue == 1) || (numberOfLiveNeighbourCells == 3 && cellValue == 1)) {
                newCellValue = 1; // live on to next generation
            }

            nextGeneration.set(row, col, newCellValue);
        }
    }
    return nextGeneration;
}

function updateNextGeneration(nextGeneration) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const value = nextGeneration.get(row, col);
            writeToCell(row, col, value);
        }
    }
}

function readFromCell(row, col) {
    return grid.get(row, col);
}

function getNeighbourValues(row, col) {
    return grid.neighbourValues(row, col);
}

function getRandomValue() {
    return Math.random();
}
