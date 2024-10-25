import Stack from "./stack.js";

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.size());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log("----------------------------------------");

console.log(stack.size());
console.log("----------------------------------------");

console.log(stack.peek());
stack.push(1);
console.log(stack.peek());
console.log(stack.size());
console.log("----------------------------------------");

stack.push(2);
stack.push(3);
stack.push(4);
console.log(stack.get(0));
console.log(stack.get(3));
console.log("----------------------------------------");
