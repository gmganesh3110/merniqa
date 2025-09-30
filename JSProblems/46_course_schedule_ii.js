/**
 * Problem 46: Course Schedule II (Medium)
 * Return any valid order to finish all courses or [] if impossible.
 * Approach: Kahn's BFS topological sort.
 */

function findOrder(numCourses, prerequisites) {
  const indeg = Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }
  const q = []; for (let i=0;i<numCourses;i++) if (!indeg[i]) q.push(i);
  const order = [];
  for (let qi=0; qi<q.length; qi++) {
    const u = q[qi]; order.push(u);
    for (const v of adj[u]) if (--indeg[v]===0) q.push(v);
  }
  return order.length===numCourses ? order : [];
}

// Tests
console.log(findOrder(2, [[1,0]])); // [0,1]
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // [0,1,2,3] or [0,2,1,3]

module.exports = findOrder;


