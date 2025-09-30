/**
 * Problem 101: Lowest Common Ancestor of a BST (Easy/Medium)
 * Use BST property to move down from root.
 */

function lowestCommonAncestorBST(root, p, q) {
  let cur = root;
  while (cur) {
    if (p.val < cur.val && q.val < cur.val) cur = cur.left;
    else if (p.val > cur.val && q.val > cur.val) cur = cur.right;
    else return cur;
  }
  return null;
}

// Tests
const bst = {val:6,left:{val:2,left:{val:0},right:{val:4,left:{val:3},right:{val:5}}},right:{val:8,left:{val:7},right:{val:9}}};
console.log(lowestCommonAncestorBST(bst, {val:2}, {val:8}).val); // 6

module.exports = lowestCommonAncestorBST;


