/**
 * Problem 73: Binary Tree Maximum Path Sum (Hard)
 * Return max path sum; path can start and end anywhere.
 * DFS returning max gain; update global best with left+right+node.
 */

function maxPathSum(root) {
  let best = -Infinity;
  function gain(node){
    if (!node) return 0;
    const left = Math.max(0, gain(node.left));
    const right = Math.max(0, gain(node.right));
    best = Math.max(best, left + right + node.val);
    return Math.max(left, right) + node.val;
  }
  gain(root);
  return best;
}

// Tests
const t = {val:-10,left:{val:9},right:{val:20,left:{val:15},right:{val:7}}};
console.log(maxPathSum(t)); // 42

module.exports = maxPathSum;


