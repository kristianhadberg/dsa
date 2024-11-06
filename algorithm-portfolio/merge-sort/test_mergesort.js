import { mergeSort, iterations } from "./mergesort.js";

const list = [5, 8, 2, 1, 0, 4, 3, 9, 7, 6];
const res = mergeSort(list);

console.log(res);
console.log(`iterations: ${iterations}`);
