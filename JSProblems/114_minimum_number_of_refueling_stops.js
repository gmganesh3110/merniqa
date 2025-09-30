/**
 * Problem 114: Minimum Number of Refueling Stops (Hard)
 * Greedy with max-heap: iterate stations by position, push fuel of stations we pass; refuel when needed.
 */

class MaxHeap { constructor(){ this.a=[]; } size(){ return this.a.length; } push(x){ this.a.push(x); this._up(this.a.length-1);} pop(){ const v=this.a[0]; const e=this.a.pop(); if(this.a.length){ this.a[0]=e; this._down(0);} return v;} _up(i){ const a=this.a; while(i){ const p=(i-1>>1); if(a[p]>=a[i])break; [a[p],a[i]]=[a[i],a[p]]; i=p;} } _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,s=i; if(l<a.length&&a[l]>a[s])s=l; if(r<a.length&&a[r]>a[s])s=r; if(s===i)break; [a[i],a[s]]=[a[s],a[i]]; i=s;} } }

function minRefuelStops(target, startFuel, stations){
  const heap=new MaxHeap(); let fuel=startFuel, i=0, stops=0;
  while (fuel < target){
    while (i<stations.length && stations[i][0] <= fuel){ heap.push(stations[i][1]); i++; }
    if (!heap.size()) return -1; fuel += heap.pop(); stops++;
  }
  return stops;
}

// Tests
console.log(minRefuelStops(100,10,[[10,60],[20,30],[30,30],[60,40]])); // 2

module.exports = minRefuelStops;


