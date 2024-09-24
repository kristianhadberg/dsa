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
        const input = this.parseInput(row, col, value);
        this.#grid[input.row][input.col] = input.value;
    }

    get(row, col) {
        // TODO: temp solution
        const input = this.parseInput(row, col);

        if (row >= 0) {
            return this.#grid[input.row][input.col];
        }
    }

    indexFor(row, col) {}

    rowColFor(index) {}

    neighbours(row, col) {
        let neighbours = [];
        const input = this.parseInput(row, col);
        console.log(input);

        for (let r = input.row - 1; r <= input.row + 1; r++) {
            for (let c = input.col - 1; c <= input.col + 1; c++) {
                // ignore the chosen cell in the grid
                if (r == input.row && c == input.col) {
                    console.log("chosen cell");
                    continue;
                }

                const value = this.get(r, c);
                if (value == undefined) {
                    continue;
                }

                const cell = this.createCellObject(input.row, input.col, value);
                neighbours.push(cell);
            }
        }
        return neighbours;
    }

    neighbourValues(row, col) {
        let neighbourValues = [];
        const input = this.parseInput(row, col);

        for (let r = input.row - 1; r <= input.row + 1; r++) {
            for (let c = input.col - 1; c <= input.col + 1; c++) {
                // ignore the chosen cell in the grid
                if (r == input.row && c == input.col) {
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
        const input = this.parseInput(row, col);

        const value = this.#grid[input.row][input.col + 1];

        if (value == undefined) {
            console.log("Next row is undefined");
            return;
        }

        return this.createCellObject(input.row, input.col, value);
    }

    nextInCol(row, col) {
        const input = this.parseInput(row, col);

        const value = this.#grid[input.row + 1][input.col];

        if (value == undefined) {
            console.log("Next col is undefined");
            return;
        }

        return this.createCellObject(input.row, input.col, value);
    }

    north(row, col) {
        const input = this.parseInput(row, col);

        if (input.row == 0) {
            return;
        }

        const value = this.#grid[input.row - 1][input.col];

        if (value == undefined) {
            console.log("North is undefined");
            return;
        }

        return this.createCellObject(input.row, input.col, value);
    }

    east(row, col) {
        const input = this.parseInput(row, col);

        const value = this.#grid[input.row][input.col + 1];

        if (value == undefined) {
            console.log("East is undefined");
            return;
        }

        return this.createCellObject(input.row, input.col, value);
    }

    south(row, col) {
        const input = this.parseInput(row, col);

        if (input.row == this.#rows - 1) {
            return;
        }

        const value = this.#grid[input.row + 1][input.col];

        if (value == undefined) {
            console.log("South is undefined");
            return;
        }

        return this.createCellObject(input.row, input.col, value);
    }

    west(row, col) {
        const input = this.parseInput(row, col);
        const value = this.#grid[input.row][input.col - 1];

        if (value == undefined) {
            console.log("West is undefined");
            return;
        }

        return this.createCellObject(input.row, input.col, value);
    }

    fill(value) {
        for (let row = 0; row < this.#rows; row++) {
            for (let col = 0; col < this.#cols; col++) {
                this.set(row, col, value);
            }
        }
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

    parseInput(a1, a2, a3) {
        if (typeof a1 === "object" && a1 !== null) {
            return this.createCellObject(a1.row, a1.col, a2);
        }

        return this.createCellObject(a1, a2, a3);
    }

    createCellObject(row, col, value) {
        const object = {
            row: row,
            col: col,
            value: value,
        };

        return object;
    }
}
