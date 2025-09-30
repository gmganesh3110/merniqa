/**
 * Problem 72: Find First and Last Position of Element in Sorted Array (Medium)
 * Binary search lower_bound and upper_bound-1.
 * Time: O(log n)
 */

function searchRange(nums, target) {
  const lower = (x) => { let l=0,r=nums.length; while(l<r){ const m=(l+r>>1); if(nums[m]<x) l=m+1; else r=m; } return l; };
  const left = lower(target);
  if (left === nums.length || nums[left] !== target) return [-1,-1];
  const right = lower(target + 1) - 1;
  return [left, right];
}

// Tests
console.log(searchRange([5,7,7,8,8,10],8)); // [3,4]
console.log(searchRange([5,7,7,8,8,10],6)); // [-1,-1]

module.exports = searchRange;


