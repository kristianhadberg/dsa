"use strict";

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller

let direction = "right";

function start() {
    // start ticking
    tick();
}

function tick() {
    // setup next tick
    setTimeout(tick, 100);

    // Remove player
    for (const part of queue) {
        writeToCell(part.row, part.col, 0);
    }

    document.onkeydown = checkPlayerInput;

    const head = {
        row: queue[queue.length - 1].row,
        col: queue[queue.length - 1].col,
    };

    queue.shift();

    switch (direction) {
        case "left":
            head.col--;
            if (head.col < 0) {
                head.col = 9;
            }
            break;
        case "right":
            head.col++;
            if (head.col > 9) {
                head.col = 0;
            }
            break;
        case "up":
            head.row--;
            if (head.row < 0) {
                head.row = 9;
            }
            break;
        case "down":
            head.row++;
            if (head.row > 9) {
                head.row = 0;
            }
            break;
    }

    queue.push(head);

    // Re-add player
    for (const part of queue) {
        writeToCell(part.row, part.col, 1);
    }

    // Detect if head collides with the rest of the body
    for (let i = 0; i < queue.length - 1; i++) {
        if (queue[i].row == head.row && queue[i].col == head.col) {
            console.log("colission with body");
        }
    }

    // Detect food colission
    if (head.row == food.row && head.col == food.col) {
        console.log("colission");
        eatFood(queue[0].row - 1, queue[0].col - 1);
    }

    spawnFood();

    // display the model in full
    displayBoard();
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

// #endregion controller

// ****** MODEL ******
// #region model

const queue = [
    {
        row: 5,
        col: 5,
    },
    {
        row: 5,
        col: 6,
    },
    {
        row: 5,
        col: 7,
    },
];

const food = {
    row: null,
    col: null,
};

const model = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function writeToCell(row, col, value) {
    model[row][col] = value;
}

function readFromCell(row, col) {
    return model[row][col];
}

function setDirection(dir) {
    direction = dir;
}

function spawnFood() {
    if (food.row == null || food.col == null) {
        console.log("spawned food");
        const randomRow = Math.floor(Math.random() * 10);
        const randomCol = Math.floor(Math.random() * 10);

        food.row = randomRow;
        food.col = randomCol;

        writeToCell(food.row, food.col, 2);
    }
}

function eatFood(row, col) {
    // reset food
    food.row = null;
    food.col = null;
    queue.unshift({ row, col });
}

// #endregion model

// ****** VIEW ******
// #region view

function displayBoard() {
    const cells = document.querySelectorAll("#grid .cell");
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const index = row * 10 + col;

            switch (readFromCell(row, col)) {
                case 0:
                    cells[index].classList.remove("player", "goal");
                    break;
                case 1: // Note: doesn't remove goal if previously set
                    cells[index].classList.add("player");
                    break;
                case 2: // Note: doesn't remove player if previously set
                    cells[index].classList.add("goal");
                    break;
            }
        }
    }
}

// #endregion view
