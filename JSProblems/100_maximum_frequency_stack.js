/**
 * Problem 100: Maximum Frequency Stack (Hard-)
 * Supports push/pop to pop most frequent element; tie-breaker by recency.
 * Approach: freq map + stacks per frequency.
 */

class FreqStack {
  constructor(){ this.freq=new Map(); this.group=new Map(); this.maxF=0; }
  push(x){ const f=(this.freq.get(x)||0)+1; this.freq.set(x,f); if(!this.group.has(f)) this.group.set(f,[]); this.group.get(f).push(x); if(f>this.maxF) this.maxF=f; }
  pop(){ const stack=this.group.get(this.maxF); const x=stack.pop(); this.freq.set(x,this.freq.get(x)-1); if(stack.length===0){ this.group.delete(this.maxF); this.maxF--; } return x; }
}

// Tests
const fs = new FreqStack();
fs.push(5); fs.push(7); fs.push(5); fs.push(7); fs.push(4); fs.push(5);
console.log(fs.pop()); // 5
console.log(fs.pop()); // 7
console.log(fs.pop()); // 5
console.log(fs.pop()); // 4

module.exports = FreqStack;


