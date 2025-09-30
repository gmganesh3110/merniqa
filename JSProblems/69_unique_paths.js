/**
 * Problem 69: Unique Paths (Medium)
 * m x n grid, move only right or down; count unique paths.
 * DP 1D.
 */

function uniquePaths(m, n) {
  const dp = Array(n).fill(1);
  for (let r=1;r<m;r++) for (let c=1;c<n;c++) dp[c] += dp[c-1];
  return dp[n-1];
}

// Tests
console.log(uniquePaths(3,7)); // 28

module.exports = uniquePaths;


