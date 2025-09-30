/**
 * Problem 120: Maximum Sum of 3 Non-Overlapping Subarrays (Hard)
 * Precompute window sums; best left and right positions; scan middle.
 */

function maxSumOfThreeSubarrays(nums, k){
  const n=nums.length; const w=[]; let sum=0;
  for(let i=0;i<n;i++){ sum+=nums[i]; if(i>=k) sum-=nums[i-k]; if(i>=k-1) w.push(sum); }
  const m=w.length;
  const left=Array(m).fill(0); let best=0; for(let i=0;i<m;i++){ if(w[i]>w[best]) best=i; left[i]=best; }
  const right=Array(m).fill(0); best=m-1; for(let i=m-1;i>=0;i--){ if(w[i]>=w[best]) best=i; right[i]=best; }
  let ans=[-1,-1,-1]; let bestSum=-Infinity;
  for(let mid=k; mid<m-k; mid++){
    const l=left[mid-k], r=right[mid+k]; const cur=w[l]+w[mid]+w[r];
    if(cur>bestSum){ bestSum=cur; ans=[l,mid,r]; }
  }
  return ans;
}

// Tests
console.log(maxSumOfThreeSubarrays([1,2,1,2,6,7,5,1],2)); // [0,3,5]

module.exports = maxSumOfThreeSubarrays;


