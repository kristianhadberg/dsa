import Queue from "./data-structures/queue.js";
import Stack from "./data-structures/stack.js";

export default function shuntingYard(input) {
  const inputQueue = new Queue();
  const operatorStack = new Stack();
  const outputQueue = new Queue();

  const tokens = input.split(" ");
  tokens.forEach((t) => inputQueue.enqueue(t));

  /* 
    Empty the inputQueue
  */
  while (inputQueue.size() > 0) {
    /* 
        Changing to token = inputQueue.dequeue()
        crashes the program
    */
    let index = 0;
    let token = inputQueue.get(index).data;
    inputQueue.dequeue();

    if (!isNaN(Number(token))) {
      outputQueue.enqueue(token);
    }

    if (token == "(") {
      operatorStack.push(token);
      continue;
    }

    if (token == ")") {
      while (operatorStack.size() > 0 && operatorStack.peek().data != "(") {
        const operator = operatorStack.pop();
        outputQueue.enqueue(operator.data);
      }
      operatorStack.pop();
      continue;
    }

    if (isOperator(token)) {
      if (operatorStack.size() == 0) {
        operatorStack.push(token);
        continue;
      }

      const topElementInStack = operatorStack.peek().data;
      if (topElementInStack == "(") {
        operatorStack.push(token);
        continue;
      }

      if (precedence[token] < precedence[topElementInStack]) {
        operatorStack.push(token);
      } else if (
        precedence[token] == precedence[topElementInStack] &&
        associativity[token] == "left"
      ) {
        const operator = operatorStack.pop().data;
        outputQueue.enqueue(operator);
        operatorStack.push(token);
      } else {
        outputQueue.enqueue(token);
      }
    }
  }

  /* 
    Empty the remainder of the operator stack
  */
  while (operatorStack.size() > 0) {
    let operator = operatorStack.pop();
    outputQueue.enqueue(operator.data);
  }

  /* 
    Nothing to do with the algorithm,
    just used to 'prettify' the result of the algorithm
  */
  let expressionAsString = "";
  for (let i = 0; i < outputQueue.size(); i++) {
    expressionAsString += outputQueue.get(i).data + " ";
  }
  console.log(expressionAsString);
}

function isOperator(token) {
  const operators = ["+", "-", "*", "/", "^", "(", ")"];
  return operators.includes(token);
}

/* 
    1 being the highest priority, 3 being the lowest
*/
const precedence = {
  "^": 1,
  "*": 2,
  "/": 2,
  "+": 3,
  "-": 3,
};

const associativity = {
  "^": "right",
  "*": "left",
  "/": "left",
  "+": "left",
  "-": "left",
};
