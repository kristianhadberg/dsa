window.addEventListener("load", start);

let secretNumber;
let guesses = [];
let min = 1;
let mid;
let max = 100;

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
    const guess = binarySearch();

    if (min >= max) {
        addGuessToList(guess);
        renderGuesses(guess);
        correctGuess(true);
        return;
    }

    addGuessToList(guess);
    renderGuesses(guess);
}

function lowGuess() {
    addCorrectnessToGuess("Guess was too low");
    min = mid + 1;
    guess();
}

function highGuess() {
    addCorrectnessToGuess("Guess was too high");
    max = mid - 1;
    guess();
}

function correctGuess(lastRemainingNumber) {
    let correctText = lastRemainingNumber ? "Guess was correct. (Last remaining number)" : "Guess was correct.";
    addCorrectnessToGuess(correctText);

    renderGuesses();
    toggleGameButtons();

    const winDiv = document.querySelector("#win");
    winDiv.classList.remove("hidden");

    const winText = document.querySelector("#win-text");
    let text;
    if (guesses.length < 3) {
        text = "Yay!";
    }
    if (guesses.length < 5) {
        text = "Yay!";
    } else {
        text = "Booo";
    }

    winText.innerHTML = text;

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

    const guessCounterElement = document.querySelector("#guess-counter");
    guessCounterElement.innerHTML = `Number of guesses: ${guesses.length}`;
}

function resetGame() {
    guesses = [];
    min = 1;
    max = 100;
    document.querySelector("#guesses").innerHTML = "";
    toggleGameButtons();

    const winDiv = document.querySelector("#win");
    winDiv.classList.add("hidden");
}

function binarySearch() {
    mid = Math.floor((max + min) / 2);
    return mid;
}

function compare(x, y) {
    return x - y;
}
