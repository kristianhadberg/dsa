import Queue from "./queue.js";

enqueue();
dequeue();
peek();
size();
get();

function enqueue() {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);

    console.log(queue);
    console.log("------------------------------");
}
function dequeue() {
    const queue = new Queue();

    queue.dequeue(); // test no elements in queue

    const queue1 = new Queue();
    queue1.enqueue(1);
    queue1.dequeue(); // test 1 element in queue
    console.log(queue1);
    console.log("---------------");

    const queue2 = new Queue();
    queue2.enqueue(1);
    queue2.enqueue(2);
    queue2.dequeue(); // test 2 elements in queue
    console.log(queue2);
    console.log("---------------");

    const queue3 = new Queue();
    queue3.enqueue(1);
    queue3.enqueue(2);
    queue3.enqueue(3);
    queue3.dequeue(); // more than 2 elements
    console.log(queue3);

    console.log("------------------------------");
}

function peek() {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const res = queue.peek();
    console.log(res);
    console.log("------------------------------");
}

function size() {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const res = queue.size();
    console.log(res);
    console.log("------------------------------");
}

function get() {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    console.log(queue.get(0));
    console.log(queue.get(1));
    console.log(queue.get(2));
    console.log(queue.get(3)); // element doesn't exist
    console.log("------------------------------");
}
