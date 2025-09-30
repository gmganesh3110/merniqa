/**
 * Problem 7: Maximum Subarray (Easy)
 * Find the contiguous subarray with the largest sum.
 * Approach: Kadane's algorithm.
 * Time: O(n)  Space: O(1)
 */

function maxSubArray(nums) {
  let best = -Infinity;
  let cur = 0;
  for (const x of nums) {
    cur = Math.max(x, cur + x);
    best = Math.max(best, cur);
  }
  return best;
}

// Tests
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
console.log(maxSubArray([1])); // 1

module.exports = maxSubArray;


