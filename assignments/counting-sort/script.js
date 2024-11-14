init();

function init() {
  const list = [5, 4, 5, 1, 0, 1, 3, 1];
  const result = countingSort(list);
  console.log(result);
}

function countingSort(inputArr) {
  // find biggest numer in the array
  const max = Math.max(...inputArr);

  // create array of length max + 1 to account for 0. And fill it with 0's
  const countArray = new Array(max + 1).fill(0);
  const output = new Array(inputArr.length);

  // count the appearences of each number and increment in countArray
  for (let i = 0; i < inputArr.length; i++) {
    const key = inputArr[i];
    countArray[key]++;
  }

  /* 
    change the count array into a sum array by adding the previous count to it
    after this countArray is used to keep track of the indexes that the values in inputArray
    belong at
  */
  for (let i = 1; i < countArray.length; i++) {
    countArray[i] = countArray[i - 1] + countArray[i];
  }

  /* 
    loop through input in reverse order to keep the sorting stable (order of items is kept)
    insert the value (key) at the proper index in the output array and decrement the countarray 
  */
  for (let i = inputArr.length - 1; i >= 0; i--) {
    const key = inputArr[i];
    countArray[key]--;
    output[countArray[key]] = key;
  }

  return output;
}
