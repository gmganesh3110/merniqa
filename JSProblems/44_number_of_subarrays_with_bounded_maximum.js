/**
 * Problem 44: Number of Subarrays with Bounded Maximum (Medium)
 * Count subarrays where max in [L, R].
 * Trick: count subarrays with max <= R minus subarrays with max < L.
 * Time: O(n)  Space: O(1)
 */

function countSubarraysBoundedMax(nums, L, R) {
  const atMost = (K) => {
    let ans = 0, cur = 0;
    for (const x of nums) {
      cur = (x <= K) ? cur + 1 : 0;
      ans += cur;
    }
    return ans;
  };
  return atMost(R) - atMost(L - 1);
}

// Tests
console.log(countSubarraysBoundedMax([2,1,4,3], 2, 3)); // 3

module.exports = countSubarraysBoundedMax;


