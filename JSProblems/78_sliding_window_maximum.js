/**
 * Problem 78: Sliding Window Maximum (Hard)
 * Return max in each window of size k.
 * Deque of indices with decreasing values.
 * Time: O(n)
 */

function maxSlidingWindow(nums, k) {
  const dq = []; // store indices
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && dq[0] <= i - k) dq.shift();
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
}

// Tests
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]

module.exports = maxSlidingWindow;


