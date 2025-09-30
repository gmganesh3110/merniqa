/**
 * Problem 131: Suffix Automaton (Hard, 100+ LOC)
 *
 * Build suffix automaton (SAM) for string s. Supports counting distinct substrings,
 * occurrences, and fast substring checks. Here we implement construction and utilities:
 *  - buildSAM(s) -> automaton states
 *  - substringExists(sam, pattern)
 *  - countDistinctSubstringsSAM(sam)
 */

class SAMState {
  constructor() {
    this.next = new Map(); // char -> state index
    this.link = -1;        // suffix link
    this.len = 0;          // max length for this state
  }
}

class SuffixAutomaton {
  constructor() {
    this.st = [new SAMState()];
    this.last = 0;
  }
  extend(ch) {
    let cur = this.st.length; this.st.push(new SAMState());
    this.st[cur].len = this.st[this.last].len + 1;
    let p = this.last;
    while (p !== -1 && !this.st[p].next.has(ch)) { this.st[p].next.set(ch, cur); p = this.st[p].link; }
    if (p === -1) this.st[cur].link = 0;
    else {
      const q = this.st[p].next.get(ch);
      if (this.st[p].len + 1 === this.st[q].len) this.st[cur].link = q;
      else {
        const clone = this.st.length; this.st.push(new SAMState());
        this.st[clone].len = this.st[p].len + 1;
        this.st[clone].next = new Map(this.st[q].next);
        this.st[clone].link = this.st[q].link;
        while (p !== -1 && this.st[p].next.get(ch) === q) { this.st[p].next.set(ch, clone); p = this.st[p].link; }
        this.st[q].link = this.st[cur].link = clone;
      }
    }
    this.last = cur;
  }
}

function buildSAM(s) {
  const sam = new SuffixAutomaton();
  for (const ch of s) sam.extend(ch);
  return sam;
}

function substringExists(sam, pattern) {
  let v = 0;
  for (const ch of pattern) {
    if (!sam.st[v].next.has(ch)) return false;
    v = sam.st[v].next.get(ch);
  }
  return true;
}

function countDistinctSubstringsSAM(sam) {
  let res = 0;
  for (let i = 1; i < sam.st.length; i++) {
    const v = sam.st[i];
    res += v.len - sam.st[v.link].len;
  }
  return res;
}

// Tests
const sam = buildSAM('banana');
console.log('SAM distinct substrings banana:', countDistinctSubstringsSAM(sam));
console.log('SAM has ana:', substringExists(sam, 'ana'));

module.exports = { buildSAM, substringExists, countDistinctSubstringsSAM };


