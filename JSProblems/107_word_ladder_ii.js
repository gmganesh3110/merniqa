/**
 * Problem 107: Word Ladder II (Hard)
 * Return all shortest transformation sequences from beginWord to endWord.
 * BFS to build levels/parents, then backtrack paths.
 */

function findLadders(beginWord, endWord, wordList) {
  const dict = new Set(wordList);
  if (!dict.has(endWord)) return [];
  const parents = new Map();
  const level = new Set([beginWord]);
  let found = false;
  const visited = new Set([beginWord]);
  while (level.size && !found) {
    const next = new Set();
    for (const w of level) visited.add(w);
    for (const w of level) {
      for (let i=0;i<w.length;i++) {
        for (let c=97;c<=122;c++) {
          const nw = w.slice(0,i)+String.fromCharCode(c)+w.slice(i+1);
          if (!dict.has(nw) || visited.has(nw)) continue;
          if (!parents.has(nw)) parents.set(nw, new Set());
          parents.get(nw).add(w);
          if (nw === endWord) found = true;
          next.add(nw);
        }
      }
    }
    level.clear();
    for (const x of next) level.add(x);
  }
  if (!found) return [];
  const res = [];
  function backtrack(word, path) {
    if (word === beginWord) { res.push([beginWord, ...path]); return; }
    for (const p of (parents.get(word)||[])) backtrack(p, [word, ...path]);
  }
  backtrack(endWord, []);
  return res;
}

// Tests
console.log(findLadders("hit","cog", ["hot","dot","dog","lot","log","cog"]).length); // 2

module.exports = findLadders;


