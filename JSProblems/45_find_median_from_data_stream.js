/**
 * Problem 45: Find Median from Data Stream (Upper-Medium)
 * Maintain two heaps: max-heap (lower half) and min-heap (upper half).
 * In JS, implement heaps via arrays with helper functions.
 */

class MinHeap {
  constructor() { this.a = []; }
  size() { return this.a.length; }
  peek() { return this.a[0]; }
  push(x) { this.a.push(x); this._up(this.a.length - 1); }
  pop() { const v=this.a[0]; const e=this.a.pop(); if (this.a.length){ this.a[0]=e; this._down(0);} return v; }
  _up(i){ const a=this.a; while(i){ const p=(i-1>>1); if(a[p]<=a[i])break; [a[p],a[i]]=[a[i],a[p]]; i=p; } }
  _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,s=i; if(l<a.length&&a[l]<a[s])s=l; if(r<a.length&&a[r]<a[s])s=r; if(s===i)break; [a[i],a[s]]=[a[s],a[i]]; i=s; } }
}

class MaxHeap extends MinHeap {
  _up(i){ const a=this.a; while(i){ const p=(i-1>>1); if(a[p]>=a[i])break; [a[p],a[i]]=[a[i],a[p]]; i=p; } }
  _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,s=i; if(l<a.length&&a[l]>a[s])s=l; if(r<a.length&&a[r]>a[s])s=r; if(s===i)break; [a[i],a[s]]=[a[s],a[i]]; i=s; } }
}

class MedianFinder {
  constructor(){ this.low = new MaxHeap(); this.high = new MinHeap(); }
  addNum(num){
    if (!this.low.size() || num <= this.low.peek()) this.low.push(num); else this.high.push(num);
    if (this.low.size() > this.high.size() + 1) this.high.push(this.low.pop());
    if (this.high.size() > this.low.size()) this.low.push(this.high.pop());
  }
  findMedian(){
    if (this.low.size() > this.high.size()) return this.low.peek();
    return (this.low.peek() + this.high.peek()) / 2;
  }
}

// Tests
const mf = new MedianFinder();
mf.addNum(1); mf.addNum(2); console.log(mf.findMedian()); // 1.5
mf.addNum(3); console.log(mf.findMedian()); // 2

module.exports = MedianFinder;


