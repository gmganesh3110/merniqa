/**
 * Problem 61: Clone Graph (Medium)
 * Deep-copy an undirected graph given a node reference.
 * Approach: DFS with hashmap from original->clone.
 */

function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();
  function dfs(u) {
    if (map.has(u)) return map.get(u);
    const copy = { val: u.val, neighbors: [] };
    map.set(u, copy);
    for (const v of u.neighbors) copy.neighbors.push(dfs(v));
    return copy;
  }
  return dfs(node);
}

// Tests (simple 2-node cycle)
const a = { val: 1, neighbors: [] }, b = { val: 2, neighbors: [] };
a.neighbors=[b]; b.neighbors=[a];
const c = cloneGraph(a);
console.log(c.val, c.neighbors[0].val); // 1 2

module.exports = cloneGraph;


