/**
 * Problem 125: Segment Tree with Lazy Propagation (Hard, 100+ LOC)
 *
 * Implement a segment tree that supports:
 * - rangeAdd(l, r, val): add val to every element in [l, r]
 * - rangeSum(l, r): sum of elements in [l, r]
 * Both in O(log n).
 *
 * This is a classic data structure problem used in many interval/array update queries.
 * We build a segment tree with arrays tree[] and lazy[] of size ~4*n.
 * The tree stores sums. The lazy array stores pending increments to be pushed to children.
 *
 * API:
 *   const st = new SegmentTreeLazy(arr);
 *   st.rangeAdd(l, r, val);
 *   const s = st.rangeSum(l, r);
 */

class SegmentTreeLazy {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(this.n * 4).fill(0);
    this.lazy = new Array(this.n * 4).fill(0);
    this._build(1, 0, this.n - 1, arr);
  }

  _build(node, l, r, arr) {
    if (l === r) {
      this.tree[node] = arr[l];
      return;
    }
    const mid = (l + r) >> 1;
    this._build(node << 1, l, mid, arr);
    this._build((node << 1) | 1, mid + 1, r, arr);
    this.tree[node] = this.tree[node << 1] + this.tree[(node << 1) | 1];
  }

  _push(node, l, r) {
    // Push lazy value to children (if any)
    const lazyVal = this.lazy[node];
    if (lazyVal !== 0 && l !== r) {
      const left = node << 1, right = (node << 1) | 1;
      const mid = (l + r) >> 1;
      // Apply to left child
      this.tree[left] += lazyVal * (mid - l + 1);
      this.lazy[left] += lazyVal;
      // Apply to right child
      this.tree[right] += lazyVal * (r - mid);
      this.lazy[right] += lazyVal;
    }
    // Clear current node's lazy after pushing
    this.lazy[node] = 0;
  }

  _rangeAdd(node, l, r, ql, qr, val) {
    if (ql > r || qr < l) return; // no overlap
    if (ql <= l && r <= qr) {
      this.tree[node] += val * (r - l + 1);
      this.lazy[node] += val;
      return;
    }
    this._push(node, l, r);
    const mid = (l + r) >> 1;
    this._rangeAdd(node << 1, l, mid, ql, qr, val);
    this._rangeAdd((node << 1) | 1, mid + 1, r, ql, qr, val);
    this.tree[node] = this.tree[node << 1] + this.tree[(node << 1) | 1];
  }

  _rangeSum(node, l, r, ql, qr) {
    if (ql > r || qr < l) return 0; // no overlap
    if (ql <= l && r <= qr) return this.tree[node];
    this._push(node, l, r);
    const mid = (l + r) >> 1;
    return (
      this._rangeSum(node << 1, l, mid, ql, qr) +
      this._rangeSum((node << 1) | 1, mid + 1, r, ql, qr)
    );
  }

  rangeAdd(l, r, val) {
    if (l < 0) l = 0; if (r >= this.n) r = this.n - 1; if (l > r) return;
    this._rangeAdd(1, 0, this.n - 1, l, r, val);
  }

  rangeSum(l, r) {
    if (l < 0) l = 0; if (r >= this.n) r = this.n - 1; if (l > r) return 0;
    return this._rangeSum(1, 0, this.n - 1, l, r);
  }
}

// Example usage and tests
function _naiveRangeAddSum(arr, ops) {
  const a = arr.slice();
  let out = [];
  for (const op of ops) {
    const [t, l, r, v] = op; // t: 'add'|'sum'
    if (t === 'add') {
      for (let i = l; i <= r; i++) a[i] += v;
    } else if (t === 'sum') {
      let s = 0; for (let i = l; i <= r; i++) s += a[i]; out.push(s);
    }
  }
  return out;
}

// Tests
const base = [1, 2, 3, 4, 5, 6, 7, 8];
const st = new SegmentTreeLazy(base);
const ops = [
  ['sum', 0, 7, 0],
  ['add', 2, 5, 10],
  ['sum', 3, 4, 0],
  ['add', 0, 0, -1],
  ['sum', 0, 3, 0],
  ['add', 6, 7, 5],
  ['sum', 5, 7, 0],
];

const naiveOut = _naiveRangeAddSum(base, ops);
const stOut = [];
for (const [t, l, r, v] of ops) {
  if (t === 'add') st.rangeAdd(l, r, v);
  else stOut.push(st.rangeSum(l, r));
}
console.log('SegmentTree ok:', JSON.stringify(naiveOut) === JSON.stringify(stOut));

module.exports = SegmentTreeLazy;


