/**
 * Problem 70: Unique Paths II (Medium)
 * Grid with obstacles (1). Count unique paths from top-left to bottom-right.
 * DP 1D with obstacle checks.
 */

function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length, n = obstacleGrid[0].length;
  const dp = Array(n).fill(0);
  dp[0] = obstacleGrid[0][0] === 0 ? 1 : 0;
  for (let r=0;r<m;r++) {
    for (let c=0;c<n;c++) {
      if (obstacleGrid[r][c] === 1) dp[c] = 0;
      else if (c>0) dp[c] += dp[c-1];
    }
  }
  return dp[n-1];
}

// Tests
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])); // 2

module.exports = uniquePathsWithObstacles;


