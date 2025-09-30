/**
 * Problem 54: Evaluate Reverse Polish Notation (Medium)
 * Evaluate RPN expression tokens.
 * Time: O(n)  Space: O(n)
 */

function evalRPN(tokens) {
  const st = [];
  for (const t of tokens) {
    if (t === '+' || t === '-' || t === '*' || t === '/') {
      const b = st.pop(); const a = st.pop();
      let v;
      if (t === '+') v = a + b;
      else if (t === '-') v = a - b;
      else if (t === '*') v = a * b;
      else v = (a / b) | 0; // truncate towards zero in JS via bitwise
      st.push(v);
    } else st.push(Number(t));
  }
  return st.pop();
}

// Tests
console.log(evalRPN(["2","1","+","3","*"])); // 9
console.log(evalRPN(["4","13","5","/","+"])); // 6

module.exports = evalRPN;


