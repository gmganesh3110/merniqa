/**
 * Problem 115: Longest String Chain (Medium/Hard-)
 * Sort by length; dp[word] = 1 + max dp[predecessor].
 */

function longestStrChain(words){
  words.sort((a,b)=>a.length-b.length);
  const dp=new Map(); let best=0;
  for(const w of words){
    let cur=1;
    for(let i=0;i<w.length;i++){
      const prev=w.slice(0,i)+w.slice(i+1);
      cur=Math.max(cur,(dp.get(prev)||0)+1);
    }
    dp.set(w,cur); best=Math.max(best,cur);
  }
  return best;
}

// Tests
console.log(longestStrChain(["a","b","ba","bca","bda","bdca"])); // 4

module.exports = longestStrChain;


