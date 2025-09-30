/**
 * Problem 104: Shortest Palindrome (Hard)
 * Find shortest palindrome by adding characters in front of s.
 * Approach: KMP prefix on s + '#' + reverse(s) to find longest palindromic prefix.
 */

function shortestPalindrome(s){
  const r = s.split('').reverse().join('');
  const t = s + '#' + r;
  const lps = Array(t.length).fill(0);
  for (let i=1;i<t.length;i++){
    let j = lps[i-1];
    while (j>0 && t[i]!==t[j]) j = lps[j-1];
    if (t[i]===t[j]) j++;
    lps[i]=j;
  }
  const palLen = lps[t.length-1];
  return r.slice(0, s.length - palLen) + s;
}

// Tests
console.log(shortestPalindrome('aacecaaa')); // 'aaacecaaa'
console.log(shortestPalindrome('abcd')); // 'dcbabcd'

module.exports = shortestPalindrome;


