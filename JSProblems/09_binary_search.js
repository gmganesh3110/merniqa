/**
 * Problem 9: Binary Search (Easy)
 * Find target index in a sorted array; return -1 if not found.
 * Time: O(log n)  Space: O(1)
 */

function binarySearch(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}

// Tests
console.log(binarySearch([-1,0,3,5,9,12], 9)); // 4
console.log(binarySearch([-1,0,3,5,9,12], 2)); // -1

module.exports = binarySearch;


