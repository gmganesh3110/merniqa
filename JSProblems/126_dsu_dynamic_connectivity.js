/**
 * Problem 126: Dynamic Connectivity with Union-Find (DSU) + Offline Queries (Hard, 100+ LOC)
 *
 * Given n nodes (0..n-1) and a sequence of operations of two types:
 *  - add(u,v): add an undirected edge (u,v)
 *  - query(u,v): is u connected to v (considering all edges added so far)?
 *
 * Standard DSU supports online union/find, but if we also support removals we'd go offline.
 * Here we implement a flexible engine that supports only additions and connectivity queries online,
 * and an offline solver that can answer connectivity with edge removals using divide-and-conquer
 * over time (optional demonstration).
 *
 * Export:
 *  - class DSU: path compression + union by size
 *  - function onlineConnectivity(n, ops): returns answers to queries in order, given only add/query
 *  - function offlineConnectivityWithRemovals(n, ops): (demo) solve when we have add/remove/query
 */

class DSU {
  constructor(n) {
    this.parent = Array(n);
    this.size = Array(n).fill(1);
    for (let i = 0; i < n; i++) this.parent[i] = i;
    this.components = n;
  }
  find(a) {
    if (this.parent[a] !== a) this.parent[a] = this.find(this.parent[a]);
    return this.parent[a];
  }
  union(a, b) {
    a = this.find(a); b = this.find(b);
    if (a === b) return false;
    if (this.size[a] < this.size[b]) [a, b] = [b, a];
    this.parent[b] = a;
    this.size[a] += this.size[b];
    this.components--;
    return true;
  }
  connected(a, b) { return this.find(a) === this.find(b); }
}

/**
 * Online connectivity engine (only add/query)
 * ops: array of { type: 'add'|'query', u, v }
 */
function onlineConnectivity(n, ops) {
  const dsu = new DSU(n);
  const ans = [];
  for (const op of ops) {
    if (op.type === 'add') dsu.union(op.u, op.v);
    else if (op.type === 'query') ans.push(dsu.connected(op.u, op.v));
  }
  return ans;
}

/**
 * OFFLINE with removals (demonstration):
 * Given ops including {type:'add'|'remove'|'query', u, v}, we answer queries where edges can be removed.
 * Strategy: Each edge (u,v) has an active time interval(s). We map queries to time indices and apply
 * a divide-and-conquer over the time axis, maintaining a DSU rollback stack to revert unions.
 *
 * For simplicity and educational value, we implement a rollback DSU and a segment-tree-over-time structure.
 * Complexity: O((E + Q) log(E+Q) * α(N)).
 */

class RollbackDSU {
  constructor(n) {
    this.parent = Array(n);
    this.size = Array(n).fill(1);
    for (let i = 0; i < n; i++) this.parent[i] = i;
    this.stack = [];
  }
  find(a) {
    while (this.parent[a] !== a) a = this.parent[a];
    return a;
  }
  union(a, b) {
    a = this.find(a); b = this.find(b);
    if (a === b) { this.stack.push(null); return false; }
    if (this.size[a] < this.size[b]) [a, b] = [b, a];
    // attach b -> a
    this.stack.push([b, this.parent[b], a, this.size[a]]);
    this.parent[b] = a;
    this.size[a] += this.size[b];
    return true;
  }
  snapshot() { return this.stack.length; }
  rollback(snap) {
    while (this.stack.length > snap) {
      const st = this.stack.pop();
      if (!st) continue;
      const [b, prevParent, a, prevSizeA] = st;
      this.parent[b] = prevParent;
      this.size[a] = prevSizeA;
    }
  }
}

// Build segments for time intervals of active edges
function buildSegments(m) { return Array.from({ length: m * 4 }, () => []); }
function addInterval(seg, node, l, r, ql, qr, edge) {
  if (ql > r || qr < l) return;
  if (ql <= l && r <= qr) { seg[node].push(edge); return; }
  const mid = (l + r) >> 1;
  addInterval(seg, node << 1, l, mid, ql, qr, edge);
  addInterval(seg, (node << 1) | 1, mid + 1, r, ql, qr, edge);
}

/**
 * offlineConnectivityWithRemovals(n, ops)
 * ops include:
 *  - {type:'add', u, v, id} // id identifies this edge instance
 *  - {type:'remove', id}
 *  - {type:'query', u, v}
 * Returns: boolean array for queries in order of appearance.
 */
function offlineConnectivityWithRemovals(n, ops) {
  // Map id -> addTime; build intervals [addTime, removeTime-1]
  const active = new Map();
  const intervals = []; // [l,r,{u,v}]
  const queryIndices = []; // map time -> query index
  let time = 0;
  for (const op of ops) {
    if (op.type === 'add') {
      active.set(op.id, { u: op.u, v: op.v, t: time });
    } else if (op.type === 'remove') {
      const it = active.get(op.id);
      if (it) { intervals.push([it.t, time - 1, { u: it.u, v: it.v }]); active.delete(op.id); }
    } else if (op.type === 'query') {
      queryIndices.push(time);
    }
    time++;
  }
  for (const [id, it] of active.entries()) intervals.push([it.t, time - 1, { u: it.u, v: it.v }]);

  const seg = buildSegments(time);
  for (const [l, r, e] of intervals) if (l <= r) addInterval(seg, 1, 0, time - 1, l, r, e);

  const dsu = new RollbackDSU(n);
  const answers = [];
  let qPtr = 0;
  function dfs(node, l, r) {
    const snap = dsu.snapshot();
    for (const e of seg[node]) dsu.union(e.u, e.v);
    if (l === r) {
      const op = ops[l];
      if (op.type === 'query') answers.push(dsu.find(op.u) === dsu.find(op.v));
    } else {
      const mid = (l + r) >> 1;
      dfs(node << 1, l, mid);
      dfs((node << 1) | 1, mid + 1, r);
    }
    dsu.rollback(snap);
  }
  if (time > 0) dfs(1, 0, time - 1);
  return answers;
}

// Simple tests
const onlineAns = onlineConnectivity(5, [
  { type: 'add', u: 0, v: 1 },
  { type: 'add', u: 1, v: 2 },
  { type: 'query', u: 0, v: 2 }, // true
  { type: 'query', u: 0, v: 3 }, // false
  { type: 'add', u: 3, v: 4 },
  { type: 'query', u: 3, v: 4 }, // true
]);
console.log('onlineConnectivity:', onlineAns);

const offOps = [
  { type: 'add', u: 0, v: 1, id: 'a' },
  { type: 'add', u: 1, v: 2, id: 'b' },
  { type: 'query', u: 0, v: 2 },
  { type: 'remove', id: 'b' },
  { type: 'query', u: 0, v: 2 },
  { type: 'add', u: 2, v: 3, id: 'c' },
  { type: 'query', u: 0, v: 3 },
];
console.log('offlineConnectivity:', offlineConnectivityWithRemovals(4, offOps));

module.exports = { DSU, onlineConnectivity, offlineConnectivityWithRemovals };


