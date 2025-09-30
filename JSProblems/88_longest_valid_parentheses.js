/**
 * Problem 88: Longest Valid Parentheses (Hard-)
 * Stack-based or DP approach; here stack approach.
 * Time: O(n)
 */

function longestValidParentheses(s) {
  let best = 0; const st = [-1];
  for (let i=0;i<s.length;i++) {
    if (s[i] === '(') st.push(i);
    else {
      st.pop();
      if (!st.length) st.push(i); else best = Math.max(best, i - st[st.length - 1]);
    }
  }
  return best;
}

// Tests
console.log(longestValidParentheses(')()())')); // 4

module.exports = longestValidParentheses;


