/**
 * Problem 15: Min Stack (Easy)
 * Design a stack that supports push, pop, top, and retrieving the minimum element in O(1).
 */

class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(x) {
    this.stack.push(x);
    if (this.minStack.length === 0 || x <= this.getMin()) this.minStack.push(x);
  }
  pop() {
    const val = this.stack.pop();
    if (val === this.getMin()) this.minStack.pop();
    return val;
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// Tests
const ms = new MinStack();
ms.push(-2); ms.push(0); ms.push(-3);
console.log(ms.getMin()); // -3
ms.pop();
console.log(ms.top()); // 0
console.log(ms.getMin()); // -2

module.exports = MinStack;


