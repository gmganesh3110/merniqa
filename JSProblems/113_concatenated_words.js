/**
 * Problem 113: Concatenated Words (Hard)
 * Find all words that are concatenations of at least two shorter words from the list.
 * Sort by length; DP per word using a set of smaller words.
 */

function findAllConcatenatedWordsInADict(words){
  words.sort((a,b)=>a.length-b.length);
  const dict=new Set(); const res=[];
  function canMake(w){
    const n=w.length; const dp=Array(n+1).fill(false); dp[0]=true;
    for(let i=1;i<=n;i++){
      for(let j=(i===n?1:0);j<i;j++) if(dp[j]&&dict.has(w.slice(j,i))){ dp[i]=true; break; }
    }
    return dp[n];
  }
  for(const w of words){ if(!w) continue; if(canMake(w)) res.push(w); dict.add(w); }
  return res;
}

// Tests
console.log(findAllConcatenatedWordsInADict(["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]));

module.exports = findAllConcatenatedWordsInADict;


