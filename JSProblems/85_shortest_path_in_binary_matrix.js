/**
 * Problem 85: Shortest Path in Binary Matrix (Hard-)
 * 8-direction BFS from (0,0) to (n-1,n-1) through zeros.
 */

function shortestPathBinaryMatrix(grid){
  const n=grid.length; if(grid[0][0]!==0||grid[n-1][n-1]!==0) return -1;
  const q=[[0,0,1]]; grid[0][0]=1;
  const dirs=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  for(let qi=0; qi<q.length; qi++){
    const [r,c,d]=q[qi]; if(r===n-1&&c===n-1) return d;
    for(const[dr,dc] of dirs){ const nr=r+dr,nc=c+dc; if(nr>=0&&nc>=0&&nr<n&&nc<n&&grid[nr][nc]===0){ grid[nr][nc]=1; q.push([nr,nc,d+1]); } }
  }
  return -1;
}

// Tests
console.log(shortestPathBinaryMatrix([[0,1],[1,0]])); // 2

module.exports = shortestPathBinaryMatrix;


