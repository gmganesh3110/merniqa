/**
 * Problem 102: Lowest Common Ancestor of a Binary Tree (Medium)
 * Return LCA for nodes p and q in a general binary tree.
 * DFS: return node if matches p/q or found in both sides.
 */

function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}

// Tests
const tree = {val:3,left:{val:5,left:{val:6},right:{val:2,left:{val:7},right:{val:4}}},right:{val:1,left:{val:0},right:{val:8}}};
const p = tree.left; const q = tree.right;
console.log(lowestCommonAncestor(tree,p,q).val); // 3

module.exports = lowestCommonAncestor;


