import * as view from "./view.js";
import * as model from "./model.js";

export const ROW_SIZE = 20;
export const COL_SIZE = 30;
let gameIsRunning = true;
export let direction = "right";

start();

function start() {
    model.initModel(ROW_SIZE, COL_SIZE);
    view.createBoard(ROW_SIZE, COL_SIZE);

    tick();
}

function tick() {
    if (gameIsRunning) {
        setTimeout(tick, 100);
    }

    // loop through queue to remove player sprite
    let current = model.getHead();

    while (current != null) {
        model.writeToCell(current.data.row, current.data.col, 0);

        current = current.next;
    }

    const queueLength = model.getLength();
    const head = {
        row: model.getTail().data.row,
        col: model.getTail().data.col,
    };

    model.dequeue();

    document.onkeydown = checkPlayerInput;

    switch (direction) {
        case "left":
            head.col--;
            if (head.col < 0) {
                head.col = COL_SIZE - 1;
            }
            break;
        case "right":
            head.col++;
            if (head.col > COL_SIZE - 1) {
                head.col = 0;
            }
            break;
        case "up":
            head.row--;
            if (head.row < 0) {
                head.row = ROW_SIZE - 1;
            }
            break;
        case "down":
            head.row++;
            if (head.row > ROW_SIZE - 1) {
                head.row = 0;
            }
            break;
    }

    model.enqueue(head);

    // loop through queue to re-add player sprite
    current = model.getHead();

    while (current != null) {
        const tail = model.getTail(); // snake head
        const head = model.getHead(); // snake tail
        if (current.data.row == tail.data.row && current.data.col == tail.data.col) {
            model.writeToCell(current.data.row, current.data.col, 3); // if current is last element (snake head)
        } else if (current.data.row == head.data.row && current.data.col == head.data.col) {
            model.writeToCell(current.data.row, current.data.col, 4); // if current is first element (snake tail)
        } else {
            model.writeToCell(current.data.row, current.data.col, 1); // if current is body
        }

        current = current.next;
    }

    // Detect if head collides with the rest of the body
    current = model.getHead();
    while (current != null) {
        // make sure that we don't check that head collides with itself
        if (current != model.getQueueNode(queueLength - 1)) {
            if (current.data.row == head.row && current.data.col == head.col) {
                gameOver();
            }
        }

        current = current.next;
    }

    // Detect food colission
    const food = model.getFood();
    if (food) {
        if (head.row == food.row && head.col == food.col) {
            eatFoodBasedOnDirection(model);
        }
    }

    if (food == null) {
        model.spawnFood();
        /* model.spawnFood(); */
    }

    view.displayBoard();
}

/* 
  Function to check which direction player is going when eating food
*/
function eatFoodBasedOnDirection(model) {
    if (direction == "left") {
        model.eatFood(model.getTail().data.row, model.getTail().data.col - 1);
    }

    if (direction == "right") {
        model.eatFood(model.getTail().data.row, model.getTail().data.col + 1);
    }

    if (direction == "up") {
        model.eatFood(model.getTail().data.row - 1, model.getTail().data.col);
    }

    if (direction == "down") {
        model.eatFood(model.getTail().data.row + 1, model.getTail().data.col);
    }
}

function setDirection(dir) {
    direction = dir;
}

function checkPlayerInput(e) {
    const key = e.key;
    switch (key) {
        case "ArrowLeft":
            if (direction != "right") {
                setDirection("left");
            }
            break;
        case "ArrowUp":
            if (direction != "down") {
                setDirection("up");
            }
            break;
        case "ArrowRight":
            if (direction != "left") {
                setDirection("right");
            }
            break;
        case "ArrowDown":
            if (direction != "up") {
                setDirection("down");
            }
            break;
    }
}

function gameOver() {
    gameIsRunning = false;

    const gameOverElement = document.querySelector(".gameover-container");
    gameOverElement.classList.remove("hidden");

    const restarButton = document.querySelector(".restart");
    restarButton.addEventListener("click", restartGame);
}

function restartGame() {
    // remove overlay
    const gameOverElement = document.querySelector(".gameover-container");
    gameOverElement.classList.add("hidden");

    // loop through queue to remove player sprite
    let current = model.getHead();

    while (current != null) {
        model.writeToCell(current.data.row, current.data.col, 0);

        current = current.next;
    }

    // reset gameboard and state
    const board = document.querySelector("#board");
    board.innerHTML = "";
    setDirection("right");

    const restarButton = document.querySelector(".restart");
    restarButton.removeEventListener("click", restartGame);

    const food = model.getFood();
    model.writeToCell(food.row, food.col, 0);
    model.clearFood();

    // restart the game
    gameIsRunning = true;
    start();
}
