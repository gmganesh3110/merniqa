/**
 * Problem 130: Li Chao Segment Tree (Hard, 100+ LOC)
 *
 * Maintain a dynamic set of lines y = m*x + b and support queries of min y at x.
 * This structure supports addLine in O(log C) and query in O(log C), where C is coordinate range.
 */

class Line {
  constructor(m, b) { this.m = m; this.b = b; }
  get(x) { return this.m * x + this.b; }
}

class LiChaoNode {
  constructor(l, r) {
    this.l = l; this.r = r; this.left = null; this.right = null; this.line = null;
  }
}

class LiChaoTree {
  constructor(xLeft, xRight) {
    this.root = new LiChaoNode(xLeft, xRight);
  }
  _add(node, newline) {
    const l = node.l, r = node.r;
    if (!node.line) { node.line = newline; return; }
    const mid = Math.floor((l + r) / 2);
    let low = node.line, high = newline;
    if (low.get(l) > high.get(l)) [low, high] = [high, low];
    if (low.get(r) <= high.get(r)) { node.line = low; return; }
    if (low.get(mid) <= high.get(mid)) {
      node.line = low;
      if (!node.right) node.right = new LiChaoNode(mid + 1, r);
      this._add(node.right, high);
    } else {
      node.line = high;
      if (!node.left) node.left = new LiChaoNode(l, mid);
      this._add(node.left, low);
    }
  }
  addLine(m, b) { this._add(this.root, new Line(m, b)); }
  _query(node, x) {
    if (!node) return Infinity;
    let res = node.line ? node.line.get(x) : Infinity;
    const mid = Math.floor((node.l + node.r) / 2);
    if (x <= mid) return Math.min(res, this._query(node.left, x));
    return Math.min(res, this._query(node.right, x));
  }
  query(x) { return this._query(this.root, x); }
}

// Example
const lichao = new LiChaoTree(-1000000, 1000000);
lichao.addLine(2, 3); // y=2x+3
lichao.addLine(-1, 10); // y=-x+10
console.log('LiChao query 5:', lichao.query(5));

module.exports = LiChaoTree;


