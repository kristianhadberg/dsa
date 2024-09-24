export default class Grid {
    #grid = [];
    #rows;
    #cols;

    constructor(rows, cols) {
        this.#rows = rows;
        this.#cols = cols;

        for (let row = 0; row < this.#rows; row++) {
            this.#grid[row] = [];
            for (let col = 0; col < this.#cols; col++) {
                this.#grid[row][col] = col;
            }
        }
    }

    set(row, col, value) {
        this.#grid[row][col] = value;
    }

    get(row, col) {
        // TODO: temp solution
        if (row >= 0) {
            return this.#grid[row][col];
        }
    }

    indexFor(row, col) {}

    rowColFor(index) {}

    neighbours(row, col) {
        let neighbours = [];
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                // ignore the chosen cell in the grid
                if (r == row && c == col) {
                    console.log("chosen cell");
                    continue;
                }

                const value = this.get(r, c);
                if (value == undefined) {
                    continue;
                }

                const cell = {
                    row: r,
                    col: c,
                    value: value,
                };
                neighbours.push(cell);
            }
        }
        return neighbours;
    }

    neighbourValues(row, col) {
        let neighbourValues = [];

        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                // ignore the chosen cell in the grid
                if (r == row && c == col) {
                    console.log("chosen cell");
                    continue;
                }

                const value = this.get(r, c);
                if (value == undefined) {
                    continue;
                }

                neighbourValues.push(value);
            }
        }
        return neighbourValues;
    }

    nextInRow(row, col) {
        const value = this.#grid[row][col + 1];

        if (value == undefined) {
            console.log("Next row is undefined");
            return;
        }

        return {
            row: row,
            col: col,
            value: value,
        };
    }

    nextInCol(row, col) {
        const value = this.#grid[row + 1][col];

        if (value == undefined) {
            console.log("Next col is undefined");
            return;
        }

        return {
            row: row,
            col: col,
            value: value,
        };
    }

    north(row, col) {
        if (row == 0) {
            return;
        }

        const value = this.#grid[row - 1][col];

        if (value == undefined) {
            console.log("North is undefined");
            return;
        }

        return {
            row: row,
            col: col,
            value: value,
        };
    }

    east(row, col) {
        const value = this.#grid[row][col + 1];

        if (value == undefined) {
            console.log("East is undefined");
            return;
        }

        return {
            row: row,
            col: col,
            value: value,
        };
    }

    south(row, col) {
        if (row == this.#rows - 1) {
            return;
        }

        const value = this.#grid[row + 1][col];

        if (value == undefined) {
            console.log("South is undefined");
            return;
        }

        return {
            row: row,
            col: col,
            value: value,
        };
    }
    west(row, col) {
        const value = this.#grid[row][col - 1];

        if (value == undefined) {
            console.log("West is undefined");
            return;
        }

        return {
            row: row,
            col: col,
            value: value,
        };
    }

    rows() {
        return this.#rows;
    }

    cols() {
        return this.#cols;
    }

    size() {
        return this.#rows * this.#cols;
    }
}
