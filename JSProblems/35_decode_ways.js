/**
 * Problem 35: Decode Ways (Medium)
 * Given a string s containing only digits, return the number of ways to decode it (A=1..Z=26).
 * Approach: DP where dp[i] = ways for prefix length i.
 * Time: O(n)  Space: O(1) with rolling variables
 */

function numDecodings(s) {
  if (!s.length || s[0] === '0') return 0;
  let prev2 = 1; // dp[0]
  let prev1 = 1; // dp[1]
  for (let i = 1; i < s.length; i++) {
    let cur = 0;
    if (s[i] !== '0') cur += prev1; // single
    const two = parseInt(s.slice(i-1, i+1), 10);
    if (two >= 10 && two <= 26) cur += prev2; // pair
    prev2 = prev1;
    prev1 = cur;
    if (prev1 === 0) return 0; // early exit if impossible
  }
  return prev1;
}

// Tests
console.log(numDecodings("12")); // 2
console.log(numDecodings("226")); // 3
console.log(numDecodings("06")); // 0

module.exports = numDecodings;


