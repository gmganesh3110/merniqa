/**
 * Problem 33: Construct Binary Tree from Preorder and Inorder Traversal (Medium)
 * Build tree given preorder and inorder arrays.
 * Time: O(n)  Space: O(n)
 */

function buildTree(preorder, inorder) {
  const idx = new Map();
  inorder.forEach((v,i)=>idx.set(v,i));
  let pre = 0;
  function helper(lo, hi) {
    if (lo > hi) return null;
    const rootVal = preorder[pre++];
    const mid = idx.get(rootVal);
    const node = { val: rootVal, left: null, right: null };
    node.left = helper(lo, mid - 1);
    node.right = helper(mid + 1, hi);
    return node;
  }
  return helper(0, inorder.length - 1);
}

// Tests
const root = buildTree([3,9,20,15,7],[9,3,15,20,7]);
console.log(JSON.stringify(root));

module.exports = buildTree;


