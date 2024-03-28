import Node from "./Node.js";
import Queue from "./Queue.js";

// Tree functionality applies to sorted and deduplicated arrays

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree = (array) => {
    const dedup = [...new Set(array)];
    dedup.sort((a, b) => a - b);
    return buildBalancedTree(dedup, 0, dedup.length - 1);
  };

  insert = (value) => {
    function insertNode(node, value) {
      if (node.data === value) {
        console.log(`Attempt to add ${value} failed as it is a duplicate.`);
        return false;
      } else if (value < node.data) {
        if (node.left === null) {
          node.left = new Node(value);
          return true;
        } else {
          insertNode(node.left, value);
        }
      } else if (value > node.data) {
        if (node.right === null) {
          node.right = new Node(value);
          return true;
        } else {
          insertNode(node.right, value);
        }
      }
    }
    insertNode(this.root, value);
  };

  find = (value) => {
    function findNode(node, value) {
      if (!node) return null;
      if (value === node.data) {
        return node;
      } else if (value < node.data) {
        return findNode(node.left, value);
      } else if (value > node.data) {
        return findNode(node.right, value);
      }
    }
    return findNode(this.root, value);
  };

  deleteItem = (value) => {
    // - leaf node - both children are null - remove node from parent node
    // - node with single child - replace node with child node for parent node
    // - node with two children - replace node with either its in order predecessor or successor - the one that follows it directly
    // - - then delete the node
  };

  // breadth-first search
  levelOrder = (func = null) => {
    // if a function is passed, apply it, otherwise do nothing
    let outputArray = [];
    const callback = func ? func : (x) => x;

    // queue data structure facilitates levelOrder search
    const queue = new Queue();
    queue.enqueue(this.root);

    while (queue.peek()) {
      const currentNode = queue.peek();
      // add any existing child nodes and apply callback function to node
      if (currentNode.left) queue.enqueue(currentNode.left);
      if (currentNode.right) queue.enqueue(currentNode.right);
      callback(currentNode);
      outputArray.push(currentNode.data);
      queue.dequeue();
    }
    return outputArray;
  };

  //depth-first search, node/left/right
  preOrder = (func = null) => {
    function preOrderRecurse(node, callback) {
      if (!node) return null;

      callback(node);
      outputArray.push(node.data);
      preOrderRecurse(node.left, callback);
      preOrderRecurse(node.right, callback);
    }

    let outputArray = [];
    const callback = func ? func : (x) => x;
    preOrderRecurse(this.root, callback);
    return outputArray;
  };

  //depth-first search, left/right/node
  postOrder = (func = null) => {
    function postOrderRecurse(node, callback) {
      if (!node) return null;

      callback(node);
      postOrderRecurse(node.left, callback);
      postOrderRecurse(node.right, callback);
      outputArray.push(node.data);
    }

    let outputArray = [];
    const callback = func ? func : (x) => x;
    postOrderRecurse(this.root, callback);
    return outputArray;
  };

  //depth-first search, left/node/right
  inOrder = (func = null) => {
    function inOrderRecurse(node, callback) {
      if (!node) return null;

      callback(node);
      inOrderRecurse(node.left, callback);
      outputArray.push(node.data);
      inOrderRecurse(node.right, callback);
    }

    let outputArray = [];
    const callback = func ? func : (x) => x;
    inOrderRecurse(this.root, callback);
    return outputArray;
  };

  height = (node) => {
    if (node.left === null && node.right == null) return 0;
    const leftHeight = node.left ? this.height(node.left) : 0;
    const rightHeight = node.right ? this.height(node.right) : 0;
    return Math.max(leftHeight, rightHeight) + 1;
  };

  depth = (searchNode) => {
    function depthRecurse(node, depth) {
      if (node === searchNode) currDepth = depth;
      if (node.left) depthRecurse(node.left, depth + 1);
      if (node.right) depthRecurse(node.right, depth + 1);
    }

    let currDepth = 0;
    depthRecurse(this.root, currDepth);
    return currDepth;

    // start at tree root with depth zero
  };

  isBalanced = () => {
    const isBalancedRecurse = (node) => {
      if (node.left === null && node.right === null) return;

      const leftHeight = node.left ? this.height(node.left) : 0;
      const rightHeight = node.right ? this.height(node.right) : 0;
      if (Math.abs(leftHeight - rightHeight) > 1) {
        isBal = false;
      }
      if (node.left) isBalancedRecurse(node.left);
      if (node.right) isBalancedRecurse(node.right);
    };

    let isBal = true;
    isBalancedRecurse(this.root);
    return isBal;
  };

  rebalance = () => {
    const treeArray = this.levelOrder();
    this.root = this.buildTree(treeArray);
  };
}

const buildBalancedTree = (array, start, end) => {
  if (end < start) return null;

  const midPoint = parseInt((end + start) / 2);
  let node = new Node(array[midPoint]);
  node.left = buildBalancedTree(array, start, midPoint - 1);
  node.right = buildBalancedTree(array, midPoint + 1, end);
  return node;
};

export { Tree as default };
