/**
 * Problem 79: Merge k Sorted Lists (Hard)
 * Merge k sorted arrays (simulating lists) into one sorted array.
 * Approach: Min-heap on current heads.
 * Time: O(N log k)
 */

class MinHeap {
  constructor(){ this.a=[]; }
  size(){ return this.a.length; }
  push(x){ this.a.push(x); this._up(this.a.length-1); }
  pop(){ const v=this.a[0]; const e=this.a.pop(); if(this.a.length){ this.a[0]=e; this._down(0);} return v; }
  _up(i){ const a=this.a; while(i){ const p=(i-1>>1); if(a[p][0]<=a[i][0])break; [a[p],a[i]]=[a[i],a[p]]; i=p; } }
  _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,s=i; if(l<a.length&&a[l][0]<a[s][0])s=l; if(r<a.length&&a[r][0]<a[s][0])s=r; if(s===i)break; [a[i],a[s]]=[a[s],a[i]]; i=s; } }
}

function mergeKLists(lists) {
  const heap = new MinHeap();
  const idx = Array(lists.length).fill(0);
  for (let i=0;i<lists.length;i++) if (lists[i].length) heap.push([lists[i][0], i]);
  const out = [];
  while (heap.size()) {
    const [val, i] = heap.pop();
    out.push(val);
    idx[i]++;
    if (idx[i] < lists[i].length) heap.push([lists[i][idx[i]], i]);
  }
  return out;
}

// Tests
console.log(mergeKLists([[1,4,5],[1,3,4],[2,6]])); // [1,1,2,3,4,4,5,6]

module.exports = mergeKLists;


