/**
 * Problem 13: Plus One (Easy)
 * Given an array of digits representing a non-negative integer, increment by one.
 * Time: O(n)  Space: O(1) or O(n) if carry grows
 */

function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) { digits[i]++; return digits; }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
}

// Tests
console.log(plusOne([1,2,3])); // [1,2,4]
console.log(plusOne([9,9,9])); // [1,0,0,0]

module.exports = plusOne;


