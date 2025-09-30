/**
 * Problem 63: Binary Tree Zigzag Level Order Traversal (Medium)
 * BFS by levels, reverse every other level.
 */

function zigzagLevelOrder(root) {
  const res = [];
  if (!root) return res;
  const q = [root];
  let leftToRight = true;
  for (let qi = 0; qi < q.length;) {
    const size = q.length - qi, level = [];
    for (let i=0;i<size;i++) {
      const node = q[qi++];
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(leftToRight ? level : level.reverse());
    leftToRight = !leftToRight;
  }
  return res;
}

// Tests
const t = {val:1,left:{val:2,left:{val:4}},right:{val:3,right:{val:5}}};
console.log(zigzagLevelOrder(t)); // [[1],[3,2],[4,5]]

module.exports = zigzagLevelOrder;


