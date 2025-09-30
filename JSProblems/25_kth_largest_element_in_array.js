/**
 * Problem 25: Kth Largest Element in an Array (Medium)
 * Approach: Quickselect average O(n). Here we implement quickselect.
 */

function kthLargest(nums, k) {
  const target = nums.length - k;
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const p = partition(nums, lo, hi);
    if (p === target) return nums[p];
    if (p < target) lo = p + 1; else hi = p - 1;
  }
  return -1;
}

function partition(a, lo, hi) {
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] <= pivot) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}

// Tests
console.log(kthLargest([3,2,1,5,6,4], 2)); // 5
console.log(kthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4

module.exports = kthLargest;


