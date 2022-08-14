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

  levelOrder(
    fun = function (node) {
      return node.value;
    }
  ) {
    let arr = [];
    if (!this.root) return arr;

    let queue = [this.root];
    while (queue.length != 0) {
      let x = queue[0];
      arr.push(fun(x));
      if (x.leftNode) queue.push(x.leftNode);
      if (x.rightNode) queue.push(x.rightNode);
      queue.shift();
    }
    return arr;
  }

  levelOrderRec(
    fun = function (node) {
      return node.value;
    }
  ) {
    let pos = this.root;
    if (!pos) return [];
    let arr = this.#levelHelper([pos], fun);
    arr.pop();
    return arr;
  }

  #levelHelper(queue, fun) {
    if (!queue[0]) return;
    let x = fun(queue[0]);
    if (queue[0].leftNode) queue.push(queue[0].leftNode);
    if (queue[0].rightNode) queue.push(queue[0].rightNode);
    queue.shift();
    return [x].concat(this.#levelHelper(queue, fun));
  }

  inorder(
    fun = function (node) {
      return node.value;
    }
  ) {
    let pos = this.root;
    if (!pos) return [];
    return this.#traverseIn(pos, fun);
  }

  #traverseIn(pos, fun) {
    let arr = [];

    if (pos.leftNode) arr.push(...this.#traverseIn(pos.leftNode, fun));
    arr.push(fun(pos));
    if (pos.rightNode) arr.push(...this.#traverseIn(pos.rightNode, fun));

    return arr;
  }

  preorder(
    fun = function (node) {
      return node.value;
    }
  ) {
    let pos = this.root;
    if (!pos) return [];
    return this.#traversePre(pos, fun);
  }

  #traversePre(pos, fun) {
    let arr = [];

    arr.push(fun(pos));
    if (pos.leftNode) arr.push(...this.#traversePre(pos.leftNode, fun));
    if (pos.rightNode) arr.push(...this.#traversePre(pos.rightNode, fun));

    return arr;
  }

  postorder(
    fun = function (node) {
      return node.value;
    }
  ) {
    let pos = this.root;
    if (!pos) return [];
    return this.#traversePost(pos, fun);
  }

  #traversePost(pos, fun) {
    let arr = [];

    if (pos.leftNode) arr.push(...this.#traversePost(pos.leftNode, fun));
    if (pos.rightNode) arr.push(...this.#traversePost(pos.rightNode, fun));
    arr.push(fun(pos));

    return arr;
  }

  height(node) {
    let x = 0,
      y = 0;

    if (!node) return 0;
    if (node.rightNode) x = this.height(node.rightNode) + 1;
    if (node.leftNode) y = this.height(node.leftNode) + 1;

    if (x > y) return x;
    return y;
  }

  depth(node) {
    if (!this.root) return depth;

    let queue = [[this.root, 0]];
    while (queue.length != 0) {
      let [x, y] = queue[0];
      if (JSON.stringify(node) === JSON.stringify(x)) return y;

      if (x.leftNode) queue.push([x.leftNode, y + 1]);
      if (x.rightNode) queue.push([x.rightNode, y + 1]);
      queue.shift();
    }
    return -1;
  }

  isBalanced() {
    let arr = this.levelOrder((node) => {
      let cmp = this.height(node.rightNode) - this.height(node.leftNode);
      return cmp >= -1 && cmp <= 1;
    });

    return arr.every((item) => item);
  }

  rebalance() {
    let arr = this.inorder();
    this.root = this.buildTree(arr);
  }
};

export { Tree };
