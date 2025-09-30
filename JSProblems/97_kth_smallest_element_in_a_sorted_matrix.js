/**
 * Problem 97: Kth Smallest Element in a Sorted Matrix (Hard-)
 * Binary search on value; count <= mid using staircase.
 */

function kthSmallest(matrix, k) {
  const n = matrix.length;
  let lo = matrix[0][0], hi = matrix[n-1][n-1];
  function countLE(x){
    let i=n-1, j=0, cnt=0;
    while (i>=0 && j<n){ if (matrix[i][j] <= x){ cnt += i+1; j++; } else i--; }
    return cnt;
  }
  while (lo < hi){
    const mid = Math.floor((lo + hi) / 2);
    if (countLE(mid) >= k) hi = mid; else lo = mid + 1;
  }
  return lo;
}

// Tests
console.log(kthSmallest([[1,5,9],[10,11,13],[12,13,15]],8)); // 13

module.exports = kthSmallest;


