/**
 * Problem 5: Valid Anagram (Easy)
 * Determine if t is an anagram of s.
 * Approach: frequency map.
 * Time: O(n)  Space: O(1) if alphabet limited, else O(k)
 */

function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);
  for (const ch of t) {
    const c = (freq.get(ch) || 0) - 1;
    if (c < 0) return false;
    freq.set(ch, c);
  }
  return true;
}

// Tests
console.log(isAnagram('anagram','nagaram')); // true
console.log(isAnagram('rat','car')); // false

module.exports = isAnagram;


