/**
 * Problem 59: Number of Longest Increasing Subsequence (Upper-Medium)
 * Return how many LIS exist.
 * DP: lengths and counts.
 * Time: O(n^2)
 */

function findNumberOfLIS(nums) {
  const n = nums.length;
  if (!n) return 0;
  const len = Array(n).fill(1);
  const cnt = Array(n).fill(1);
  let best = 1;
  for (let i=0;i<n;i++) {
    for (let j=0;j<i;j++) if (nums[j] < nums[i]) {
      if (len[j] + 1 > len[i]) { len[i] = len[j] + 1; cnt[i] = cnt[j]; }
      else if (len[j] + 1 === len[i]) { cnt[i] += cnt[j]; }
    }
    best = Math.max(best, len[i]);
  }
  let ans = 0; for (let i=0;i<n;i++) if (len[i]===best) ans += cnt[i];
  return ans;
}

// Tests
console.log(findNumberOfLIS([1,3,5,4,7])); // 2
console.log(findNumberOfLIS([2,2,2,2,2])); // 5

module.exports = findNumberOfLIS;


