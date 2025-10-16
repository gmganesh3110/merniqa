// Write a function to reverse a string
// approach 1
// time complexity: O(n)
// space complexity: O(1)

// pseudo code
// 1. initialize a variable to 0
// 2. iterate through the array
// 3. if the current element is not equal to the value, then increment the variable
// 4. return the variable
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let temp = arr[right];

    arr[right] = arr[left];

    arr[left] = temp;

    right--;
    left++;
  }

  return arr;
};

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let len = s.length;
  let halfLen = Math.floor(len / 2);
  for (let i = 0; i < halfLen; i++) {
    let swap = s[i];
    s[i] = s[len - i - 1];
    s[len - i - 1] = swap;
  }
  return s;
};

console.log(reverseString(["h", "e", "l", "l", "o"]));
console.log(reverseString(["h", "e", "l", "l", "o"]));
