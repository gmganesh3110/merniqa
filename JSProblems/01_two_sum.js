/**
 * Problem 1: Two Sum (Easy)
 *
 * Given an array of integers nums and an integer target, return indices of the two numbers
 * such that they add up to target. Assume exactly one solution, and you may not use the same element twice.
 *
 * Approach
 * - Use a hash map to store value -> index while iterating.
 * - For each number x at index i, check if (target - x) is already in the map.
 * - If yes, return [map.get(target - x), i]. Otherwise, put x -> i into the map.
 * Time: O(n)  Space: O(n)
 * Edge cases: negatives, zeros, duplicates, any order.
 */

function twoSum(nums, target) {
  const valueToIndex = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (valueToIndex.has(complement)) {
      return [valueToIndex.get(complement), i];
    }
    valueToIndex.set(nums[i], i);
  }
  return [-1, -1];
}

// Tests
console.log(twoSum([2, 7, 11, 15], 9)); // [0,1]
console.log(twoSum([3, 2, 4], 6)); // [1,2]
console.log(twoSum([3, 3], 6)); // [0,1]

module.exports = twoSum;


