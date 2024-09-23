class Node {
    data = null;
    next = null;
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

export default class SinglyLinkedList {
    head = null;

    add(data) {
        const node = new Node();
        if (this.head == null) {
            node.data = data;
            this.head = node;
        } else {
            node.data = data;
            node.next = this.head;
            this.head = node;
        }
    }

    remove(data) {
        let current = this.head;
        let previousNode;

        while (current != null) {
            if (current.data === data) {
                if (current.data === this.head.data) {
                    this.head = current.next;
                }
                if (previousNode) {
                    previousNode.next = current.next;
                }
            }
            previousNode = current;
            current = current.next;
        }
    }

    getFirst() {
        return this.head?.data;
    }

    getLast() {
        let node = this.head;

        while (node != null) {
            if (node.next == null) {
                return node.data;
            }
            node = node.next;
        }
    }

    getFirstNode() {
        return this.head;
    }

    getLastNode() {
        let node = this.head;

        while (node != null) {
            if (node.next == null) {
                return node;
            }
            node = node.next;
        }
    }

    getNextNode(node) {
        if (!node) {
            this.head;
        }
        return node.next;
    }

    removeFirstNode() {
        if (this.head != null) {
            if (this.head.next != null) {
                this.head = this.head.next;
            } else {
                this.head = null;
            }
        }
    }

    removeLastNode() {
        if (this.head != null) {
            let node = this.head;
            let previousNode;

            while (node != null) {
                // head is the only element
                if (node == this.head && this.head.next == null) {
                    this.head = null;
                    return;
                }
                // last element
                if (node.next == null) {
                    node = null;

                    if (previousNode) {
                        previousNode.next = null;
                    }
                    return;
                }
                previousNode = node;
                node = node.next;
            }
        }
    }

    removeNode(node) {
        let current = this.head;
        let previousNode;

        while (current != null) {
            if ((this.head == node) & (this.head.next != null)) {
                this.head = this.head.next;
            }
            if (current.next == node) {
                if (current == node) {
                    previousNode.next = current.next;
                }
                if (node.next) {
                    current.next = node.next;
                } else {
                    current.next = null;
                }
            }
            previousNode = current;
            current = current.next;
        }
    }

    dumpList() {
        let node = this.head;

        while (node != null) {
            console.log(node.data);

            node = node.next;
        }
    }
}
