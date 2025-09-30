/**
 * Problem 108: Longest Increasing Path in a Matrix (Hard)
 * DFS + memoization; 4-direction moves strictly increasing.
 */

function longestIncreasingPath(matrix){
  if(!matrix.length) return 0; const m=matrix.length,n=matrix[0].length;
  const memo=Array.from({length:m},()=>Array(n).fill(0));
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  function dfs(r,c){
    if(memo[r][c]) return memo[r][c];
    let best=1;
    for(const[dr,dc] of dirs){ const nr=r+dr,nc=c+dc; if(nr>=0&&nc>=0&&nr<m&&nc<n&&matrix[nr][nc]>matrix[r][c]) best=Math.max(best,1+dfs(nr,nc)); }
    memo[r][c]=best; return best;
  }
  let ans=0; for(let r=0;r<m;r++) for(let c=0;c<n;c++) ans=Math.max(ans,dfs(r,c));
  return ans;
}

// Tests
console.log(longestIncreasingPath([[9,9,4],[6,6,8],[2,1,1]])); // 4

module.exports = longestIncreasingPath;


