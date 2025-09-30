/**
 * Problem 29: Spiral Matrix (Medium)
 * Return all elements of a matrix in spiral order.
 * Time: O(mn)  Space: O(1) extra beyond output
 */

function spiralOrder(matrix) {
  const res = [];
  if (!matrix.length) return res;
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]); top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]); right--;
    if (top <= bottom) { for (let c = right; c >= left; c--) res.push(matrix[bottom][c]); bottom--; }
    if (left <= right) { for (let r = bottom; r >= top; r--) res.push(matrix[r][left]); left++; }
  }
  return res;
}

// Tests
console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]])); // [1,2,3,6,9,8,7,4,5]

module.exports = spiralOrder;


