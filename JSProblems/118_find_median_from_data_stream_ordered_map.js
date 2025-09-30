/**
 * Problem 118: Median from Data Stream (Ordered Map variant) (Hard)
 * Use balanced counts with two TreeMap-like objects; in JS emulate with sorted arrays and counts (educational).
 */

class OrderedMultiset{
  constructor(){ this.map=new Map(); this.arr=[]; this.size=0; }
  _bisect(x){ let l=0,r=this.arr.length; while(l<r){ const m=(l+r>>1); if(this.arr[m]<x) l=m+1; else r=m; } return l; }
  add(x){ if(!this.map.has(x)){ const i=this._bisect(x); this.arr.splice(i,0,x); this.map.set(x,0); } this.map.set(x,this.map.get(x)+1); this.size++; }
  remove(x){ if(!this.map.has(x)) return false; const c=this.map.get(x); if(c===1){ this.map.delete(x); const i=this._bisect(x); this.arr.splice(i,1); } else this.map.set(x,c-1); this.size--; return true; }
  first(){ return this.arr[0]; } last(){ return this.arr[this.arr.length-1]; }
  popFirst(){ const v=this.first(); this.remove(v); return v; } popLast(){ const v=this.last(); this.remove(v); return v; }
}

class MedianStream{
  constructor(){ this.left=new OrderedMultiset(); this.right=new OrderedMultiset(); }
  addNum(x){ if(!this.left.size||x<=this.left.last()) this.left.add(x); else this.right.add(x); this._rebalance(); }
  _rebalance(){ while(this.left.size>this.right.size+1) this.right.add(this.left.popLast()); while(this.right.size>this.left.size) this.left.add(this.right.popFirst()); }
  findMedian(){ if(this.left.size>this.right.size) return this.left.last(); return (this.left.last()+this.right.first())/2; }
}

// Tests
const ms=new MedianStream();
ms.addNum(1); ms.addNum(2); console.log(ms.findMedian()); // 1.5
ms.addNum(3); console.log(ms.findMedian()); // 2

module.exports = MedianStream;


