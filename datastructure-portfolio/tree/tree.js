import { Node } from "./node.js";

export class Tree {
  constructor(root) {
    this.root = root;
  }

  dump(node = this.root, depth = 0) {
    // tabs is only used stylistically to prettify the print
    let tabs = "";
    for (let i = 0; i < depth; i++) {
      tabs += "\t";
    }
    console.log(`${tabs}node val: ${node.value}`);

    if (node.childNodes.length === 0) {
      return;
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      this.dump(node.childNodes[i], depth + 1);
    }
  }

  addValue(value) {
    const newNode = new Node(value);
    this.root.appendChild(newNode);
  }

  findValue(value) {
    return iterateThroughTree(this.root, value);

    function iterateThroughTree(node, value) {
      if (node.value == value) {
        return node;
      }

      if (node.childNodes.length === 0) {
        return;
      }

      for (let i = 0; i < node.childNodes.length; i++) {
        const found = iterateThroughTree(node.childNodes[i], value);
        if (found) {
          return found;
        }
      }

      return null;
    }
  }

  removeValue(value) {
    const node = this.findValue(value);

    if (node) {
      node.parent.removeChild(node);
    }
  }
}
