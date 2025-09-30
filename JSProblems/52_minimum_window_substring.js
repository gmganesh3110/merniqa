/**
 * Problem 52: Minimum Window Substring (Upper-Medium)
 * Given s and t, return the minimum window in s which contains all chars of t.
 * Sliding window with counts.
 * Time: O(n)  Space: O(k)
 */

function minWindow(s, t) {
  if (!t.length || !s.length) return "";
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let required = need.size;
  let left = 0;
  let bestLen = Infinity, bestL = 0;
  const window = new Map();
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) required--;
    while (required === 0) {
      if (right - left + 1 < bestLen) { bestLen = right - left + 1; bestL = left; }
      const d = s[left++];
      window.set(d, window.get(d) - 1);
      if (need.has(d) && window.get(d) < need.get(d)) required++;
    }
  }
  return isFinite(bestLen) ? s.slice(bestL, bestL + bestLen) : "";
}

// Tests
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a")); // "a"
console.log(minWindow("a", "aa")); // ""

module.exports = minWindow;


