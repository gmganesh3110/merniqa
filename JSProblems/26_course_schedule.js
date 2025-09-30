/**
 * Problem 26: Course Schedule (Medium)
 * Can you finish all courses? prerequisites form a directed graph.
 * Approach: Detect cycle via Kahn's BFS topological sort.
 * Time: O(V+E)
 */

function canFinish(numCourses, prerequisites) {
  const indeg = Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) { // b -> a
    adj[b].push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  let visited = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const u = q[qi];
    visited++;
    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);
  }
  return visited === numCourses;
}

// Tests
console.log(canFinish(2, [[1,0]])); // true
console.log(canFinish(2, [[1,0],[0,1]])); // false

module.exports = canFinish;


