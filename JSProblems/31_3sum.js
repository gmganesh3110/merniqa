/**
 * Problem 31: 3Sum (Medium)
 * Find all unique triplets that sum to zero.
 * Approach: sort + two-pointer sweep.
 * Time: O(n^2)  Space: O(1) extra beyond output
 */

function threeSum(nums) {
  nums.sort((a,b)=>a-b);
  const res = [];
  for (let i=0;i<nums.length;i++) {
    if (i>0 && nums[i]===nums[i-1]) continue;
    let l=i+1, r=nums.length-1;
    while (l<r) {
      const s = nums[i]+nums[l]+nums[r];
      if (s===0) {
        res.push([nums[i], nums[l], nums[r]]);
        l++; r--;
        while (l<r && nums[l]===nums[l-1]) l++;
        while (l<r && nums[r]===nums[r+1]) r--;
      } else if (s<0) l++; else r--;
    }
  }
  return res;
}

// Tests
console.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]

module.exports = threeSum;


