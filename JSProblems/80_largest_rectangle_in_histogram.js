/**
 * Problem 80: Largest Rectangle in Histogram (Hard)
 * Monotonic stack of increasing heights; compute width by previous less and next less.
 * Time: O(n)
 */

function largestRectangleArea(heights) {
  const st = [];
  let best = 0;
  heights.push(0);
  for (let i=0;i<heights.length;i++) {
    while (st.length && heights[st[st.length-1]] > heights[i]) {
      const h = heights[st.pop()];
      const l = st.length ? st[st.length-1] + 1 : 0;
      const r = i - 1;
      best = Math.max(best, h * (r - l + 1));
    }
    st.push(i);
  }
  heights.pop();
  return best;
}

// Tests
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10

module.exports = largestRectangleArea;


