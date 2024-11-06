//const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // true
//const arr = [1, 2, 4, 5, 7, 9, 11]; // true
//const arr = [2, 2, 3, 6, 8, 9, 9, 10, 10, 11, 12]; // true
//const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1]; // false
//const arr = [1, 8, 9, 4, 6, 7, 2, 5, 3]; // false
//const arr = [1, 2, 4, 4, 5, 3, 6, 7, 8]; // false
//const arr = [4, 4, 4, 4, 4, 4, 4]; // true

//console.log(isSorted(arr));
console.log(simpleSort(arr));

function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }

    return true;
}

function simpleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                swap(i, j);
            }
        }
    }

    function swap(indexA, indexB) {
        const temp = arr[indexA];
        arr[indexA] = arr[indexB];
        arr[indexB] = temp;
    }

    return arr;
}
