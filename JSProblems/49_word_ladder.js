/**
 * Problem 49: Word Ladder (Upper-Medium)
 * Shortest transformation sequence length from beginWord to endWord by changing one letter at a time, using words in list.
 * Approach: BFS with generic states (patterns).
 */

function ladderLength(beginWord, endWord, wordList) {
  const dict = new Set(wordList);
  if (!dict.has(endWord)) return 0;
  const adj = new Map();
  const add = (k,v)=>{ if(!adj.has(k)) adj.set(k,[]); adj.get(k).push(v); };
  const words = new Set(dict); words.add(beginWord);
  for (const w of words) {
    for (let i=0;i<w.length;i++) {
      const pat = w.slice(0,i)+'*'+w.slice(i+1);
      add(pat, w);
    }
  }
  const q = [[beginWord,1]];
  const seen = new Set([beginWord]);
  for (let qi=0; qi<q.length; qi++) {
    const [w, d] = q[qi];
    if (w === endWord) return d;
    for (let i=0;i<w.length;i++) {
      const pat = w.slice(0,i)+'*'+w.slice(i+1);
      for (const nei of (adj.get(pat)||[])) {
        if (!seen.has(nei)) { seen.add(nei); q.push([nei,d+1]); }
      }
    }
  }
  return 0;
}

// Tests
console.log(ladderLength("hit","cog", ["hot","dot","dog","lot","log","cog"])); // 5

module.exports = ladderLength;


