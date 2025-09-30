/**
 * Problem 121: Maximum Rectangle of 1s after up to K zero->one flips (Hard)
 * For each pair of rows, build compressed columns of ones count; sliding window with at most K zeros in window.
 * Time: O(m^2 * n)
 */

function maxOnesRectangleAfterKFlips(grid, K){
  const m=grid.length,n=grid[0].length; let ans=0;
  for(let top=0; top<m; top++){
    const colZeroes=Array(n).fill(0);
    for(let bottom=top; bottom<m; bottom++){
      for(let c=0;c<n;c++) if(grid[bottom][c]===0) colZeroes[c]++;
      // sliding window on columns: at most K zeros across rows [top..bottom]
      let l=0, zeros=0; const height=bottom-top+1;
      for(let r=0;r<n;r++){
        zeros += (colZeroes[r]===height?0:height-colZeroes[r]); // zeros in this column over the band
        while(zeros > K){
          zeros -= (colZeroes[l]===height?0:height-colZeroes[l]);
          l++;
        }
        ans = Math.max(ans, height * (r-l+1));
      }
    }
  }
  return ans;
}

// Tests (simple)
console.log(maxOnesRectangleAfterKFlips([[1,0,1,1],[1,0,0,1],[1,1,1,0]], 2));

module.exports = maxOnesRectangleAfterKFlips;


