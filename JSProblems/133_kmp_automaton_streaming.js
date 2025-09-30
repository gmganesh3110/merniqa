/**
 * Problem 133: KMP Automaton for Streaming Matching (Hard, ~100 LOC)
 *
 * Build a DFA-like automaton for a pattern using KMP prefix function, enabling
 * streaming text processing: feed(char) updates state and tells if we matched.
 * This allows handling large streams without storing the entire text.
 */

function buildKMPAutomaton(pattern) {
  const m = pattern.length;
  // prefix function (pi)
  const pi = Array(m).fill(0);
  for (let i = 1; i < m; i++) {
    let j = pi[i - 1];
    while (j > 0 && pattern[i] !== pattern[j]) j = pi[j - 1];
    if (pattern[i] === pattern[j]) j++;
    pi[i] = j;
  }
  // automaton: for each state j and next character c, next state = go[j][c]
  // We'll implement on-the-fly transition function using pi to keep memory small.
  let state = 0;
  function feed(ch) {
    while (state > 0 && ch !== pattern[state]) state = pi[state - 1];
    if (ch === pattern[state]) state++;
    if (state === m) {
      state = pi[m - 1];
      return true; // match occurred ending at current character
    }
    return false;
  }
  function reset() { state = 0; }
  return { feed, reset, pi };
}

// Example and tests
const kmp = buildKMPAutomaton('ababaca');
const text = 'bacbabababacababaca';
let matches = 0;
for (const ch of text) if (kmp.feed(ch)) matches++;
console.log('KMP automaton matches:', matches);

module.exports = buildKMPAutomaton;


