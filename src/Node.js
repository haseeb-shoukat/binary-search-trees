const Node = class {
  constructor(value = null, rightNode = null, leftNode = null) {
    this.value = value;
    this.rightNode = rightNode;
    this.leftNode = leftNode;
  }
};

export { Node };
