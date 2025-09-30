/**
 * Problem 36: Coin Change (Medium)
 * Given coins and amount, return fewest coins to make amount; -1 if impossible.
 * Approach: DP bottom-up.
 * Time: O(amount * coins)  Space: O(amount)
 */

function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const c of coins) {
    for (let x = c; x <= amount; x++) {
      dp[x] = Math.min(dp[x], dp[x - c] + 1);
    }
  }
  return isFinite(dp[amount]) ? dp[amount] : -1;
}

// Tests
console.log(coinChange([1,2,5], 11)); // 3
console.log(coinChange([2], 3)); // -1

module.exports = coinChange;


