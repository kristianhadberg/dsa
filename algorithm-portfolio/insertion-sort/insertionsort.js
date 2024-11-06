export function insertionSortShift(arr) {
  let iterations = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    iterations++;
    if (arr[i] > arr[i + 1]) {
      const key = arr[i + 1];

      for (let j = i; j >= 0; j--) {
        iterations++;
        if (key < arr[j]) {
          arr[j + 1] = arr[j];
        }

        if (key > arr[j]) {
          arr[j + 1] = key;
          break;
        }

        if (j == 0) {
          arr[0] = key;
        }
      }
    }
  }
  console.log(`iterations: ${iterations}`);
  return arr;
}

export function insertionSortSwap(arr) {
  let iterations = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    iterations++;

    if (arr[i] > arr[i + 1]) {
      let keyIndex = i + 1;

      for (let j = i; j >= 0; j--) {
        iterations++;
        if (arr[keyIndex] < arr[j]) {
          swap(keyIndex, j);
          keyIndex = j;
        } else {
          break; // break the loop when elements no longer need to be swapped
        }
      }
    }
  }

  function swap(indexA, indexB) {
    const temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  }

  console.log(`iterations: ${iterations}`);
  return arr;
}
