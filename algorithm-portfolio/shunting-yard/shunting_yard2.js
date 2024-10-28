import Queue from "./data-structures/queue.js";
import Stack from "./data-structures/stack.js";

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

export default function shuntingYard(input) {
  const inputQueue = new Queue();
  const operatorStack = new Stack();
  const outputQueue = new Queue();

  const tokens = input.split(" ");
  tokens.forEach((t) => inputQueue.enqueue(t));

  while (inputQueue.size() > 0) {
    const token = inputQueue.dequeue().data;

    if (!isNaN(Number(token))) {
      outputQueue.enqueue(token);
    }

    if (isOperator(token)) {
      if (operatorStack.size() > 0) {
        const topElementInStack = operatorStack.peek().data;

        if (
          (operatorStack.size() > 0 &&
            topElementInStack != "(" &&
            precedence[token] > precedence[topElementInStack]) ||
          (precedence[token] == precedence[topElementInStack] &&
            associativity[token] == "left")
        ) {
          const operator = operatorStack.pop();
          outputQueue.enqueue(operator.data);
        }
        operatorStack.push(token);
      } else {
        operatorStack.push(token); // if operatorstack is empty
      }
    }

    if (token == "(") {
      operatorStack.push(token);
    }

    if (token == ")") {
      while (operatorStack.size() > 0 && operatorStack.peek().data != "(") {
        const operator = operatorStack.pop().data;
        outputQueue.enqueue(operator);
      }
      operatorStack.pop(); // pop the left parenthases
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
  const operators = ["+", "-", "*", "/", "^"];
  return operators.includes(token);
}
