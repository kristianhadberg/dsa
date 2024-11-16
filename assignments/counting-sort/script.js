init();

/* 

  CONTROLLER

*/

function init() {
  const list = [5, 4, 5, 1, 0, 1, 3, 1, 8, 9, 12, 16, 10, 12, 16, 11, 15, 4, 9];
  countingSort(list);
}

async function countingSort(inputArr) {
  // find biggest numer in the array
  const max = Math.max(...inputArr);

  displayArray(inputArr, "input-array");
  // create array of length max + 1 to account for 0. And fill it with 0's
  const countArray = new Array(max + 1).fill(0);
  const output = new Array(inputArr.length);

  displayArray(countArray, "count-array");
  // count the appearences of each number and increment in countArray
  for (let i = 0; i < inputArr.length; i++) {
    const key = inputArr[i];
    countArray[key]++;

    highlightPillar("input-array", i);
    updateArray(countArray, "count-array");
    await sleep(500); // used to show algorithm in steps
  }
  clearHighlighedPillars();

  displayArray(countArray, "cumulative-array");
  /* 
    change the count array into a sum array by adding the previous count to it
    after this countArray is used to keep track of the indexes that the values in inputArray
    belong at
  */
  for (let i = 1; i < countArray.length; i++) {
    countArray[i] = countArray[i - 1] + countArray[i];

    highlightPillar("count-array", i);
    updateArray(countArray, "cumulative-array");
    await sleep(500);
  }
  clearHighlighedPillars();

  displayArray(output, "output-array");
  /* 
    loop through input in reverse order to keep the sorting stable (order of items is kept)
    insert the value (key) at the proper index in the output array and decrement the countarray 
  */
  for (let i = inputArr.length - 1; i >= 0; i--) {
    const key = inputArr[i];
    countArray[key]--;
    output[countArray[key]] = key;

    highlightPillar("input-array", i);
    updateArray(countArray, "cumulative-array");
    highlightPillar("cumulative-array", key);

    updateArray(output, "output-array");
    await sleep(500);
  }
  clearHighlighedPillars();

  return output;
}

/* 
    Sleep function taken from
    https://www.geeksforgeeks.org/what-is-the-javascript-version-of-sleep-method/
    Used to visualise the algorithm step-by-step
*/
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/* 

  VIEW

*/

function displayArray(arr, divId) {
  const arraysElement = document.querySelector(`#${divId}`);

  const newDiv = document.createElement("div");
  arraysElement.classList.add("array");

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];

    const newElement = document.createElement("div");
    const valueElement = document.createElement("div");

    if (value !== undefined) {
      valueElement.innerHTML = value;
    }

    let height = 0;
    if (value == 0) {
      height = 15;
    } else {
      height = value * 15;

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
    arraysElement.appendChild(newElement);
  }

  arraysElement.appendChild(newDiv);
}

function updateArray(arr, divId) {
  const arraysElement = document.querySelector(`#${divId}`);
  arraysElement.innerHTML = "";

  const newDiv = document.createElement("div");
  arraysElement.classList.add("array");

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];

    const newElement = document.createElement("div");
    const valueElement = document.createElement("div");

    if (value !== undefined) {
      valueElement.innerHTML = value;
    }

    let height = 0;
    if (value == 0) {
      height = 15;
    } else {
      height = value * 15;

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
    arraysElement.appendChild(newElement);
  }

  arraysElement.appendChild(newDiv);
}

function highlightPillar(divId, index) {
  const pillars = document.querySelectorAll(`#${divId} .element`);

  for (let i = 0; i < pillars.length; i++) {
    if (i === index) {
      pillars[i].classList.add("highlighted-pillar");
    } else {
      pillars[i].classList.remove("highlighted-pillar");
    }
  }
}

function clearHighlighedPillars() {
  const pillars = document.querySelectorAll(`.element`);

  pillars.forEach((p) => {
    p.classList.remove("highlighted-pillar");
  });
}
