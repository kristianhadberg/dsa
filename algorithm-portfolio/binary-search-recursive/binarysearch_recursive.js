function binarySearchRecursive(search, values, start, end, compFunc) {
    let mid;
    let comparison;

    /**
     * if a comparator function is passed as the third parameter
     * e.g if its the first function call
     * set it to be the last parameter
     * TODO: this is probably a little bad
     */
    if (typeof start == "function") {
        compFunc = start;
        start = undefined;
    }

    // if first recursion
    if (start == undefined && end == undefined) {
        start = 0;
        end = values.length - 1;
    }

    mid = Math.floor((end + start) / 2);

    if (compFunc != undefined) {
        comparison = compFunc(values[mid], search);
    } else {
        if (typeof search == "string") {
            comparison = stringCompare(values[mid], search);
        }

        if (typeof search == "number") {
            comparison = numberCompare(values[mid], search);
        }
    }

    console.group("Look for value at the middle of the array");
    console.log(`start: ${start}, end: ${end}, mid: ${mid}`);

    if (start >= end) {
        console.groupEnd();
        return -1;
    }

    if (comparison == 0) {
        console.log(`Element ${search} found at index ${mid}`);
        console.groupEnd();
        return mid;
    }

    if (comparison > 0) {
        end = mid - 1;
        mid = Math.floor((end + start) / 2);
    }

    if (comparison < 0) {
        start = mid + 1;
        mid = Math.floor((end + start) / 2);
    }

    const index = binarySearchRecursive(search, values, start, end, compFunc);
    console.groupEnd();

    return index;
}

function stringCompare(a, b) {
    return a.localeCompare(b);
}

function numberCompare(x, y) {
    return x - y;
}

export { binarySearchRecursive, stringCompare, numberCompare };
