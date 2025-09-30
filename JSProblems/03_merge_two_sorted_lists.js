/**
 * Problem 3: Merge Two Sorted Lists (Easy)
 * Merge two sorted linked lists and return it as a sorted list.
 * Here we use arrays to simulate for simplicity and return merged array.
 *
 * Approach: Two pointers
 * Time: O(n+m)  Space: O(1) extra beyond output
 */

function mergeTwoSortedArrays(a, b) {
  let i = 0, j = 0;
  const out = [];
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out.push(a[i++]);
    else out.push(b[j++]);
  }
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}

// Tests
console.log(mergeTwoSortedArrays([1,3,5], [2,4,6])); // [1,2,3,4,5,6]
console.log(mergeTwoSortedArrays([], [0])); // [0]

module.exports = mergeTwoSortedArrays;


