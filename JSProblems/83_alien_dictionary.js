/**
 * Problem 83: Alien Dictionary (Hard)
 * Given sorted words in alien language, return a possible order of letters.
 * Build graph of precedence and topologically sort; detect cycles.
 */

function alienOrder(words) {
  const adj = new Map();
  for (const w of words) for (const ch of w) if (!adj.has(ch)) adj.set(ch, new Set());
  for (let i=0;i<words.length-1;i++) {
    const a=words[i], b=words[i+1];
    if (a.length>b.length && a.startsWith(b)) return ""; // invalid
    const len=Math.min(a.length,b.length);
    for (let k=0;k<len;k++) if (a[k]!==b[k]) { adj.get(a[k]).add(b[k]); break; }
  }
  const indeg = new Map(); for (const [u,vs] of adj) { if(!indeg.has(u)) indeg.set(u,0); for (const v of vs) indeg.set(v,(indeg.get(v)||0)+1); }
  const q=[]; for (const [u,d] of indeg) if (d===0) q.push(u);
  let out="";
  for (let qi=0; qi<q.length; qi++){
    const u=q[qi]; out+=u;
    for (const v of (adj.get(u)||[])) { indeg.set(v, indeg.get(v)-1); if (indeg.get(v)===0) q.push(v); }
  }
  return out.length===adj.size ? out : "";
}

// Tests
console.log(alienOrder(["wrt","wrf","er","ett","rftt"])); // "wertf"

module.exports = alienOrder;


