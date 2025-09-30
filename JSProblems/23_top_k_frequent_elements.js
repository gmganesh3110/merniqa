/**
 * Problem 23: Top K Frequent Elements (Medium)
 * Return the k most frequent elements.
 * Approach: frequency map + bucket sort.
 * Time: O(n) average  Space: O(n)
 */

function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
  const buckets = Array(nums.length + 1).fill(0).map(() => []);
  for (const [num, f] of freq.entries()) buckets[f].push(num);
  const out = [];
  for (let i = buckets.length - 1; i >= 0 && out.length < k; i--) {
    for (const v of buckets[i]) {
      out.push(v);
      if (out.length === k) break;
    }
  }
  return out;
}

// Tests
console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1,2]
console.log(topKFrequent([1], 1)); // [1]

module.exports = topKFrequent;


