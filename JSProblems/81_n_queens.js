/**
 * Problem 81: N-Queens (Hard)
 * Return all distinct solutions placing n queens.
 * Backtracking with columns and diagonals constraints.
 */

function solveNQueens(n) {
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  const board = Array.from({length:n},()=>Array(n).fill('.'));
  const res = [];
  function dfs(r){
    if (r === n) { res.push(board.map(row=>row.join(''))); return; }
    for (let c=0;c<n;c++) {
      if (cols.has(c) || diag1.has(r-c) || diag2.has(r+c)) continue;
      cols.add(c); diag1.add(r-c); diag2.add(r+c);
      board[r][c] = 'Q';
      dfs(r+1);
      board[r][c] = '.';
      cols.delete(c); diag1.delete(r-c); diag2.delete(r+c);
    }
  }
  dfs(0);
  return res;
}

// Tests
console.log(solveNQueens(4));

module.exports = solveNQueens;


