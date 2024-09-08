function binarySearch(search, values, compFunc) {
    let min;
    let max;
    let mid;
    let found = false;

    min = 0;
    max = values.length - 1;
    mid = Math.floor((max + min) / 2);

    let iterations = 0;

    while (found == false && min <= max) {
        iterations++;
        let comparison;
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

        if (comparison == 0) {
            found = true;
            console.log(`Element ${search} found at index ${mid}`);
        }

        if (comparison > 0) {
            max = mid - 1;
            mid = Math.floor((max + min) / 2);
            console.log(`min: ${min}, max: ${max}, mid: ${mid}`);
        }

        if (comparison < 0) {
            min = mid + 1;
            mid = Math.floor((max + min) / 2);
            console.log(`min: ${min}, max: ${max}, mid: ${mid}`);
        }
        console.log(`Number of iterations: ${iterations}`);
    }
}

function stringCompare(a, b) {
    return a.localeCompare(b);
}

function numberCompare(x, y) {
    return x - y;
}

export { binarySearch, stringCompare };
