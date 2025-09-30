/**
 * Problem 93: Maximum Product Subarray (Medium/Hard-)
 * Track current max and min (due to negatives) while scanning.
 * Time: O(n)
 */

function maxProduct(nums) {
  let curMax = nums[0], curMin = nums[0], best = nums[0];
  for (let i=1;i<nums.length;i++){
    const x = nums[i];
    if (x < 0) [curMax, curMin] = [curMin, curMax];
    curMax = Math.max(x, curMax * x);
    curMin = Math.min(x, curMin * x);
    best = Math.max(best, curMax);
  }
  return best;
}

// Tests
console.log(maxProduct([2,3,-2,4])); // 6
console.log(maxProduct([-2,0,-1])); // 0

module.exports = maxProduct;


