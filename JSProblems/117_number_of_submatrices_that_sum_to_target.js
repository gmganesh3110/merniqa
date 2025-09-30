/**
 * Problem 117: Number of Submatrices That Sum to Target (Hard)
 * Fix top/bottom rows; reduce to 1D subarray sum equals k per column using hashmap.
 * Time: O(m^2 * n)
 */

function numSubmatrixSumTarget(matrix, target){
  const m=matrix.length,n=matrix[0].length;
  for(let r=0;r<m;r++) for(let c=1;c<n;c++) matrix[r][c]+=matrix[r][c-1];
  let ans=0;
  for(let left=0; left<n; left++){
    for(let right=left; right<n; right++){
      const map=new Map(); map.set(0,1); let sum=0;
      for(let r=0;r<m;r++){
        sum += matrix[r][right] - (left?matrix[r][left-1]:0);
        ans += (map.get(sum-target)||0);
        map.set(sum,(map.get(sum)||0)+1);
      }
    }
  }
  return ans;
}

// Tests
console.log(numSubmatrixSumTarget([[0,1,0],[1,1,1],[0,1,0]],0)); // 4

module.exports = numSubmatrixSumTarget;


