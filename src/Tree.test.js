import { Tree } from "./Tree";

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
  expect(!tree.root.leftNode.rightNode && !tree.root.leftNode.leftNode).toBe(true)

  const tree2 = new Tree([3, 1, 5, 6, 6, 8]);
  tree2.delete(8);
  expect(tree2.root.rightNode.value).toBe(6);
  expect(!tree2.root.rightNode.rightNode && !tree2.root.rightNode.leftNode).toBe(true)
});

test("Delete item with two children", () => {
  const tree = new Tree([3, 1, 5, 6, 6, 8, 22, 4]);
  tree.delete(5);

  expect(tree.root.value).toBe(6);
  expect(tree.root.rightNode.leftNode).toBe(null);

  tree.insert(0);
  tree.delete(1);
  expect(tree.root.leftNode.value).toBe(3);
  expect(tree.root.leftNode.rightNode.value).toBe(4);
});
