/**
 * Problem 2: Valid Parentheses (Easy)
 * Given a string s containing '()[]{}', determine if the input string is valid.
 * Valid if open brackets are closed by the same type and in correct order.
 *
 * Approach: Stack
 * - Push opening brackets. On closing, check stack top matches.
 * Time: O(n)  Space: O(n)
 */

function isValid(s) {
  const stack = [];
  const match = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== match[ch]) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}

// Tests
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true

module.exports = isValid;


