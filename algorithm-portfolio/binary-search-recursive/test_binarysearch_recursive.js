import { binarySearchRecursive, numberCompare, stringCompare } from "./binarysearch_recursive.js";

const numbers = [21, 22, 23, 25, 27, 28, 29, 31, 32, 34, 35];
const words = ["apple", "banana", "cherry", "dragonfruit", "elderberry", "fig", "grape", "kiwi", "mango", "orange"];

console.log(binarySearchRecursive(21, numbers));
console.log(binarySearchRecursive(21, numbers, numberCompare));
console.log(binarySearchRecursive("mango", words, stringCompare));
console.log(binarySearchRecursive("strawberry", words));
