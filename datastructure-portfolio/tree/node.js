export class Node {
  value = null;
  parent = null;
  childNodes = [];

  constructor(value) {
    this.value = value;
  }

  firstChild() {
    return this.childNodes[0];
  }

  lastChild() {
    return this.childNodes[this.childNodes.length - 1];
  }

  hasChildNotes() {
    return this.childNodes.length > 0 ? true : false;
  }

  appendChild(node) {
    node.parent = this;
    this.childNodes.push(node);
  }

  removeChild(node) {
    // if leaf node, just remove it
    if (node.childNodes.length === 0) {
      this.childNodes = this.childNodes.filter((n) => n !== node);
      return;
    }

    // if parent node, make grandparent of the node the parents
    for (let i = 0; i < node.childNodes.length; i++) {
      this.childNodes = this.childNodes.filter((n) => n !== node);
      this.appendChild(node.childNodes[i]);
    }
  }

  /* 
    Unsure if this is the intended functionality.
    What should happen with the oldChilds children when the two children are swapped?
    Currently the newChild just 'adopts' the oldChild's children. But maybe they should go to the grandparent instead?
  */
  replaceChild(oldChild, newChild) {
    newChild.parent = this;
    this.childNodes = this.childNodes.filter((n) => n != oldChild);

    if (oldChild.childNodes.length != 0) {
      for (let i = 0; i < oldChild.childNodes.length; i++) {
        oldChild.childNodes[i].parent = newChild;
        newChild.childNodes.push(oldChild.childNodes[i]);
      }
    }

    this.childNodes.push(newChild);
  }
}
