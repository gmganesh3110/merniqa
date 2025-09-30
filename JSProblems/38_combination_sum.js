/**
 * Problem 38: Combination Sum (Medium)
 * Given candidates (positive ints) and target, find combinations that sum to target.
 * Each number may be used unlimited times. No duplicate combinations.
 * Approach: backtracking with non-decreasing order.
 */

function combinationSum(candidates, target) {
  candidates.sort((a,b)=>a-b);
  const res = [];
  function dfs(start, remain, path) {
    if (remain === 0) { res.push([...path]); return; }
    for (let i = start; i < candidates.length; i++) {
      const v = candidates[i];
      if (v > remain) break;
      path.push(v);
      dfs(i, remain - v, path);
      path.pop();
    }
  }
  dfs(0, target, []);
  return res;
}

// Tests
console.log(combinationSum([2,3,6,7], 7)); // [[2,2,3],[7]]

module.exports = combinationSum;


