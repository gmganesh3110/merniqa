/**
 * Problem 28: Rotate Image (Medium)
 * Rotate n x n matrix by 90 degrees in-place.
 * Approach: transpose then reverse rows.
 * Time: O(n^2)  Space: O(1)
 */

function rotate(matrix) {
  const n = matrix.length;
  // transpose
  for (let i=0;i<n;i++) for (let j=i+1;j<n;j++) {
    [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
  }
  // reverse each row
  for (let i=0;i<n;i++) matrix[i].reverse();
  return matrix;
}

// Tests
console.log(rotate([[1,2,3],[4,5,6],[7,8,9]])); // [[7,4,1],[8,5,2],[9,6,3]]

module.exports = rotate;


