/**
 * Problem 24: Product of Array Except Self (Medium)
 * Return array output where output[i] is product of all nums except nums[i]. No division.
 * Approach: prefix and suffix products.
 * Time: O(n)  Space: O(1) extra besides result
 */

function productExceptSelf(nums) {
  const n = nums.length;
  const out = Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    out[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= suffix;
    suffix *= nums[i];
  }
  return out;
}

// Tests
console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]

module.exports = productExceptSelf;


