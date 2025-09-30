/**
 * Problem 48: Task Scheduler (Upper-Medium)
 * Given tasks and cooldown n, find least intervals to finish all tasks.
 * Approach: Greedy using formula based on max frequency.
 */

function leastInterval(tasks, n) {
  const freq = new Map();
  for (const t of tasks) freq.set(t, (freq.get(t)||0)+1);
  let maxf = 0, maxCount = 0;
  for (const f of freq.values()) { if (f>maxf) { maxf=f; maxCount=1; } else if (f===maxf) maxCount++; }
  const partCount = maxf - 1;
  const partLen = n - (maxCount - 1);
  const emptySlots = Math.max(0, partCount * partLen);
  const remaining = tasks.length - maxf * maxCount;
  const idles = Math.max(0, emptySlots - remaining);
  return tasks.length + idles;
}

// Tests
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8

module.exports = leastInterval;


