window.addEventListener("load", start);

let secretNumber;
let guesses = [];

function start() {
    const form = document.querySelector("#start-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        secretNumber = form.secret.valueAsNumber;
        startGame();
    });
}

function startGame() {
    initGameButtons();
    guess();
}

function initGameButtons() {
    const gameButtons = document.querySelector("#game-buttons");
    gameButtons.classList.remove("hidden");

    const lowButton = document.querySelector("#low");
    const highButton = document.querySelector("#high");
    const correctButton = document.querySelector("#correct");

    lowButton.addEventListener("click", lowGuess);
    highButton.addEventListener("click", highGuess);
    correctButton.addEventListener("click", correctGuess);
}

function toggleGameButtons() {
    const lowButton = document.querySelector("#low");
    const highButton = document.querySelector("#high");
    const correctButton = document.querySelector("#correct");

    lowButton.disabled = lowButton.disabled == false ? true : false;
    highButton.disabled = highButton.disabled == false ? true : false;
    correctButton.disabled = correctButton.disabled == false ? true : false;
}

function guess() {
    const guess = generateRandomNumber();
    addGuessToList(guess);
    renderGuesses(guess);
}

function lowGuess() {
    addCorrectnessToGuess("Guess was too low");
    guess();
}

function highGuess() {
    addCorrectnessToGuess("Guess was too high");
    guess();
}

function correctGuess() {
    addCorrectnessToGuess("Guess was correct.");
    renderGuesses();
    toggleGameButtons();

    const winDiv = document.querySelector("#win");
    winDiv.classList.remove("hidden");

    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", resetGame);
}

function addGuessToList(guess) {
    const newGuess = {
        guess: guess,
        correctness: "",
    };
    guesses.push(newGuess);
}

function addCorrectnessToGuess(correctnessInfo) {
    let mostRecentGuess = guesses[guesses.length - 1];
    mostRecentGuess.correctness = correctnessInfo;
}

function renderGuesses() {
    const guessesListElement = document.querySelector("#guesses");
    guessesListElement.innerHTML = "";

    guesses.forEach((g) => {
        const li = document.createElement("li");
        li.innerHTML = `I guessed ${g.guess} - ${g.correctness}`;
        guessesListElement.appendChild(li);
    });
}

function resetGame() {
    guesses = [];
    document.querySelector("#guesses").innerHTML = "";
    toggleGameButtons();

    const winDiv = document.querySelector("#win");
    winDiv.classList.add("hidden");
}

function generateRandomNumber() {
    const max = 100;
    return Math.floor(Math.random() * max);
}
