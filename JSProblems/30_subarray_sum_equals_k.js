/**
 * Problem 30: Subarray Sum Equals K (Medium)
 * Count subarrays whose sum equals k.
 * Approach: prefix sums + hashmap of counts.
 * Time: O(n)  Space: O(n)
 */

function subarraySum(nums, k) {
  const count = new Map();
  count.set(0, 1);
  let sum = 0, ans = 0;
  for (const x of nums) {
    sum += x;
    ans += (count.get(sum - k) || 0);
    count.set(sum, (count.get(sum) || 0) + 1);
  }
  return ans;
}

// Tests
console.log(subarraySum([1,1,1], 2)); // 2
console.log(subarraySum([1,2,3], 3)); // 2

module.exports = subarraySum;


