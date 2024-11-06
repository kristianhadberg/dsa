export let iterations = 0;

function merge(arrayA, arrayB) {
  const arrayC = [];

  while (arrayA.length > 0 && arrayB.length > 0) {
    iterations++;
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

export function mergeSort(arr) {
  iterations++;

  if (arr.length <= 1) {
    return arr;
  } else if (arr.length > 1) {
    const midIndex = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, midIndex);
    const rightHalf = arr.slice(midIndex);

    const sortedLeft = mergeSort(leftHalf);
    const sortedRight = mergeSort(rightHalf);

    return merge(sortedLeft, sortedRight);
  }
}

/*  
    Originally used splice like so:
    but changed the implementation to use slice

    const midIndex = Math.floor(arr.length / 2);
    console.log(midIndex);
    const spliced = arr.splice(midIndex);

    const leftHalf = mergeSort(arr);
    const rightHalf = mergeSort(spliced);

    return merge(leftHalf, rightHalf); 
    
  */
