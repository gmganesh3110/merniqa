/**
 * Problem 27: Number of Islands (Medium)
 * Given grid of '1' (land) and '0' (water), count islands.
 * Approach: DFS/BFS mark visited.
 * Time: O(mn)  Space: O(mn)
 */

function numIslands(grid) {
  if (!grid.length) return 0;
  const m = grid.length, n = grid[0].length;
  let count = 0;
  const visit = (r, c) => {
    if (r<0||c<0||r>=m||c>=n||grid[r][c] !== '1') return;
    grid[r][c] = '0';
    visit(r+1,c); visit(r-1,c); visit(r,c+1); visit(r,c-1);
  };
  for (let r=0;r<m;r++) for (let c=0;c<n;c++) if (grid[r][c]==='1') { count++; visit(r,c); }
  return count;
}

// Tests
console.log(numIslands([
  ['1','1','1','1','0'],
  ['1','1','0','1','0'],
  ['1','1','0','0','0'],
  ['0','0','0','0','0']
])); // 1

console.log(numIslands([
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
])); // 3

module.exports = numIslands;


