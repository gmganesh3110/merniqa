/**
 * Problem 123: Smallest Sufficient Team (Hard)
 * Given req_skills and people (each with some skills), find smallest team covering all skills.
 * Bitmask DP: dp[mask] = team indices; update with each person.
 */

function smallestSufficientTeam(req_skills, people){
  const m=req_skills.length; const skillIndex=new Map(); req_skills.forEach((s,i)=>skillIndex.set(s,i));
  const pmasks=people.map(p=>{ let mask=0; for(const s of p) if(skillIndex.has(s)) mask|=1<<skillIndex.get(s); return mask; });
  const full=(1<<m)-1; const dp=new Map(); dp.set(0,[]);
  for(let i=0;i<pmasks.length;i++){
    const pMask=pmasks[i]; if(pMask===0) continue;
    const cur=new Map(dp);
    for(const [mask,team] of dp.entries()){
      const nm=mask|pMask; if(!cur.has(nm) || cur.get(nm).length > team.length+1) cur.set(nm, [...team,i]);
    }
    dp.clear(); for(const [k,v] of cur) dp.set(k,v);
  }
  return dp.get(full)||[];
}

// Tests
console.log(smallestSufficientTeam(["java","nodejs","reactjs"],[ ["java"],["nodejs"],["nodejs","reactjs"] ])); // [0,2]

module.exports = smallestSufficientTeam;


