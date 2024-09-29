import { DoublyLinkedList, Node } from "./doublylinkedlist.js";

const dlist = new DoublyLinkedList();
const node = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);

dlist.addNodeFirst(node);
dlist.addNodeLast(node2);
dlist.addNodeLast(node3);

/* console.log(dlist.head);
console.log(dlist.tail); */

//console.log(dlist.removeFirst());
//const res = dlist.removeLast();
//dlist.dumpList();
//console.log(dlist.removeNode(node2));
//dlist.removeNode(node);
//dlist.removeNode(node2);
//dlist.removeNode(node3);
//dlist.dumpList();
console.log(dlist.last());
//console.log(dlist.tail);
