/**
 * Problem 94: Min Stack (One-Stack Variant) (Medium)
 * Store pairs [value, currentMin] to achieve O(1) getMin with one array.
 */

class MinStackOne {
  constructor(){ this.st=[]; }
  push(x){ const curMin = this.st.length? Math.min(this.st[this.st.length-1][1], x) : x; this.st.push([x, curMin]); }
  pop(){ return this.st.pop()[0]; }
  top(){ return this.st[this.st.length-1][0]; }
  getMin(){ return this.st[this.st.length-1][1]; }
}

// Tests
const ms = new MinStackOne();
ms.push(2); ms.push(0); ms.push(3); ms.push(0);
console.log(ms.getMin()); // 0
ms.pop(); console.log(ms.getMin()); // 0
ms.pop(); console.log(ms.getMin()); // 0
ms.pop(); console.log(ms.getMin()); // 2

module.exports = MinStackOne;


