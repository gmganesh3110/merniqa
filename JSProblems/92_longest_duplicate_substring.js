/**
 * Problem 92: Longest Duplicate Substring (Hard)
 * Binary search on length + rolling hash (Rabin–Karp) with mod; detect duplicates.
 */

function longestDupSubstring(s) {
  const n = s.length, base = 911382323, mod = 2**61 - 1; // use JS BigInt-safe mul via helper
  const A = Array.from(s, ch => ch.charCodeAt(0) - 97 + 1);
  const pow = Array(n+1).fill(1n);
  for (let i=1;i<=n;i++) pow[i] = mul(pow[i-1], BigInt(base), mod);
  const pref = Array(n+1).fill(0n);
  for (let i=0;i<n;i++) pref[i+1] = add(mul(pref[i], BigInt(base), mod), BigInt(A[i]), mod);
  const getHash = (l,r)=> sub(pref[r], mul(pref[l], pow[r-l], mod), mod);
  function check(L){
    const seen = new Map();
    for (let i=0;i+L<=n;i++){
      const h = getHash(i, i+L).toString();
      if (seen.has(h)) return i; // collision unlikely with big mod
      seen.set(h, i);
    }
    return -1;
  }
  let lo=1, hi=n, start=-1, best=0;
  while (lo<=hi){
    const mid = (lo+hi)>>1;
    const idx = check(mid);
    if (idx!==-1){ best=mid; start=idx; lo=mid+1; } else hi=mid-1;
  }
  return best? s.slice(start,start+best):"";
}

// BigInt helpers implementing (a*b)%mod with 128-bit safety emulation
function add(a,b,m){ a+=b; if(a>=m) a-=m; return a; }
function sub(a,b,m){ a-=b; if(a<0) a+=m; return a; }
function mul(a,b,m){ // using BigInt with mod 2^61-1 approximation
  const x = a*b;
  const low = x & ((1n<<61n)-1n);
  const high = x>>61n;
  let res = low + high;
  if (res >= m) res -= m;
  return res;
}

// Tests
console.log(longestDupSubstring('banana')); // 'ana'

module.exports = longestDupSubstring;


