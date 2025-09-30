/**
 * Problem 106: Maximal Rectangle in Binary Matrix (Hard)
 * For each row, treat as histogram of consecutive ones; use largest-rectangle-in-histogram.
 */

function maximalRectangle(matrix){
  if(!matrix.length) return 0; const m=matrix.length,n=matrix[0].length;
  const heights=Array(n).fill(0); let best=0;
  for(let r=0;r<m;r++){
    for(let c=0;c<n;c++) heights[c] = matrix[r][c]==='1'||matrix[r][c]===1 ? heights[c]+1 : 0;
    best = Math.max(best, largestHistogram(heights));
  }
  return best;
}

function largestHistogram(h){
  const st=[]; let ans=0; const a=h.concat(0);
  for(let i=0;i<a.length;i++){
    while(st.length && a[st[st.length-1]]>a[i]){
      const height=a[st.pop()]; const left=st.length?st[st.length-1]+1:0; const right=i-1;
      ans=Math.max(ans,height*(right-left+1));
    }
    st.push(i);
  }
  return ans;
}

// Tests
console.log(maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])); // 6

module.exports = maximalRectangle;


