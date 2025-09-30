/**
 * Problem 129: Dinic's Max Flow (Hard, 100+ LOC)
 *
 * Implement Dinic's algorithm for computing maximum flow in O(E * V^2) worst-case,
 * typically fast in practice. Supports multiple edges and directed graph.
 *
 * Expose:
 *  - class Dinic(n): addEdge(u,v,cap), maxFlow(s,t)
 */

class Dinic {
  constructor(n) {
    this.n = n;
    this.adj = Array.from({ length: n }, () => []);
    this.level = new Array(n).fill(0);
    this.it = new Array(n).fill(0);
  }
  addEdge(u, v, cap) {
    const a = { to: v, cap, rev: null };
    const b = { to: u, cap: 0, rev: a };
    a.rev = b;
    this.adj[u].push(a);
    this.adj[v].push(b);
  }
  bfs(s, t) {
    this.level.fill(-1);
    const q = [s]; this.level[s] = 0;
    for (let qi = 0; qi < q.length; qi++) {
      const u = q[qi];
      for (const e of this.adj[u]) {
        if (e.cap > 0 && this.level[e.to] < 0) {
          this.level[e.to] = this.level[u] + 1;
          q.push(e.to);
        }
      }
    }
    return this.level[t] >= 0;
  }
  dfs(u, t, f) {
    if (u === t) return f;
    for (let i = this.it[u]; i < this.adj[u].length; i++) {
      this.it[u] = i;
      const e = this.adj[u][i];
      if (e.cap > 0 && this.level[e.to] === this.level[u] + 1) {
        const ret = this.dfs(e.to, t, Math.min(f, e.cap));
        if (ret > 0) {
          e.cap -= ret;
          e.rev.cap += ret;
          return ret;
        }
      }
    }
    return 0;
  }
  maxFlow(s, t) {
    let flow = 0;
    while (this.bfs(s, t)) {
      this.it.fill(0);
      let f;
      while ((f = this.dfs(s, t, 1e18)) > 0) flow += f;
    }
    return flow;
  }
}

// Example: Max flow in a small graph
const d = new Dinic(4);
// 0->1 (3), 0->2 (2), 1->2 (1), 1->3 (2), 2->3 (4)
d.addEdge(0,1,3); d.addEdge(0,2,2); d.addEdge(1,2,1); d.addEdge(1,3,2); d.addEdge(2,3,4);
console.log('maxFlow example:', d.maxFlow(0,3)); // 5

module.exports = Dinic;


