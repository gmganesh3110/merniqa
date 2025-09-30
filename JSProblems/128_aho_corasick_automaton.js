/**
 * Problem 128: Aho–Corasick Automaton (Hard, 100+ LOC)
 *
 * Build an automaton to match multiple patterns in a text efficiently.
 * Expose:
 *  - class AhoCorasick with add(pattern, id), build(), search(text) -> occurrences
 * Occurrence: { id, index } where index is ending position (inclusive) in text.
 */

class ACNode {
  constructor() {
    this.next = new Map();    // char -> node
    this.fail = null;         // failure link
    this.out = [];            // list of pattern ids ending here
  }
}

class AhoCorasick {
  constructor() {
    this.root = new ACNode();
    this.built = false;
  }
  add(pattern, id) {
    let node = this.root;
    for (const ch of pattern) {
      if (!node.next.has(ch)) node.next.set(ch, new ACNode());
      node = node.next.get(ch);
    }
    node.out.push({ id, len: pattern.length });
    this.built = false;
  }
  build() {
    const q = [];
    // Initialize fail links of depth 1 children to root
    for (const [ch, child] of this.root.next.entries()) {
      child.fail = this.root;
      q.push(child);
    }
    this.root.fail = this.root;
    // BFS
    for (let qi = 0; qi < q.length; qi++) {
      const u = q[qi];
      for (const [ch, v] of u.next.entries()) {
        let f = u.fail;
        while (f && !f.next.has(ch) && f !== this.root) f = f.fail;
        if (f.next && f.next.has(ch)) v.fail = f.next.get(ch); else v.fail = this.root;
        // merge outputs
        if (v.fail.out.length) v.out = v.out.concat(v.fail.out);
        q.push(v);
      }
    }
    this.built = true;
  }
  search(text) {
    if (!this.built) this.build();
    const results = [];
    let node = this.root;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      while (node && !node.next.has(ch) && node !== this.root) node = node.fail;
      if (node.next && node.next.has(ch)) node = node.next.get(ch); else node = this.root;
      if (node.out.length) {
        for (const pat of node.out) results.push({ id: pat.id, index: i, len: pat.len });
      }
    }
    return results;
  }
}

// Example and tests
const ac = new AhoCorasick();
ac.add('he', 0);
ac.add('she', 1);
ac.add('his', 2);
ac.add('hers', 3);
ac.build();
const hits = ac.search('ahishers');
console.log('AC hits:', hits);

module.exports = AhoCorasick;


