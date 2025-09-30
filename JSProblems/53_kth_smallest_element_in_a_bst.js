/**
 * Problem 53: Kth Smallest Element in a BST (Medium)
 * Inorder traversal until kth.
 * Time: O(h + k)  Space: O(h)
 */

function kthSmallest(root, k) {
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    if (--k === 0) return cur.val;
    cur = cur.right;
  }
  return -1;
}

// Tests
const tree = {val:3,left:{val:1,right:{val:2}},right:{val:4}};
console.log(kthSmallest(tree, 1)); // 1

module.exports = kthSmallest;


