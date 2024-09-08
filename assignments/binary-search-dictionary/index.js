const endpoint = "http://localhost:8080/ordbogen";

window.addEventListener("load", start);

let min;
let mid;
let max;
let sizes;

async function start() {
    const form = document.querySelector("#form");
    form.addEventListener("submit", (e) => search(e));

    sizes = await getSizes();
}

async function search(e) {
    e.preventDefault();
    min = sizes.min;
    max = sizes.max;
    reset();

    const form = document.querySelector("#form");
    const searchText = form.search.value;

    await binarySearch(searchText);
}

async function getSizes() {
    const json = await fetch(endpoint).then((response) => response.json());
    return json;
}

async function getEntryAt(index) {
    const entry = await fetch(`${endpoint}/${index}`).then((resp) => resp.json());
    return entry;
}

async function binarySearch(search) {
    const startTime = performance.now();
    let found = false;
    const requestElement = document.querySelector("#requests");

    mid = (max + min) / 2;

    let numberOfRequests = 0;

    while (found == false && min <= max) {
        const entry = await getEntryAt(mid);
        const comparison = search.localeCompare(entry.inflected);
        numberOfRequests++;
        requestElement.innerHTML = `Server requests: ${numberOfRequests}`;

        if (comparison == 0) {
            found = true;
            console.log(`Element ${search} found at index ${mid}`);
            showFoundElement(entry);
            return;
        }

        if (comparison > 0) {
            min = mid + 1;
            mid = Math.floor((max + min) / 2);
            console.log(`min: ${min}, max: ${max}, mid: ${mid}`);
        }

        if (comparison < 0) {
            max = mid - 1;
            mid = Math.floor((max + min) / 2);
            console.log(`min: ${min}, max: ${max}, mid: ${mid}`);
        }
    }

    const endTime = performance.now();
    const timeTakenInSeconds = (endTime - startTime) / 1000;
    showTimeTaken(timeTakenInSeconds);
    showNotFoundElement(search);
}

function showFoundElement(entry) {
    const foundElement = document.querySelector("#found");
    foundElement.classList.remove("hidden");

    const id = document.querySelector("#id");
    const headword = document.querySelector("#headword");
    const inflected = document.querySelector("#inflected");
    const partOfSpeech = document.querySelector("#part-of-speech");

    id.innerHTML = `id: ${entry.id}`;
    headword.innerHTML = `headword: ${entry.headword}`;
    inflected.innerHTML = `inflected: ${entry.inflected}`;
    partOfSpeech.innerHTML = `part of speech: ${entry.partofspeech}`;
}

function reset() {
    const foundElement = document.querySelector("#found");
    foundElement.classList.add("hidden");

    const notFoundElement = document.querySelector("#not-found");
    notFoundElement.classList.add("hidden");
}

function showTimeTaken(timeTakenInSeconds) {
    const timeElement = document.querySelector("#time");
    timeElement.innerHTML = `Time taken in seconds: ${timeTakenInSeconds}`;
}

function showNotFoundElement(search) {
    const notFoundElement = document.querySelector("#not-found");
    notFoundElement.classList.remove("hidden");
    const notFoundText = document.querySelector("#not-found-text");
    notFoundText.innerHTML = `Couldn't find the word: ${search}`;
}
