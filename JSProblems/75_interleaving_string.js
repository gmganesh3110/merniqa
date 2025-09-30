/**
 * Problem 75: Interleaving String (Upper-Medium)
 * Determine if s3 is formed by interleaving s1 and s2.
 * DP: dp[i][j] true if s1[0..i) and s2[0..j) can form s3[0..i+j).
 */

function isInterleave(s1, s2, s3) {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = Array(n+1).fill(false);
  dp[0] = true;
  for (let j=1;j<=n;j++) dp[j] = dp[j-1] && s2[j-1] === s3[j-1];
  for (let i=1;i<=m;i++) {
    dp[0] = dp[0] && s1[i-1] === s3[i-1];
    for (let j=1;j<=n;j++) {
      dp[j] = (dp[j] && s1[i-1] === s3[i+j-1]) || (dp[j-1] && s2[j-1] === s3[i+j-1]);
    }
  }
  return dp[n];
}

// Tests
console.log(isInterleave('aabcc','dbbca','aadbbcbcac')); // true
console.log(isInterleave('aabcc','dbbca','aadbbbaccc')); // false

module.exports = isInterleave;


