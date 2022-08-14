import { Node } from "./Node";

const Tree = class {
  constructor(arr = []) {
    this.root = this.buildTree([
      ...new Set(
        arr.sort(function (a, b) {
          return a - b;
        })
      ),
    ]);
  }

  buildTree(arr) {
    if (arr.length < 1) return null;

    let middle = Math.floor((arr.length - 1) / 2);
    return new Node(
      arr[middle],
      this.buildTree(arr.slice(middle + 1)),
      this.buildTree(arr.slice(0, middle))
    );
  }

  insert(value) {
    this.root = this.#insertRec(value, this.root);
  }

  #insertRec(value, pos) {
    if (!pos) return new Node(value);
    if (value < pos.value) pos.leftNode = this.#insertRec(value, pos.leftNode);
    else pos.rightNode = this.#insertRec(value, pos.rightNode);
    return pos;
  }

  delete(value) {
    this.root = this.#deleteRec(value, this.root);
  }

  #deleteRec(value, pos) {
    if (!pos) return null;
    if (pos.value === value) {
      if (!pos.rightNode) {
        if (!pos.leftNode) return null;
        return pos.leftNode;
      }
      if (!pos.leftNode) return pos.rightNode;
      let successor = this.#findMin(pos.rightNode);
      pos.value = successor;
      pos.rightNode = this.#deleteRec(successor, pos.rightNode);
      return pos;
    }
    if (value < pos.value) pos.leftNode = this.#deleteRec(value, pos.leftNode);
    else pos.rightNode = this.#deleteRec(value, pos.rightNode);
    return pos;
  }

  #findMin(node) {
    if (!node.leftNode) return node.value;
    return this.#findMin(node.leftNode);
  }

  find(value) {
    let pos = this.root;
    while (pos) {
        if (pos.value == value) return pos;
        else if (value > pos.value) pos = pos.rightNode;
        else pos = pos.leftNode;
    }
    return false;
  }
};

export { Tree };
