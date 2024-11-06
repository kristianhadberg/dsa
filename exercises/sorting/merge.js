/* const listA = [1, 3, 12, 15];
const listB = [0, 2, 4, 5, 6, 9]; */
/* const listA = [1, 3, 7, 8];
const listB = [0, 2, 4, 5, 6, 9]; */
const listA = [10, 14, 15, 19];
const listB = [0, 5, 11, 16, 20];

const res = merge(listA, listB);

console.log(res);

function merge(arrayA, arrayB) {
    const arrayC = [];

    while (arrayA.length > 0 && arrayB.length > 0) {
        const smallestElementFromA = arrayA[0];
        const smallestElementFromB = arrayB[0];

        if (smallestElementFromA < smallestElementFromB) {
            arrayC.push(arrayA.shift());
        } else {
            arrayC.push(arrayB.shift());
        }
    }

    if (arrayA.length > 0) {
        return arrayC.concat(arrayA);
    } else {
        return arrayC.concat(arrayB);
    }
}
