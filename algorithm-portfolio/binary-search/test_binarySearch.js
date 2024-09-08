import { binarySearch, stringCompare } from "./binarySearch.js";

const numbers = [21, 22, 23, 25, 27, 28, 29, 31, 32, 34, 35];
const words = ["apple", "banana", "cherry", "dragonfruit", "elderberry", "fig", "grape", "kiwi", "mango", "orange"];

binarySearch(22, numbers);
binarySearch("dragonfruit", words, stringCompare);
