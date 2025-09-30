/**
 * Problem 57: Palindromic Substrings (Medium)
 * Count palindromic substrings.
 * Approach: expand around centers.
 * Time: O(n^2)
 */

function countSubstrings(s) {
  let count = 0;
  const expand = (l, r) => { while (l>=0 && r<s.length && s[l]===s[r]) { count++; l--; r++; } };
  for (let i=0;i<s.length;i++) { expand(i,i); expand(i,i+1); }
  return count;
}

// Tests
console.log(countSubstrings('abc')); // 3
console.log(countSubstrings('aaa')); // 6

module.exports = countSubstrings;


