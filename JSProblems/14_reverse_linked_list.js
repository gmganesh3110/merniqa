/**
 * Problem 14: Reverse Linked List (Easy)
 * Iteratively reverse a singly linked list. For simplicity, reverse an array representing list values.
 * Time: O(n)  Space: O(1)
 */

function reverseArray(arr) {
  let i = 0, j = arr.length - 1;
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++; j--;
  }
  return arr;
}

// Tests
console.log(reverseArray([1,2,3,4,5])); // [5,4,3,2,1]
console.log(reverseArray([1])); // [1]

module.exports = reverseArray;


