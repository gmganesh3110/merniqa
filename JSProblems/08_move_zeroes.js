/**
 * Problem 8: Move Zeroes (Easy)
 * Move all zeros to the end while maintaining the relative order of non-zero elements.
 * Approach: Two-pointer write index.
 * Time: O(n)  Space: O(1)
 */

function moveZeroes(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      [nums[write], nums[read]] = [nums[read], nums[write]];
      write++;
    }
  }
  return nums;
}

// Tests
console.log(moveZeroes([0,1,0,3,12])); // [1,3,12,0,0]
console.log(moveZeroes([0])); // [0]

module.exports = moveZeroes;


