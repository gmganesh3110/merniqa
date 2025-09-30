/**
 * Problem 91: Reverse Nodes in k-Group (Hard)
 * Given linked list head, reverse nodes in groups of k. If remaining < k, leave as-is.
 * Here we implement a simple linked list structure for demo.
 */

function reverseKGroup(head, k) {
  if (!head || k <= 1) return head;
  const dummy = { val: 0, next: head };
  let groupPrev = dummy;
  while (true) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break;
    const groupNext = kth.next;
    // reverse group
    let prev = groupNext, cur = groupPrev.next;
    while (cur !== groupNext) {
      const nxt = cur.next;
      cur.next = prev;
      prev = cur;
      cur = nxt;
    }
    const tmp = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = tmp;
  }
  return dummy.next;
}

// Helpers and tests
function fromArray(a){ let d={val:0,next:null},p=d; for(const x of a){ p.next={val:x,next:null}; p=p.next;} return d.next; }
function toArray(h){ const r=[]; while(h){ r.push(h.val); h=h.next; } return r; }
console.log(toArray(reverseKGroup(fromArray([1,2,3,4,5]),2))); // [2,1,4,3,5]
console.log(toArray(reverseKGroup(fromArray([1,2,3,4,5]),3))); // [3,2,1,4,5]

module.exports = reverseKGroup;


