import { Tree } from "./tree.js";
import { Node } from "./node.js";

const root = new Node("0");
const tree = new Tree(root);

const node1 = new Node("1");
const node2 = new Node("2");
const node3 = new Node("3");
const node4 = new Node("4");
const node5 = new Node("5");
const node6 = new Node("6");
const node7 = new Node("7");
const node8 = new Node("8");
const node9 = new Node("9");
const node10 = new Node("10");
const node11 = new Node("11");
const node12 = new Node("12");
const node13 = new Node("13");

root.appendChild(node1);
root.appendChild(node2);
root.appendChild(node3);

node1.appendChild(node4);
node4.appendChild(node5);
node4.appendChild(node6);
node4.appendChild(node10);

node3.appendChild(node7);
node7.appendChild(node8);
node7.appendChild(node9);

node11.appendChild(node12);
node11.appendChild(node13);

//dump(root);
//node4.removeChild(node10);
//node1.replaceChild(node4, node11);
tree.addValue("14");
tree.dump();

tree.removeValue("4");

tree.dump();
