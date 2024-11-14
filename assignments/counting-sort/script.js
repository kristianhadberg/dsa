init();

/* 

  CONTROLLER

*/

function init() {
  const list = [5, 4, 5, 1, 0, 1, 3, 1];
  const result = countingSort(list);
  console.log(result);
}

/* 

  MODEL

*/

function countingSort(inputArr) {
  // find biggest numer in the array
  const max = Math.max(...inputArr);

  displayArray(inputArr);

  // create array of length max + 1 to account for 0. And fill it with 0's
  const countArray = new Array(max + 1).fill(0);
  const output = new Array(inputArr.length);

  // count the appearences of each number and increment in countArray
  for (let i = 0; i < inputArr.length; i++) {
    const key = inputArr[i];
    countArray[key]++;
  }

  displayArray(countArray);

  /* 
    change the count array into a sum array by adding the previous count to it
    after this countArray is used to keep track of the indexes that the values in inputArray
    belong at
  */
  for (let i = 1; i < countArray.length; i++) {
    countArray[i] = countArray[i - 1] + countArray[i];
  }

  displayArray(countArray);

  /* 
    loop through input in reverse order to keep the sorting stable (order of items is kept)
    insert the value (key) at the proper index in the output array and decrement the countarray 
  */
  for (let i = inputArr.length - 1; i >= 0; i--) {
    const key = inputArr[i];
    countArray[key]--;
    output[countArray[key]] = key;
  }

  displayArray(output);

  return output;
}

/* 

  VIEW

*/

function displayArray(arr) {
  const arraysElement = document.querySelector("#arrays");

  const newDiv = document.createElement("div");
  newDiv.classList.add("array");

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];

    const newElement = document.createElement("div");
    const valueElement = document.createElement("div");
    valueElement.innerHTML = value;

    let height = 0;
    if (value == 0) {
      height = 20;
    } else {
      height = value * 40;

      if (height > 200) {
        height = 200; // make sure no elements are bigger than 200px
      }
    }

    valueElement.style.height = `${height}px`;
    valueElement.classList.add("element");

    const indexElement = document.createElement("div");
    indexElement.innerHTML = i;
    indexElement.classList.add("index");

    newElement.appendChild(valueElement);
    newElement.appendChild(indexElement);
    newDiv.appendChild(newElement);
  }

  arraysElement.appendChild(newDiv);
}
