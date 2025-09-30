/**
 * Problem 51: Merge Intervals (Medium)
 * Merge all overlapping intervals.
 * Time: O(n log n)  Space: O(n)
 */

function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a,b)=>a[0]-b[0]);
  const res = [intervals[0].slice()];
  for (let i=1;i<intervals.length;i++) {
    const [s,e] = intervals[i];
    const last = res[res.length-1];
    if (s <= last[1]) last[1] = Math.max(last[1], e); else res.push([s,e]);
  }
  return res;
}

// Tests
console.log(merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]

module.exports = merge;


