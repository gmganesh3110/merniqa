/**
 * Problem 4: Best Time to Buy and Sell Stock (Easy)
 * Given prices[i], maximize profit by choosing one day to buy and one day to sell later.
 *
 * Approach: Track min price so far and max profit.
 * Time: O(n)  Space: O(1)
 */

function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    best = Math.max(best, p - minPrice);
  }
  return best;
}

// Tests
console.log(maxProfit([7,1,5,3,6,4])); // 5
console.log(maxProfit([7,6,4,3,1])); // 0

module.exports = maxProfit;


