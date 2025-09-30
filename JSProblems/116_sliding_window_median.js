/**
 * Problem 116: Sliding Window Median (Hard)
 * Two heaps with lazy deletion maps to support window slide.
 */

class MaxHeap { constructor(){ this.a=[]; } size(){ return this.a.length; } peek(){ return this.a[0]; } push(x){ this.a.push(x); this._up(this.a.length-1);} pop(){ const v=this.a[0]; const e=this.a.pop(); if(this.a.length){ this.a[0]=e; this._down(0);} return v;} _up(i){ const a=this.a; while(i){ const p=(i-1>>1); if(a[p]>=a[i])break; [a[p],a[i]]=[a[i],a[p]]; i=p;} } _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,s=i; if(l<a.length&&a[l]>a[s])s=l; if(r<a.length&&a[r]>a[s])s=r; if(s===i)break; [a[i],a[s]]=[a[s],a[i]]; i=s;} } }
class MinHeap { constructor(){ this.a=[]; } size(){ return this.a.length; } peek(){ return this.a[0]; } push(x){ this.a.push(x); this._up(this.a.length-1);} pop(){ const v=this.a[0]; const e=this.a.pop(); if(this.a.length){ this.a[0]=e; this._down(0);} return v;} _up(i){ const a=this.a; while(i){ const p=(i-1>>1); if(a[p]<=a[i])break; [a[p],a[i]]=[a[i],a[p]]; i=p;} } _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,s=i; if(l<a.length&&a[l]<a[s])s=l; if(r<a.length&&a[r]<a[s])s=r; if(s===i)break; [a[i],a[s]]=[a[s],a[i]]; i=s;} } }

function medianSlidingWindow(nums, k){
  const small=new MaxHeap(), large=new MinHeap();
  const delayed=new Map(); let smallSize=0, largeSize=0;
  const res=[];
  const add=(x)=>{
    if (!small.size() || x <= small.peek()) { small.push(x); smallSize++; } else { large.push(x); largeSize++; }
    rebalance();
  };
  const remove=(x)=>{
    // mark delayed
    delayed.set(x,(delayed.get(x)||0)+1);
    if (small.size() && x <= small.peek()) smallSize--; else largeSize--;
    prune(small); prune(large); rebalance();
  };
  const prune=(heap)=>{
    while (heap.size()){
      const x=heap.peek(); const cnt=delayed.get(x)||0;
      if (!cnt) break; heap.pop(); delayed.set(x,cnt-1); if(delayed.get(x)===0) delayed.delete(x);
    }
  };
  const rebalance=()=>{
    if (smallSize > largeSize + 1){ large.push(small.pop()); smallSize--; largeSize++; prune(small); }
    else if (largeSize > smallSize){ small.push(large.pop()); largeSize--; smallSize++; prune(large); }
  };
  const getMedian=()=> k%2? small.peek() : (small.peek()+large.peek())/2;
  for (let i=0;i<nums.length;i++){
    add(nums[i]);
    if (i>=k-1){ res.push(getMedian()); remove(nums[i-k+1]); }
  }
  return res;
}

// Tests
console.log(medianSlidingWindow([1,3,-1,-3,5,3,6,7],3)); // [1,-1,-1,3,5,6]

module.exports = medianSlidingWindow;


