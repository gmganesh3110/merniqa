/**
 * Problem 37: Word Break (Medium)
 * Return true if s can be segmented into dictionary words.
 * Approach: DP over prefix; dp[i] true if exists j<i with dp[j] and s[j..i) in dict.
 * Time: O(n^2)  Space: O(n)
 */

function wordBreak(s, wordDict) {
  const dict = new Set(wordDict);
  const n = s.length;
  const dp = Array(n + 1).fill(false); dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dict.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[n];
}

// Tests
console.log(wordBreak("leetcode", ["leet","code"])); // true
console.log(wordBreak("applepenapple", ["apple","pen"])); // true
console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"])); // false

module.exports = wordBreak;


