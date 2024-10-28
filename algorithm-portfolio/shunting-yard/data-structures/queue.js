export default class Queue {
    head = null;
    tail = null;
    length = 0;

    enqueue(data) {
        const newNode = new Node(data);

        // if queue length is 0
        if (this.head == null) {
            this.head = newNode;
            this.length++;
            return newNode;
        }

        // if queue length is 1
        if (this.tail == null) {
            this.head.next = newNode;
            this.tail = newNode;
            this.length++;
            return newNode;
        }

        // if queue length is greater than 1
        const currentTail = this.tail;
        currentTail.next = newNode;
        this.tail = newNode;
        this.length++;
    }

    dequeue() {
        // if queue length is 0
        if (this.head == null) {
            return;
        }

        // if queue length is 1 (queue only has head)
        if (this.length == 1) {
            const currentHead = this.head;
            this.head = null;
            this.length--;
            return currentHead;
        }

        // if queue length is 2 (queue only has head and tail)
        if (this.length == 2) {
            const currentTail = this.tail;

            this.head = currentTail;

            // clear current tail so head is not equals tail
            this.tail = null;

            this.length--;
            return this.head;
        }

        // if queue length is greater than 2
        const currentHead = this.head;
        this.head = currentHead.next;

        this.length--;
        return this.head;
    }

    size() {
        return this.length;
    }

    peek() {
        if (!this.head) {
            return null;
        }
        return this.head.data;
    }

    get(index) {
        let current = this.head;
        let indexCounter = 0;

        while (current != null) {
            if (indexCounter == index) {
                return current;
            }

            current = current.next;
            indexCounter++;
        }

        // return null if index is out of bounds
        return null;
    }
}

class Node {
    data;
    next = null;

    constructor(data) {
        this.data = data;
    }
}
