/**
 * Problem 90: Edit Distance - Return One Optimal Sequence of Edits (Hard-)
 * Build DP then reconstruct operations path (insert/delete/replace/keep).
 */

function editScript(a, b) {
  const m=a.length,n=b.length;
  const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      if(a[i-1]===b[j-1]) dp[i][j]=dp[i-1][j-1];
      else dp[i][j]=1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
    }
  }
  const ops=[]; let i=m,j=n;
  while(i>0||j>0){
    if(i>0&&j>0&&a[i-1]===b[j-1]){ ops.push(['keep',a[i-1]]); i--; j--; }
    else if(i>0&&dp[i][j]===dp[i-1][j]+1){ ops.push(['delete',a[i-1]]); i--; }
    else if(j>0&&dp[i][j]===dp[i][j-1]+1){ ops.push(['insert',b[j-1]]); j--; }
    else { ops.push(['replace',a[i-1],b[j-1]]); i--; j--; }
  }
  ops.reverse();
  return { distance: dp[m][n], ops };
}

// Tests
console.log(editScript('horse','ros'));

module.exports = editScript;


