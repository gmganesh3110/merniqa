/**
 * Problem 127: Suffix Array and LCP (Hard, 100+ LOC)
 *
 * Build the suffix array (SA) of a string s using the O(n log n) doubling algorithm,
 * then build the LCP (Longest Common Prefix) array using Kasai's algorithm in O(n).
 *
 * Expose:
 *  - buildSuffixArray(s) -> SA array of indices
 *  - buildLCP(s, sa) -> LCP array where LCP[i] = lcp of suffix starting at sa[i] and sa[i-1]; LCP[0]=0
 *  - findOccurrences(s, pattern, sa) -> returns [l, r) range in SA where suffixes start with pattern
 *
 * This is foundational for many string problems: substring queries, distinct substrings count, etc.
 */

function buildSuffixArray(s) {
  const n = s.length;
  const sa = Array(n); for (let i = 0; i < n; i++) sa[i] = i;
  const rank = Array(n); for (let i = 0; i < n; i++) rank[i] = s.charCodeAt(i);
  const tmp = Array(n).fill(0);
  for (let k = 1; k < n; k <<= 1) {
    sa.sort((a, b) => {
      if (rank[a] !== rank[b]) return rank[a] - rank[b];
      const ra = a + k < n ? rank[a + k] : -1;
      const rb = b + k < n ? rank[b + k] : -1;
      return ra - rb;
    });
    tmp[sa[0]] = 0;
    for (let i = 1; i < n; i++) {
      const a = sa[i - 1], b = sa[i];
      const same1 = rank[a] === rank[b];
      const ra = a + k < n ? rank[a + k] : -1;
      const rb = b + k < n ? rank[b + k] : -1;
      tmp[b] = tmp[a] + (same1 && ra === rb ? 0 : 1);
    }
    for (let i = 0; i < n; i++) rank[i] = tmp[i];
    if (rank[sa[n - 1]] === n - 1) break;
  }
  return sa;
}

function buildLCP(s, sa) {
  const n = s.length;
  const rank = Array(n);
  for (let i = 0; i < n; i++) rank[sa[i]] = i;
  const lcp = Array(n).fill(0);
  let h = 0;
  for (let i = 0; i < n; i++) {
    const r = rank[i];
    if (r > 0) {
      const j = sa[r - 1];
      while (i + h < n && j + h < n && s[i + h] === s[j + h]) h++;
      lcp[r] = h;
      if (h > 0) h--;
    }
  }
  return lcp;
}

function findOccurrences(s, pattern, sa) {
  const n = s.length, m = pattern.length;
  const cmp = (i) => {
    // Compare s.substring(i) with pattern
    let a = i, b = 0;
    while (a < n && b < m) {
      const da = s.charCodeAt(a), db = pattern.charCodeAt(b);
      if (da !== db) return da - db;
      a++; b++;
    }
    if (b === m) return 0; // pattern exhausted
    return -1; // pattern longer
  };
  // lower bound
  let lo = 0, hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const c = cmp(sa[mid]);
    if (c < 0) lo = mid + 1; else hi = mid;
  }
  const l = lo;
  // upper bound: last index where prefix equals pattern -> first greater than pattern
  lo = 0; hi = n;
  const cmpUpper = (i) => {
    let a = i, b = 0;
    while (a < n && b < m) {
      const da = s.charCodeAt(a), db = pattern.charCodeAt(b);
      if (da !== db) return da - db;
      a++; b++;
    }
    // if s suffix shorter than pattern but matched to end of suffix, it's smaller
    return a === n && b < m ? -1 : 1; // ensure strictly greater for upper bound
  };
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const c = cmpUpper(sa[mid]);
    if (c <= 0) lo = mid + 1; else hi = mid;
  }
  const r = lo;
  return [l, r];
}

// Counting distinct substrings using SA and LCP: n*(n+1)/2 - sum(LCP)
function countDistinctSubstrings(s) {
  const sa = buildSuffixArray(s);
  const lcp = buildLCP(s, sa);
  const n = s.length;
  let total = (n * (n + 1)) / 2;
  let sumLcp = 0; for (let i = 0; i < n; i++) sumLcp += lcp[i];
  return total - sumLcp;
}

// Tests
const s = 'banana';
const sa = buildSuffixArray(s);
const lcp = buildLCP(s, sa);
console.log('SA banana:', sa, 'LCP:', lcp);
console.log('countDistinctSubstrings banana:', countDistinctSubstrings('banana'));
console.log('findOccurrences("ana"):', findOccurrences(s, 'ana', sa));

module.exports = { buildSuffixArray, buildLCP, findOccurrences, countDistinctSubstrings };


