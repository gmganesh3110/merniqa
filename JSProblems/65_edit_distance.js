/**
 * Problem 65: Edit Distance (Hard-)
 * Minimum operations to convert word1 to word2 (insert, delete, replace).
 * DP: classic Levenshtein.
 * Time: O(mn)  Space: O(min(m,n)) optimized
 */

function minDistance(word1, word2) {
  if (word1.length < word2.length) return minDistance(word2, word1);
  const n = word2.length;
  const dp = Array(n + 1).fill(0);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= word1.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      if (word1[i - 1] === word2[j - 1]) dp[j] = prev;
      else dp[j] = 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[n];
}

// Tests
console.log(minDistance('horse','ros')); // 3
console.log(minDistance('intention','execution')); // 5

module.exports = minDistance;


