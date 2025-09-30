/**
 * Problem 95: Maximum Sum Circular Subarray (Medium/Hard-)
 * Max of (normal Kadane) vs (total sum - min subarray, if not all negative).
 */

function maxSubarraySumCircular(nums) {
  let total=0, maxSum=-Infinity, curMax=0, minSum=Infinity, curMin=0;
  for (const x of nums){
    total += x;
    curMax = Math.max(x, curMax + x); maxSum = Math.max(maxSum, curMax);
    curMin = Math.min(x, curMin + x); minSum = Math.min(minSum, curMin);
  }
  if (maxSum < 0) return maxSum; // all negative
  return Math.max(maxSum, total - minSum);
}

// Tests
console.log(maxSubarraySumCircular([1,-2,3,-2])); // 3
console.log(maxSubarraySumCircular([5,-3,5])); // 10

module.exports = maxSubarraySumCircular;


