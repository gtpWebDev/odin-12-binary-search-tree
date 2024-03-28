import Tree from "./Tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let testBalanceArray = [1, 3, 5, 7];
const tree = new Tree(testBalanceArray);
prettyPrint(tree.root);
console.log("Tree should be balanced:", tree.isBalanced());

const outputArray = tree.levelOrder();
console.log("level order:", outputArray);
prettyPrint(tree.root);

const preOrderOutputArray = tree.preOrder();
console.log("pre order:", preOrderOutputArray);
prettyPrint(tree.root);

const postOrderOutputArray = tree.postOrder();
console.log("post order:", postOrderOutputArray);
prettyPrint(tree.root);

const inOrderOutputArray = tree.inOrder();
console.log("in order:", inOrderOutputArray);

tree.insert(9);
tree.insert(11);
tree.insert(13);
tree.insert(15);

prettyPrint(tree.root);

console.log("Tree should NOT be balanced:", tree.isBalanced());

tree.rebalance();
prettyPrint(tree.root);

console.log("Tree should be balanced:", tree.isBalanced());

const searchNode = tree.find(11);
console.log("Node height", tree.height(searchNode));
console.log("Node depth", tree.depth(searchNode));

// testing callbacks
const callback = (node) => {
  node.data = node.data * 2;
};

console.log("Tree 2*mult", tree.levelOrder(callback));
prettyPrint(tree.root);

console.log("Tree height", tree.height(tree.root));
