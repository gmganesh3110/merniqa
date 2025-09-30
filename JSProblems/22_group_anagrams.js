/**
 * Problem 22: Group Anagrams (Medium)
 * Group strings that are anagrams.
 * Approach: key by sorted letters or 26-count signature.
 * Time: O(n k log k) with sort  Space: O(nk)
 */

function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}

// Tests
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));

module.exports = groupAnagrams;


