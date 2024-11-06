export function insertionSortShift(arr) {
  let iterations = 0;

  for (let i = 0; i < arr.length; i++) {
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
