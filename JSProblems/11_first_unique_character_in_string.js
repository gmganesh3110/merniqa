/**
 * Problem 11: First Unique Character in a String (Easy)
 * Return the index of the first non-repeating character; -1 if none.
 * Approach: frequency count then second pass.
 * Time: O(n)  Space: O(1) for ASCII
 */

function firstUniqChar(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) if (freq.get(s[i]) === 1) return i;
  return -1;
}

// Tests
console.log(firstUniqChar('leetcode')); // 0
console.log(firstUniqChar('loveleetcode')); // 2
console.log(firstUniqChar('aabb')); // -1

module.exports = firstUniqChar;


