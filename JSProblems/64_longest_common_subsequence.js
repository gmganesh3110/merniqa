/**
 * Problem 64: Longest Common Subsequence (Medium)
 * DP table.
 * Time: O(mn)  Space: O(mn) (can be optimized to O(min(m,n)))
 */

function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({length:m+1},()=>Array(n+1).fill(0));
  for (let i=1;i<=m;i++) {
    for (let j=1;j<=n;j++) {
      if (text1[i-1] === text2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}

// Tests
console.log(longestCommonSubsequence('abcde','ace')); // 3
console.log(longestCommonSubsequence('abc','abc')); // 3
console.log(longestCommonSubsequence('abc','def')); // 0

module.exports = longestCommonSubsequence;


