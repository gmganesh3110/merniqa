/**
 * Problem 12: Intersection of Two Arrays II (Easy)
 * Return intersection elements accounting for multiplicity.
 * Approach: count smaller array, then consume with larger.
 * Time: O(n+m)  Space: O(min(n,m))
 */

function intersect(nums1, nums2) {
  if (nums1.length > nums2.length) return intersect(nums2, nums1);
  const count = new Map();
  for (const x of nums1) count.set(x, (count.get(x) || 0) + 1);
  const out = [];
  for (const y of nums2) {
    const c = (count.get(y) || 0);
    if (c > 0) {
      out.push(y);
      count.set(y, c - 1);
    }
  }
  return out;
}

// Tests
console.log(intersect([1,2,2,1],[2,2])); // [2,2]
console.log(intersect([4,9,5],[9,4,9,8,4])); // [9,4] or [4,9]

module.exports = intersect;


