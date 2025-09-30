/**
 * Problem 19: Minimum Size Subarray Sum (Medium-)
 * Given target and array nums of positive ints, return minimal length of a
 * contiguous subarray of which the sum ≥ target. If no such subarray, return 0.
 * Approach: Sliding window.
 * Time: O(n)  Space: O(1)
 */

function minSubArrayLen(target, nums) {
  let left = 0, sum = 0, best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left++];
    }
  }
  return isFinite(best) ? best : 0;
}

// Tests
console.log(minSubArrayLen(7, [2,3,1,2,4,3])); // 2 [4,3]
console.log(minSubArrayLen(4, [1,4,4])); // 1
console.log(minSubArrayLen(11, [1,1,1,1,1,1,1,1])); // 0

module.exports = minSubArrayLen;


