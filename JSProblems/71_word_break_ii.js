/**
 * Problem 71: Word Break II (Upper-Medium)
 * Return all possible sentences; memoized DFS.
 */

function wordBreakII(s, wordDict) {
  const dict = new Set(wordDict);
  const memo = new Map();
  function dfs(i){
    if (memo.has(i)) return memo.get(i);
    const res = [];
    if (i === s.length) { res.push(''); memo.set(i,res); return res; }
    for (let j=i+1;j<=s.length;j++) {
      const w = s.slice(i,j);
      if (dict.has(w)) {
        for (const tail of dfs(j)) res.push(tail ? w+' '+tail : w);
      }
    }
    memo.set(i,res); return res;
  }
  return dfs(0);
}

// Tests
console.log(wordBreakII('catsanddog',['cat','cats','and','sand','dog']));

module.exports = wordBreakII;


