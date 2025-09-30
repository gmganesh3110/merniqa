/**
 * Problem 119: Jump Game VI (Hard)
 * Max score from index 0, can jump 1..k steps; DP with deque of best candidates.
 * Time: O(n)
 */

function maxResult(nums, k){
  const n=nums.length; const dp=Array(n).fill(0); dp[0]=nums[0];
  const dq=[0];
  for(let i=1;i<n;i++){
    while(dq.length && dq[0] < i-k) dq.shift();
    dp[i] = nums[i] + dp[dq[0]];
    while(dq.length && dp[dq[dq.length-1]] <= dp[i]) dq.pop();
    dq.push(i);
  }
  return dp[n-1];
}

// Tests
console.log(maxResult([1,-1,-2,4,-7,3], 2)); // 7

module.exports = maxResult;


