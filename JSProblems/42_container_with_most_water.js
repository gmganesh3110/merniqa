/**
 * Problem 42: Container With Most Water (Medium)
 * Two pointers from ends; move the shorter line inward.
 * Time: O(n)
 */

function maxArea(height) {
  let i = 0, j = height.length - 1, best = 0;
  while (i < j) {
    best = Math.max(best, Math.min(height[i], height[j]) * (j - i));
    if (height[i] < height[j]) i++; else j--;
  }
  return best;
}

// Tests
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49

module.exports = maxArea;


