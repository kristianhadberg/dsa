import { insertionSortShift, insertionSortSwap } from "./insertionsort.js";

const list = [5, 8, 2, 1, 0, 4, 3, 9, 7, 6];
const list2 = [5, 8, 2, 1, 0, 4, 3, 9, 7, 6];

const sortedWithShift = insertionSortShift(list);
const sortedWithSwap = insertionSortSwap(list2);

console.log(sortedWithShift);
console.log(sortedWithSwap);
