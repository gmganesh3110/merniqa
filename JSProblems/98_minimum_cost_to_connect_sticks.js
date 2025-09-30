/**
 * Problem 98: Minimum Cost to Connect Sticks (Medium)
 * Always connect two smallest first -> min-heap.
 */

class MinHeap { constructor(){ this.a=[]; } size(){ return this.a.length; } push(x){ this.a.push(x); this._up(this.a.length-1);} pop(){ const v=this.a[0]; const e=this.a.pop(); if(this.a.length){ this.a[0]=e; this._down(0);} return v;} _up(i){ const a=this.a; while(i){ const p=(i-1>>1); if(a[p]<=a[i])break; [a[p],a[i]]=[a[i],a[p]]; i=p;} } _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,s=i; if(l<a.length&&a[l]<a[s])s=l; if(r<a.length&&a[r]<a[s])s=r; if(s===i)break; [a[i],a[s]]=[a[s],a[i]]; i=s;} } }

function connectSticks(sticks){
  if (sticks.length <= 1) return 0;
  const heap = new MinHeap();
  for (const s of sticks) heap.push(s);
  let cost = 0;
  while (heap.size() > 1){
    const a = heap.pop(), b = heap.pop();
    cost += a + b; heap.push(a + b);
  }
  return cost;
}

// Tests
console.log(connectSticks([2,4,3])); // 14

module.exports = connectSticks;


