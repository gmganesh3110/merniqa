/**
 * Problem 122: Minimum Cost to Split Array (Hard)
 * Given nums and cost c, split nums into groups; each group's cost is c + number of duplicates inside.
 * Min total cost. DP with frequency map reset per start index; O(n^2).
 */

function minCost(nums, c){
  const n=nums.length; const dp=Array(n+1).fill(Infinity); dp[n]=0;
  for(let i=n-1;i>=0;i--){
    const freq=new Map(); let dup=0;
    for(let j=i;j<n;j++){
      const x=nums[j];
      const cnt=(freq.get(x)||0)+1; freq.set(x,cnt);
      if(cnt===2) dup+=2; else if(cnt>2) dup+=1;
      dp[i]=Math.min(dp[i], c + dup + dp[j+1]);
    }
  }
  return dp[0];
}

// Tests
console.log(minCost([1,2,1,2,1,3,3], 2)); // example-like

module.exports = minCost;


