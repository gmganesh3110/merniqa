/**
 * Problem 76: Median of Two Sorted Arrays (Hard)
 * Binary search on smaller array to find correct partition.
 * Time: O(log(min(m,n)))
 */

function findMedianSortedArrays(A, B) {
  if (A.length > B.length) return findMedianSortedArrays(B, A);
  const m = A.length, n = B.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = ((m + n + 1) >> 1) - i;
    const Aleft = i === 0 ? -Infinity : A[i - 1];
    const Aright = i === m ? Infinity : A[i];
    const Bleft = j === 0 ? -Infinity : B[j - 1];
    const Bright = j === n ? Infinity : B[j];
    if (Aleft <= Bright && Bleft <= Aright) {
      if (((m + n) & 1) === 1) return Math.max(Aleft, Bleft);
      return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
    } else if (Aleft > Bright) hi = i - 1; else lo = i + 1;
  }
  return 0;
}

// Tests
console.log(findMedianSortedArrays([1,3],[2])); // 2
console.log(findMedianSortedArrays([1,2],[3,4])); // 2.5

module.exports = findMedianSortedArrays;


