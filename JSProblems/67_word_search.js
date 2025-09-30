/**
 * Problem 67: Word Search (Medium)
 * Given board and word, return true if word exists by adjacent cells (no reuse).
 * Backtracking DFS.
 */

function exist(board, word) {
  const m = board.length, n = board[0].length;
  const seen = Array.from({length:m},()=>Array(n).fill(false));
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  function dfs(r,c,idx){
    if (idx === word.length) return true;
    if (r<0||c<0||r>=m||c>=n||seen[r][c]||board[r][c]!==word[idx]) return false;
    seen[r][c]=true;
    for (const [dr,dc] of dirs) if (dfs(r+dr,c+dc,idx+1)) return seen[r][c]=false, true;
    seen[r][c]=false; return false;
  }
  for (let r=0;r<m;r++) for (let c=0;c<n;c++) if (dfs(r,c,0)) return true;
  return false;
}

// Tests
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")); // true
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE")); // true
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB")); // false

module.exports = exist;


