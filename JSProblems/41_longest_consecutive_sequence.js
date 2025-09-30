/**
 * Problem 41: Longest Consecutive Sequence (Medium)
 * Find length of longest consecutive elements sequence.
 * Approach: Hash set; start only at sequence starts.
 * Time: O(n)  Space: O(n)
 */

function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const x of set) {
    if (!set.has(x - 1)) { // start
      let cur = x;
      let len = 1;
      while (set.has(cur + 1)) { cur++; len++; }
      if (len > best) best = len;
    }
  }
  return best;
}

// Tests
console.log(longestConsecutive([100,4,200,1,3,2])); // 4

module.exports = longestConsecutive;


