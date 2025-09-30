/**
 * Problem 86: Critical Connections in a Network (Hard)
 * Find all bridges (critical edges) in an undirected graph using Tarjan's algorithm.
 * Time: O(V+E)
 */

function criticalConnections(n, connections) {
  const adj = Array.from({length:n},()=>[]);
  for (const [u,v] of connections){ adj[u].push(v); adj[v].push(u); }
  const disc = Array(n).fill(-1), low = Array(n).fill(0);
  let time = 0; const res = [];
  function dfs(u, parent){
    disc[u] = low[u] = time++;
    for (const v of adj[u]){
      if (v === parent) continue;
      if (disc[v] === -1){
        dfs(v, u);
        low[u] = Math.max(low[u], low[v]);
        if (low[v] > disc[u]) res.push([u,v]);
      } else low[u] = Math.max(low[u], disc[v]);
    }
  }
  dfs(0,-1);
  return res;
}

// Tests
console.log(criticalConnections(4, [[0,1],[1,2],[2,0],[1,3]])); // [[1,3]]

module.exports = criticalConnections;


