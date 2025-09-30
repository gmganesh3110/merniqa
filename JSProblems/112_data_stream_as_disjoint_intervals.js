/**
 * Problem 112: Data Stream as Disjoint Intervals (Hard)
 * Add numbers from a stream and return disjoint intervals. Use ordered map (TreeMap-like).
 * In JS, use Map + manual neighbor checks with an ordered structure via array of keys; here simple Map+Array approach.
 */

class SummaryRanges {
  constructor(){ this.map=new Map(); this.keys=[]; }
  addNum(val){
    if(this.map.has(val)) return;
    this.map.set(val, val);
    // maintain sorted keys
    let i = this._bisect(val);
    this.keys.splice(i,0,val);
  }
  _bisect(x){ let l=0,r=this.keys.length; while(l<r){ const m=(l+r>>1); if(this.keys[m]<x) l=m+1; else r=m; } return l; }
  getIntervals(){
    const res=[]; if(!this.keys.length) return res;
    let s=this.keys[0], e=this.keys[0];
    for(let i=1;i<this.keys.length;i++){
      const v=this.keys[i];
      if(v===e+1) e=v; else { res.push([s,e]); s=e=v; }
    }
    res.push([s,e]); return res;
  }
}

// Tests
const sr=new SummaryRanges();
sr.addNum(1); console.log(sr.getIntervals()); // [[1,1]]
sr.addNum(3); console.log(sr.getIntervals()); // [[1,1],[3,3]]
sr.addNum(7); sr.addNum(2); console.log(sr.getIntervals()); // [[1,3],[7,7]]
sr.addNum(6); console.log(sr.getIntervals()); // [[1,3],[6,7]]

module.exports = SummaryRanges;


