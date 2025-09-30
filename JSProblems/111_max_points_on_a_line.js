/**
 * Problem 111: Max Points on a Line (Hard)
 * For each point, count slopes to others with normalization; handle duplicates/verticals.
 * Time: O(n^2)
 */

function maxPoints(points){
  if(points.length<=2) return points.length;
  function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ const t=a%b; a=b; b=t;} return a; }
  let best=0;
  for(let i=0;i<points.length;i++){
    const map=new Map(); let dup=1; let cur=0;
    for(let j=i+1;j<points.length;j++){
      let dx=points[j][0]-points[i][0]; let dy=points[j][1]-points[i][1];
      if(dx===0&&dy===0){ dup++; continue; }
      const g=gcd(dx,dy); dx/=g; dy/=g; if(dx<0){ dx=-dx; dy=-dy; } else if(dx===0){ dy=1; }
      const key=dx+','+dy; const val=(map.get(key)||0)+1; map.set(key,val); cur=Math.max(cur,val);
    }
    best=Math.max(best, cur+dup);
  }
  return best;
}

// Tests
console.log(maxPoints([[1,1],[2,2],[3,3]])); // 3

module.exports = maxPoints;


