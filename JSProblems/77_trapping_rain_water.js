/**
 * Problem 77: Trapping Rain Water (Hard-)
 * Two pointers with leftMax/rightMax.
 * Time: O(n)  Space: O(1)
 */

function trap(height) {
  let i=0, j=height.length-1, leftMax=0, rightMax=0, water=0;
  while (i<j) {
    if (height[i] < height[j]) {
      leftMax = Math.max(leftMax, height[i]);
      water += leftMax - height[i];
      i++;
    } else {
      rightMax = Math.max(rightMax, height[j]);
      water += rightMax - height[j];
      j--;
    }
  }
  return water;
}

// Tests
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6

module.exports = trap;


