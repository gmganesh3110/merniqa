/**
 * Problem 89: Burst Balloons (Hard)
 * Max coins by bursting balloons optimally.
 * DP on intervals: dp[l][r] = max coins for (l,r) open interval, try last k in (l,r).
 * Time: O(n^3)
 */

function maxCoins(nums) {
  const a = [1, ...nums.filter(x=>x>0), 1];
  const n = a.length;
  const dp = Array.from({length:n},()=>Array(n).fill(0));
  for (let len=2; len<n; len++) {
    for (let l=0; l+len<n; l++) {
      const r = l + len;
      let best = 0;
      for (let k=l+1; k<r; k++) best = Math.max(best, a[l]*a[k]*a[r] + dp[l][k] + dp[k][r]);
      dp[l][r] = best;
    }
  }
  return dp[0][n-1];
}

// Tests
console.log(maxCoins([3,1,5,8])); // 167

module.exports = maxCoins;


