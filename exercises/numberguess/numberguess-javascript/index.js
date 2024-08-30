"use strict";
window.addEventListener("load", start);

let secret;
let guesses = [];

function start() {
    console.log("Application running...");

    const form = document.querySelector("#guess-form");
    form.addEventListener("submit", recieveInput);

    secret = generateRandomNumber();
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100);
}

function recieveInput(e) {
    e.preventDefault();

    const form = e.target;
    const guess = form.guess.valueAsNumber;

    const comparison = compare(guess, secret);

    if (comparison > 0) {
        console.log("You guessed too high.");
        addGuessToList(guess);
    }

    if (comparison < 0) {
        console.log("You guessed too low.");
        addGuessToList(guess);
    }

    if (comparison == 0) {
        console.log("You guessed correct.");
        gameWon();
    }
}

function addGuessToList(guess) {
    guesses.push(guess);
    renderGuess(guess);
}

function renderGuess(guess) {
    const guessesListElement = document.querySelector("#guesses");

    const li = document.createElement("li");
    li.innerHTML = guess;

    guessesListElement.appendChild(li);
}

function compare(guess, secret) {
    return guess - secret;
}

function gameWon() {
    const winElement = document.querySelector("#win");
    winElement.textContent = `Congrats! The answer was ${secret}`;
    winElement.classList.toggle("hidden");
}
