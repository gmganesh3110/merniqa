/**
 * Problem 87: Minimum Window Containing All Distinct Chars of String (Hard-)
 * Find smallest window that contains all distinct characters of s.
 * Sliding window + target distinct count.
 */

function minWindowAllDistinct(s) {
  const needCount = new Set(s).size;
  const freq = new Map();
  let formed = 0, left = 0;
  let best = Infinity, bestL = 0;
  for (let right=0; right<s.length; right++) {
    const c = s[right];
    freq.set(c, (freq.get(c)||0)+1);
    if (freq.get(c) === 1) formed++;
    while (formed === needCount) {
      if (right-left+1 < best){ best=right-left+1; bestL=left; }
      const d = s[left++];
      freq.set(d, freq.get(d)-1);
      if (freq.get(d) === 0) formed--;
    }
  }
  return isFinite(best) ? s.slice(bestL,bestL+best) : "";
}

// Tests
console.log(minWindowAllDistinct('aabcbcdbca')); // 'dbca' or 'bcda'

module.exports = minWindowAllDistinct;


