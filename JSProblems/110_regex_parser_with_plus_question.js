/**
 * Problem 110: Regex Matching Extended (.+?*) (Hard)
 * Add support for '.', '*', '+', '?' to classic matcher.
 * DP where dp[i][j] = s[:i] matches p[:j].
 */

function isMatchExt(s, p){
  const m=s.length,n=p.length; const dp=Array.from({length:m+1},()=>Array(n+1).fill(false));
  dp[0][0]=true;
  for(let j=1;j<=n;j++){
    const pj=p[j-1];
    if(pj==='*'||pj==='?') dp[0][j]=dp[0][j-2]||false;
  }
  const match=(i,j)=> p[j-1]==='.'||s[i-1]===p[j-1];
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      const pj=p[j-1];
      if(pj==='*') dp[i][j]=dp[i][j-2]||( (p[j-2]==='.'||p[j-2]===s[i-1]) && dp[i-1][j] );
      else if(pj==='+') dp[i][j]= ( (p[j-2]==='.'||p[j-2]===s[i-1]) && (dp[i-1][j]||dp[i-1][j-2]) );
      else if(pj==='?') dp[i][j]= dp[i][j-2] || ( (p[j-2]==='.'||p[j-2]===s[i-1]) && dp[i-1][j-2] );
      else dp[i][j]= match(i,j) && dp[i-1][j-1];
    }
  }
  return dp[m][n];
}

// Tests
console.log(isMatchExt('aaa','a+')); // true
console.log(isMatchExt('ab','a?b')); // true
console.log(isMatchExt('ab','a?c')); // false

module.exports = isMatchExt;


