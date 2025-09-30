/**
 * Problem 109: Best Time to Buy and Sell Stock IV (Hard)
 * At most k transactions; DP optimizing to O(k*n).
 */

function maxProfitK(k, prices){
  const n=prices.length; if(!n||!k) return 0;
  if(k>=Math.floor(n/2)){
    let ans=0; for(let i=1;i<n;i++) if(prices[i]>prices[i-1]) ans+=prices[i]-prices[i-1]; return ans;
  }
  const buy=Array(k+1).fill(-Infinity), sell=Array(k+1).fill(0);
  for(const p of prices){
    for(let t=1;t<=k;t++){
      buy[t]=Math.max(buy[t], sell[t-1]-p);
      sell[t]=Math.max(sell[t], buy[t]+p);
    }
  }
  return sell[k];
}

// Tests
console.log(maxProfitK(2,[3,2,6,5,0,3])); // 7

module.exports = maxProfitK;


