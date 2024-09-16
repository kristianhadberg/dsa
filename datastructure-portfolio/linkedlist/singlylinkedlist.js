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

  remove(data) {}

  getFirst() {
    return this.head?.data;
  }

  getLast() {}

  getFirstNode() {
    return this.head;
  }

  getLastNode() {}

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

  removeNode(node) {}

  dumpList() {
    let node = this.head;

    while (node != null) {
      console.log(node.data);

      node = node.next;
    }
  }
}
