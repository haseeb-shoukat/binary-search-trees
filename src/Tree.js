import { Node } from "./Node";

const Tree = class {
  constructor(arr) {
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
};

export { Tree };
