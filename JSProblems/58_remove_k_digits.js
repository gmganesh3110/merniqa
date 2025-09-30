/**
 * Problem 58: Remove K Digits (Upper-Medium)
 * Remove k digits to form the smallest number.
 * Monotonic stack of digits; strip leading zeros.
 * Time: O(n)
 */

function removeKdigits(num, k) {
  const st = [];
  for (const d of num) {
    while (k > 0 && st.length && st[st.length-1] > d) { st.pop(); k--; }
    st.push(d);
  }
  while (k > 0) { st.pop(); k--; }
  // remove leading zeros
  let i = 0; while (i < st.length && st[i] === '0') i++;
  const ans = st.slice(i).join('');
  return ans.length ? ans : '0';
}

// Tests
console.log(removeKdigits('1432219', 3)); // '1219'
console.log(removeKdigits('10200', 1)); // '200'
console.log(removeKdigits('10', 2)); // '0'

module.exports = removeKdigits;


