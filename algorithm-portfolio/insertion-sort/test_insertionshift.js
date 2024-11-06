import { insertionSortShift } from "./insertionsort.js";

const list = [5, 8, 2, 1, 0, 4, 3, 9, 7, 6];

const sorted = insertionSortShift(list);

console.log(sorted);
