/**
 * Problem 96: Minimum Number of Arrows to Burst Balloons (Medium)
 * Greedy by sorting intervals by end and selecting non-overlapping.
 */

function findMinArrowShots(points) {
  if (!points.length) return 0;
  points.sort((a,b)=>a[1]-b[1]);
  let arrows = 1; let end = points[0][1];
  for (let i=1;i<points.length;i++){
    if (points[i][0] > end) { arrows++; end = points[i][1]; }
  }
  return arrows;
}

// Tests
console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])); // 2

module.exports = findMinArrowShots;


