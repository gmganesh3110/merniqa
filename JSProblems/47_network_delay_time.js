/**
 * Problem 47: Network Delay Time (Upper-Medium)
 * Given times[u->v]=w, find time for all nodes to receive signal from k.
 * Approach: Dijkstra's using min-heap.
 */

class MinHeap {
  constructor(){ this.a=[]; }
  size(){ return this.a.length; }
  push(x){ this.a.push(x); this._up(this.a.length-1); }
  pop(){ const v=this.a[0]; const e=this.a.pop(); if(this.a.length){ this.a[0]=e; this._down(0);} return v; }
  _up(i){ const a=this.a; while(i){ const p=(i-1>>1); if(a[p][0]<=a[i][0])break; [a[p],a[i]]=[a[i],a[p]]; i=p; } }
  _down(i){ const a=this.a; for(;;){ let l=i*2+1,r=l+1,s=i; if(l<a.length&&a[l][0]<a[s][0])s=l; if(r<a.length&&a[r][0]<a[s][0])s=r; if(s===i)break; [a[i],a[s]]=[a[s],a[i]]; i=s; } }
}

function networkDelayTime(times, n, k) {
  const adj = Array.from({length:n+1},()=>[]);
  for (const [u,v,w] of times) adj[u].push([v,w]);
  const dist = Array(n+1).fill(Infinity); dist[k]=0;
  const heap = new MinHeap(); heap.push([0,k]);
  while (heap.size()) {
    const [d,u] = heap.pop(); if (d>dist[u]) continue;
    for (const [v,w] of adj[u]) {
      if (dist[v] > d + w) { dist[v] = d + w; heap.push([dist[v], v]); }
    }
  }
  let ans = 0;
  for (let i=1;i<=n;i++) { if (!isFinite(dist[i])) return -1; ans = Math.max(ans, dist[i]); }
  return ans;
}

// Tests
console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // 2

module.exports = networkDelayTime;


