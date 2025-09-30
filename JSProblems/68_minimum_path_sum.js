/**
 * Problem 68: Minimum Path Sum (Medium)
 * Grid with non-negative numbers; find path sum minimum from top-left to bottom-right (only right/down).
 * DP in-place or with 1D array.
 */

function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = Array(n).fill(0);
  for (let r=0;r<m;r++) {
    for (let c=0;c<n;c++) {
      if (r===0 && c===0) dp[c] = grid[0][0];
      else if (r===0) dp[c] = dp[c-1] + grid[r][c];
      else if (c===0) dp[c] = dp[c] + grid[r][c];
      else dp[c] = Math.min(dp[c], dp[c-1]) + grid[r][c];
    }
  }
  return dp[n-1];
}

// Tests
console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]])); // 7

module.exports = minPathSum;


