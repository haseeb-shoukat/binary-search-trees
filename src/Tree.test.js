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
