/**
 * Problem 6: Contains Duplicate (Easy)
 * Return true if any value appears at least twice.
 * Approach: Hash set.
 * Time: O(n)  Space: O(n)
 */

function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}

// Tests
console.log(containsDuplicate([1,2,3,1])); // true
console.log(containsDuplicate([1,2,3,4])); // false

module.exports = containsDuplicate;


