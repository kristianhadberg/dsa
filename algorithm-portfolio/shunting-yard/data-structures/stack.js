export default class Stack {
    tail = null;
    length = 0;

    push(data) {
        const prevTail = this.tail;
        const newNode = new Node(data, prevTail);

        this.tail = newNode;
        this.length++;
    }

    pop() {
        if (this.length == 1) {
            const poppedTail = this.tail;
            this.tail = null;
            this.length--;
            return poppedTail;
        }

        if (this.length > 1) {
            const poppedTail = this.tail;
            this.tail = poppedTail.next;
            this.length--;
            return poppedTail;
        }

        return null;
    }

    peek() {
        return this?.tail;
    }

    size() {
        return this.length;
    }

    get(index) {
        let curNode = this.tail;
        let curIndex = 0;

        while (curNode != null) {
            if (curIndex == index) {
                return curNode;
            }

            curIndex++;
            curNode = curNode.next;
        }
    }
}

class Node {
    data = null;
    next = null;
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}
