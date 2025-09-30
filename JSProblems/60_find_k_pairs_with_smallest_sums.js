/**
 * Problem 60: Find K Pairs with Smallest Sums (Upper-Medium)
 * Given two sorted arrays, return k pairs with smallest sums.
 * Approach: min-heap seeded with (i,0) for small i; push (i,j+1) as we pop.
 */

class MinHeap {
  constructor(){ this.a=[]; }
  size(){ return this.a.length; }
  push(x){ this.a.push(x); this._up(this.a.length-1); }
  pop(){ const v=this.a[0]; const e=this.a.pop(); if(this.a.length){ this.a[0]=e; this._down(0);} return v; }
  _up(i){ const a=this.a; while(i){ const p=(i-1>>1); if(a[p][0]<=a[i][0])break; [a[p],a[i]]=[a[i],a[p]]; i=p; } }
  _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,s=i; if(l<a.length&&a[l][0]<a[s][0])s=l; if(r<a.length&&a[r][0]<a[s][0])s=r; if(s===i)break; [a[i],a[s]]=[a[s],a[i]]; i=s; } }
}

function kSmallestPairs(nums1, nums2, k) {
  const res = [];
  if (!nums1.length || !nums2.length || k<=0) return res;
  const heap = new MinHeap();
  const n1 = Math.min(nums1.length, k);
  for (let i=0;i<n1;i++) heap.push([nums1[i]+nums2[0], i, 0]);
  while (k-- > 0 && heap.size()) {
    const [sum, i, j] = heap.pop();
    res.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) heap.push([nums1[i]+nums2[j+1], i, j+1]);
  }
  return res;
}

// Tests
console.log(kSmallestPairs([1,7,11],[2,4,6],3)); // [[1,2],[1,4],[1,6]]

module.exports = kSmallestPairs;


