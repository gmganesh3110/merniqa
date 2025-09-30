/**
 * Problem 18: Implement Queue using Stacks (Easy)
 * Two stacks: inStack for pushes, outStack for pops/peeks.
 * Amortized O(1) operations.
 */

class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  push(x) { this.inStack.push(x); }
  _move() { if (!this.outStack.length) while (this.inStack.length) this.outStack.push(this.inStack.pop()); }
  pop() { this._move(); return this.outStack.pop(); }
  peek() { this._move(); return this.outStack[this.outStack.length-1]; }
  empty() { return this.inStack.length===0 && this.outStack.length===0; }
}

// Tests
const q = new MyQueue();
q.push(1); q.push(2);
console.log(q.peek()); // 1
console.log(q.pop()); // 1
console.log(q.empty()); // false

module.exports = MyQueue;


