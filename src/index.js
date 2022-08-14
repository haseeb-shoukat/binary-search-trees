import { Tree } from "./Tree.js";

const driver = function () {
  const randomArray = function (size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 1000));
    }
    return arr;
  };
  
  const tree = new Tree(randomArray(12));
  console.log("Tree is balanced?", tree.isBalanced());

  console.log("Level Order:" + JSON.stringify(tree.levelOrder()));
  console.log("Pre Order:" + JSON.stringify(tree.preorder()));
  console.log("In Order:" + JSON.stringify(tree.inorder()));
  console.log("Post Order:" + JSON.stringify(tree.postorder()));

  tree.insert(120);
  tree.insert(130);
  tree.insert(150);
  tree.insert(180);

  console.log("Tree is Balanced?", tree.isBalanced());
  tree.rebalance();
  console.log("Tree is Balanced?", tree.isBalanced());

  console.log("Level Order:" + JSON.stringify(tree.levelOrder()));
  console.log("Pre Order:" + JSON.stringify(tree.preorder()));
  console.log("In Order:" + JSON.stringify(tree.inorder()));
  console.log("Post Order:" + JSON.stringify(tree.postorder()));
};

driver();
