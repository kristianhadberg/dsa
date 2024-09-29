export class Node {
  data = null;
  next = null;
  prev = null;
  constructor(data) {
    this.data = data;
  }
}

export class DoublyLinkedList {
  head = null;
  tail = null;

  addFirst(data) {
    const newNode = new Node(data);
    this.addNodeFirst(newNode);
  }

  addLast(data) {
    const newNode = new Node(data);
    this.addNodeLast(newNode);
  }

  first() {
    return this.head;
  }

  last() {
    let lastNode;

    if (this.head && !this.tail) {
      lastNode = this.head;
    } else {
      lastNode = this.tail;
    }

    return lastNode;
  }

  addNodeFirst(node) {
    // if head doesnt exists (no elements in list)
    if (this.head == null) {
      this.makeNodeHead(node);
      return;
    }

    if (this.head != null) {
      const prevHead = this.head;
      node.next = prevHead;
      prevHead.prev = node;
      this.makeNodeHead(node);
    }
  }

  addNodeLast(node) {
    // if head doesnt exists (no elements in list)
    if (this.head == null) {
      this.makeNodeHead(node);
      return;
    }

    // if theres one element in the list
    if (this.tail == null && this.head != null) {
      node.prev = this.head;
      this.head.next = node;
      this.tail = node;
    }

    // more than two elements in the list
    if (this.tail != null) {
      const prevTail = this.tail;
      prevTail.next = node;
      node.prev = prevTail;
      this.tail = node;
    }
  }

  removeNode(node) {
    let current = this.head;
    let previousNode;

    while (current != null) {
      if (current == node) {
        if (node == this.head) {
          if (this.head.next != null) {
            this.makeNodeHead(this.head.next);
            return node;
          } else {
            this.head = null;
            return node;
          }
        }

        if (current.next != null) {
          previousNode.next = current.next;
          current.next.prev = previousNode;
          return node;
        } else {
          previousNode.next = null;
          this.makeNodeTail(previousNode);
          return node;
        }
      }

      previousNode = current;
      current = current.next;
    }
  }

  removeFirst() {
    let removedNode;
    if (this.head == null) {
      return null;
    }

    if (this.tail == null) {
      removedNode = this.head;
      this.head = null;
      return removedNode;
    } else {
      removedNode = this.head;
      const newHead = this.head.next;
      this.makeNodeHead(newHead);
      return removedNode;
    }
  }

  removeLast() {
    let removedNode;

    if (this.head == null && this.tail) {
      return null;
    }

    if (this.tail == null) {
      removedNode = this.head;
      this.head = null;
      return removedNode;
    }

    if (this.head.next != this.tail) {
      removedNode = this.tail;
      this.makeNodeTail(removedNode.prev);
      return removedNode;
    }
  }

  /* 
    Helps making node head by making sure head.prev is set to null
  */
  makeNodeHead(node) {
    this.head = node;
    this.head.prev = null;

    if (this.head == this.tail) {
      this.tail = null;
    }
  }

  makeNodeTail(node) {
    this.tail = node;
    this.tail.next = null;
  }

  clear() {
    /* 
      loop through list and clear elements to save memory instead??
    */
    this.head = null;
    this.tail = null;
  }

  size() {
    let node = this.head;
    let count = 0;

    while (node != null) {
      count++;

      node = node.next;
    }

    return count;
  }

  dumpList() {
    let node = this.head;

    while (node != null) {
      console.log(node);

      node = node.next;
    }
  }
}
