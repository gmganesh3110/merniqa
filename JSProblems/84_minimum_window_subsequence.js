/**
 * Problem 84: Minimum Window Subsequence (Hard-)
 * Given S and T, find the minimum window in S which has T as a subsequence.
 * Two-pass DP: forward pass to find ends; backward to minimize.
 */

function minWindowSubsequence(S, T) {
  const m=S.length,n=T.length; let ans="";
  let i=0;
  while (i<m){
    let ti=0;
    while (i<m){ if (S[i]===T[ti]) ti++; if (ti===n) break; i++; }
    if (ti<n) break;
    let end=i+1; ti=n-1;
    while (i>=0){ if (S[i]===T[ti]) ti--; if (ti<0) break; i--; }
    const start=i; const cand=S.slice(start,end);
    if (!ans || cand.length<ans.length) ans=cand;
    i=start+1;
  }
  return ans;
}

// Tests
console.log(minWindowSubsequence("abcdebdde","bde")); // "bcde"

module.exports = minWindowSubsequence;


