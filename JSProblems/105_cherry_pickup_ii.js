/**
 * Problem 105: Cherry Pickup II (Hard)
 * Two robots move from top row to bottom row collecting grid[r][c].
 * DP[r][c1][c2] -> max cherries from row r when robots at c1 and c2.
 * Optimized to O(m*n*n) time, O(n*n) space per row.
 */

function cherryPickup(grid){
  const m=grid.length, n=grid[0].length;
  let dp = Array.from({length:n},()=>Array(n).fill(-Infinity));
  dp[0][n-1]=grid[0][0]+(n-1!==0?grid[0][n-1]:0);
  for(let r=1;r<m;r++){
    const ndp = Array.from({length:n},()=>Array(n).fill(-Infinity));
    for(let c1=0;c1<n;c1++) for(let c2=0;c2<n;c2++) if (dp[c1][c2]>-1e15){
      for(let dc1=-1;dc1<=1;dc1++) for(let dc2=-1;dc2<=1;dc2++){
        const nc1=c1+dc1, nc2=c2+dc2;
        if(nc1<0||nc2<0||nc1>=n||nc2>=n) continue;
        const add = grid[r][nc1] + (nc1!==nc2?grid[r][nc2]:0);
        ndp[nc1][nc2] = Math.max(ndp[nc1][nc2], dp[c1][c2] + add);
      }
    }
    dp = ndp;
  }
  let ans=-Infinity; for(let c1=0;c1<n;c1++) for(let c2=0;c2<n;c2++) ans=Math.max(ans,dp[c1][c2]);
  return ans;
}

// Tests
console.log(cherryPickup([[3,1,1],[2,5,1],[1,5,5],[2,1,1]])); // 24

module.exports = cherryPickup;


