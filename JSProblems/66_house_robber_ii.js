/**
 * Problem 66: House Robber II (Medium)
 * Houses in a circle; cannot rob adjacent. Max sum.
 * Approach: rob linear on [0..n-2] and [1..n-1], take max.
 */

function rob(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  const robLinear = (l, r) => {
    let prev2 = 0, prev1 = 0;
    for (let i = l; i <= r; i++) {
      const cur = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1; prev1 = cur;
    }
    return prev1;
  };
  return Math.max(robLinear(0, n-2), robLinear(1, n-1));
}

// Tests
console.log(rob([2,3,2])); // 3
console.log(rob([1,2,3,1])); // 4

module.exports = rob;


