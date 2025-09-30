/**
 * Problem 132: Min-Cost Max-Flow (Hard, 100+ LOC)
 *
 * Implement successive shortest augmenting path algorithm with potentials.
 * Graph supports directed edges with capacity and cost (can be negative if no negative cycles).
 * We use Dijkstra with potentials to ensure non-negative reduced costs per iteration.
 *
 * API:
 *  - class MinCostMaxFlow(n)
 *       addEdge(u, v, cap, cost)
 *       minCostMaxFlow(s, t) -> { flow, cost }
 */

class Edge {
  constructor(to, rev, cap, cost) {
    this.to = to;     // destination node
    this.rev = rev;   // index of reverse edge in adjacency list of 'to'
    this.cap = cap;   // remaining capacity
    this.cost = cost; // cost per unit of flow
  }
}

class MinCostMaxFlow {
  constructor(n) {
    this.n = n;
    this.g = Array.from({ length: n }, () => []);
  }
  addEdge(u, v, cap, cost) {
    const a = new Edge(v, null, cap, cost);
    const b = new Edge(u, a, 0, -cost);
    a.rev = b;
    this.g[u].push(a);
    this.g[v].push(b);
  }
  // Dijkstra with potentials to find shortest augmenting path
  _dijkstra(s, t, pot) {
    const n = this.n;
    const dist = new Array(n).fill(Infinity);
    const inq = new Array(n).fill(false);
    const prevV = new Array(n).fill(-1);
    const prevE = new Array(n).fill(null);
    dist[s] = 0;
    // binary heap (min-heap) for (dist, node)
    const heap = [];
    const push = (d, v) => { heap.push([d, v]); siftUp(heap, heap.length - 1); };
    const pop = () => { const top = heap[0]; const last = heap.pop(); if (heap.length) { heap[0] = last; siftDown(heap, 0); } return top; };
    push(0, s);
    while (heap.length) {
      const [d, u] = pop();
      if (d !== dist[u]) continue;
      for (const e of this.g[u]) {
        if (e.cap <= 0) continue;
        const v = e.to;
        const nd = d + e.cost + pot[u] - pot[v];
        if (nd < dist[v]) {
          dist[v] = nd;
          prevV[v] = u;
          prevE[v] = e;
          push(nd, v);
        }
      }
    }
    return { dist, prevV, prevE };
  }
  minCostMaxFlow(s, t) {
    const n = this.n;
    const pot = new Array(n).fill(0); // potentials (Johnson's technique)
    let flow = 0;
    let cost = 0;
    while (true) {
      const { dist, prevV, prevE } = this._dijkstra(s, t, pot);
      if (!isFinite(dist[t])) break; // no more augmenting path
      for (let v = 0; v < n; v++) if (isFinite(dist[v])) pot[v] += dist[v];
      // find bottleneck
      let add = Infinity;
      for (let v = t; v !== s; v = prevV[v]) add = Math.min(add, prevE[v].cap);
      // augment
      for (let v = t; v !== s; v = prevV[v]) {
        const e = prevE[v];
        e.cap -= add;
        e.rev.cap += add;
      }
      flow += add;
      cost += add * pot[t]; // pot[t] equals shortest path cost under original costs
    }
    return { flow, cost };
  }
}

// Binary heap helpers for (dist, node)
function siftUp(a, i) {
  while (i) {
    const p = (i - 1) >> 1;
    if (a[p][0] <= a[i][0]) break;
    [a[p], a[i]] = [a[i], a[p]];
    i = p;
  }
}
function siftDown(a, i) {
  const n = a.length;
  while (true) {
    let s = i;
    const l = i * 2 + 1, r = l + 1;
    if (l < n && a[l][0] < a[s][0]) s = l;
    if (r < n && a[r][0] < a[s][0]) s = r;
    if (s === i) break;
    [a[i], a[s]] = [a[s], a[i]];
    i = s;
  }
}

// Example usage: assignment problem small instance
// 2 workers -> 2 jobs; costs matrix
function assignmentExample() {
  const nWorkers = 2, nJobs = 2;
  const s = 0, t = 1 + nWorkers + nJobs; // source=0, workers=1..n, jobs=n+1..n+nJobs, sink=last
  const mcmf = new MinCostMaxFlow(t + 1);
  for (let i = 0; i < nWorkers; i++) mcmf.addEdge(s, 1 + i, 1, 0);
  const costMatrix = [ [2, 5], [3, 4] ];
  for (let i = 0; i < nWorkers; i++) {
    for (let j = 0; j < nJobs; j++) {
      mcmf.addEdge(1 + i, 1 + nWorkers + j, 1, costMatrix[i][j]);
    }
  }
  for (let j = 0; j < nJobs; j++) mcmf.addEdge(1 + nWorkers + j, t, 1, 0);
  const { flow, cost } = mcmf.minCostMaxFlow(s, t);
  console.log('assignment mcmf flow,cost:', flow, cost); // flow=2 cost=6
}
assignmentExample();

module.exports = MinCostMaxFlow;


