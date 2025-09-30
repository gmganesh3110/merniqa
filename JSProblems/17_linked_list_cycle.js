/**
 * Problem 17: Linked List Cycle (Easy)
 * Given a linked list head, return true if there is a cycle.
 * Approach: Floyd's tortoise and hare.
 * Time: O(n)  Space: O(1)
 * Here we simulate with next pointers in objects.
 */

function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// Tests
const a = {val:1}, b={val:2}, c={val:3}, d={val:4};
a.next=b; b.next=c; c.next=d; d.next=null;
console.log(hasCycle(a)); // false
d.next=b; // create cycle
console.log(hasCycle(a)); // true

module.exports = hasCycle;


