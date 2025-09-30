/**
 * Problem 39: Set Matrix Zeroes (Medium)
 * If an element is 0, set its entire row and column to 0 in-place.
 * Approach: first row/col markers to achieve O(1) extra space.
 */

function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let firstRowZero = false, firstColZero = false;
  for (let r=0;r<m;r++) if (matrix[r][0]===0) firstColZero = true;
  for (let c=0;c<n;c++) if (matrix[0][c]===0) firstRowZero = true;
  for (let r=1;r<m;r++) for (let c=1;c<n;c++) if (matrix[r][c]===0) { matrix[r][0]=0; matrix[0][c]=0; }
  for (let r=1;r<m;r++) if (matrix[r][0]===0) for (let c=1;c<n;c++) matrix[r][c]=0;
  for (let c=1;c<n;c++) if (matrix[0][c]===0) for (let r=1;r<m;r++) matrix[r][c]=0;
  if (firstRowZero) for (let c=0;c<n;c++) matrix[0][c]=0;
  if (firstColZero) for (let r=0;r<m;r++) matrix[r][0]=0;
  return matrix;
}

// Tests
console.log(setZeroes([[1,1,1],[1,0,1],[1,1,1]])); // [[1,0,1],[0,0,0],[1,0,1]]

module.exports = setZeroes;


