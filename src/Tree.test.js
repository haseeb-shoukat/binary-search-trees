import { Tree } from "./Tree";
import { Node } from "./Node";

test("Creates a tree from a sorted array", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6]);
  let root = tree.root;

  expect(root.value).toBe(3);
  expect(root.rightNode.value).toBe(5);
  expect(root.leftNode.value).toBe(1);
  expect(root.rightNode.rightNode.value).toBe(6);
  expect(root.rightNode.leftNode.value).toBe(4);
  expect(root.leftNode.leftNode).toBe(null);
  expect(root.leftNode.rightNode.value).toBe(2);
  expect(root.rightNode.rightNode.rightNode).toBe(null);
});

test("Creates a tree from an unsorted array", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22]);
  let root = tree.root;

  expect(root.value).toBe(5);
  expect(root.rightNode.value).toBe(8);
  expect(root.leftNode.value).toBe(1);
  expect(root.rightNode.rightNode.value).toBe(22);
  expect(root.rightNode.leftNode.value).toBe(6);
  expect(root.leftNode.leftNode).toBe(null);
  expect(root.leftNode.rightNode.value).toBe(3);
  expect(root.rightNode.rightNode.rightNode).toBe(null);
});

test("Inserts an item in an array", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22]);
  let root = tree.root;
  tree.insert(4);
  expect(root.leftNode.rightNode.rightNode.value).toBe(4);
});

test("Inserts an item in an empty array", () => {
  const tree = new Tree();
  tree.insert("hello");
  expect(tree.root.value).toBe("hello");
});

test("Delete the last item in an array", () => {
  const tree = new Tree([3]);
  tree.delete(3);
  expect(tree.root).toBe(null);
});

test("Delete item with no children", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22]);
  tree.delete(3);
  expect(tree.root.leftNode.rightNode).toBe(null);
});

test("Delete item with a single child", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22]);
  tree.delete(1);
  expect(tree.root.leftNode.value).toBe(3);
  expect(!tree.root.leftNode.rightNode && !tree.root.leftNode.leftNode).toBe(
    true
  );

  const tree2 = new Tree([3, 1, 5, 6, 6, 8]);
  tree2.delete(8);
  expect(tree2.root.rightNode.value).toBe(6);
  expect(
    !tree2.root.rightNode.rightNode && !tree2.root.rightNode.leftNode
  ).toBe(true);
});

test("Delete item with two children", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  tree.delete(5);

  expect(tree.root.value).toBe(6);
  expect(tree.root.rightNode.leftNode).toBe(null);

  tree.insert(0);
  tree.delete(3);
  expect(tree.root.leftNode.value).toBe(4);
  expect(tree.root.leftNode.rightNode).toBe(null);
  expect(tree.root.leftNode.leftNode.leftNode.value).toBe(0);
});

test("find returns correct node", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  let node = tree.find(8);
  expect(node.value).toBe(8);
  expect(node.rightNode.value).toBe(22);
  expect(node.leftNode.value).toBe(6);

  node = tree.find(6);
  expect(node.value).toBe(6);
  expect(!node.rightNode && !node.leftNode).toBe(true);
});

test("find returns false if node does not exist", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(tree.find(0)).toBe(false);

  const tree1 = new Tree();
  expect(tree1.find(1)).toBe(false);
});

test("levelOrder works with no function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(tree.levelOrder()).toStrictEqual([5, 3, 8, 1, 4, 6, 22]);
});

test("levelOrder works with a function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(
    tree.levelOrder(function (node) {
      return node.value + 1;
    })
  ).toStrictEqual([6, 4, 9, 2, 5, 7, 23]);
});

test("levelOrderRec works with no function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(tree.levelOrderRec()).toStrictEqual([5, 3, 8, 1, 4, 6, 22]);
});

test("levelOrderRec works with a function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(
    tree.levelOrderRec(function (node) {
      return node.value + 1;
    })
  ).toStrictEqual([6, 4, 9, 2, 5, 7, 23]);
});

test("inorder works with no function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(tree.inorder()).toStrictEqual([1, 3, 4, 5, 6, 8, 22]);
});

test("inorder works with a function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(
    tree.inorder(function (node) {
      return node.value + 1;
    })
  ).toStrictEqual([2, 4, 5, 6, 7, 9, 23]);
});

test("preorder works with no function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(tree.preorder()).toStrictEqual([5, 3, 1, 4, 8, 6, 22]);
});

test("preorder works with a function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(
    tree.preorder(function (node) {
      return node.value + 1;
    })
  ).toStrictEqual([6, 4, 2, 5, 9, 7, 23]);
});

test("postorder works with no function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(tree.postorder()).toStrictEqual([1, 4, 3, 6, 22, 8, 5]);
});

test("postorder works with a function parameter", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(
    tree.postorder(function (node) {
      return node.value + 1;
    })
  ).toStrictEqual([2, 5, 4, 7, 23, 9, 6]);
});

test("height returns correct height of node", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(tree.height(tree.root)).toBe(2);
  expect(tree.height(tree.root.leftNode)).toBe(1);

  tree.insert(0);
  expect(tree.height(tree.root)).toBe(3);
});

test("depth returns correct depth of node", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  expect(tree.depth(tree.root.leftNode)).toBe(1);
  expect(tree.depth(tree.root.leftNode.leftNode)).toBe(2);

  tree.insert(0);
  expect(tree.depth(tree.root.leftNode.leftNode.leftNode)).toBe(3);
  expect(tree.depth(tree.root)).toBe(0);
  expect(tree.depth(new Node(2))).toBe(-1);
});

test("isBalanced reports unbalanced trees", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  tree.insert(2);
  tree.insert(1);
  expect(tree.isBalanced()).toBe(false);

  const tree1 = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  tree1.insert(50);
  tree1.insert(12);
  tree1.insert(11);
  tree1.insert(10);
  expect(tree1.isBalanced()).toBe(false);
});

test("isBalanced reports balanced trees", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  tree.insert(0);
  expect(tree.isBalanced()).toBe(true);

  const tree1 = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  tree1.insert(50);
  tree1.insert(12);
  expect(tree1.isBalanced()).toBe(true);
});

test("rebalance balances an unbalanced tree", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  tree.insert(50);
  tree.insert(12);
  tree.insert(11);
  expect(tree.isBalanced()).toBe(false);
  tree.rebalance();
  expect(tree.isBalanced()).toBe(true);
});
