/**
 * Problem 10: Valid Palindrome (Easy)
 * Given a string, determine if it is a palindrome, considering only alphanumerics and ignoring cases.
 * Approach: Two pointers; filter on the fly.
 * Time: O(n)  Space: O(1)
 */

function isPalindrome(s) {
  let i = 0, j = s.length - 1;
  const isAlphaNum = (c) => /[a-z0-9]/i.test(c);
  while (i < j) {
    while (i < j && !isAlphaNum(s[i])) i++;
    while (i < j && !isAlphaNum(s[j])) j--;
    if (i < j && s[i].toLowerCase() !== s[j].toLowerCase()) return false;
    i++; j--;
  }
  return true;
}

// Tests
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false

module.exports = isPalindrome;


