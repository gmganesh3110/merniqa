/**
 * Problem 32: Binary Tree Level Order Traversal (Medium)
 * BFS levels from a binary tree root. We'll use simple node objects {val,left,right}.
 * Time: O(n)  Space: O(n)
 */

function levelOrder(root) {
  const res = [];
  if (!root) return res;
  const q = [root];
  for (let qi = 0; qi < q.length; ) {
    const size = q.length - qi;
    const level = [];
    for (let i=0;i<size;i++) {
      const node = q[qi++];
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}

// Tests
const tree = {val:3,left:{val:9},right:{val:20,left:{val:15},right:{val:7}}};
console.log(levelOrder(tree)); // [[3],[9,20],[15,7]]

module.exports = levelOrder;


