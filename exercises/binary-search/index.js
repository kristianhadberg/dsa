const values = [21, 22, 23, 25, 27, 28, 29, 31, 32, 34, 35];

function binarySearch(search, values) {
    let min;
    let max;
    let mid;
    let found = false;

    min = 0;
    max = values.length - 1;
    mid = (max + min) / 2;

    while (found == false && min < max) {
        let comparison = compare(values[mid], search);
        if (comparison == 0) {
            found = true;
            console.log(`Element ${search} found at index ${mid}`);
        }

        if (comparison > 0) {
            max = mid - 1;
            mid = Math.floor((max + min) / 2);
            console.log(`min: ${min}, max: ${max}, mid: ${mid}`);
            console.log("Lower");
        }

        if (comparison < 0) {
            min = mid + 1;
            mid = Math.floor((max + min) / 2);
            console.log(`min: ${min}, max: ${max}, mid: ${mid}`);
            console.log("Higher");
        }
    }
}

function compare(x, y) {
    return x - y;
}

let result = binarySearch(35, values);
