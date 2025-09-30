/**
 * Problem 50: Longest Increasing Subsequence (Upper-Medium)
 * Return length of LIS.
 * Approach: patience sorting with tails + binary search.
 * Time: O(n log n)  Space: O(n)
 */

function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let i = 0, j = tails.length;
    while (i < j) {
      const m = (i + j) >> 1;
      if (tails[m] < x) i = m + 1; else j = m;
    }
    tails[i] = x;
  }
  return tails.length;
}

// Tests
console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // 4

module.exports = lengthOfLIS;


