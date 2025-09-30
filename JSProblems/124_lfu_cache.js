/**
 * Problem 124: LFU Cache (Hard)
 *
 * Design and implement a data structure for Least Frequently Used (LFU) cache.
 * It should support the following operations in O(1) average time:
 * - get(key) -> returns value or -1 if not exists
 * - put(key, value) -> insert/update; evict LFU when capacity exceeded
 *   If there is a tie (multiple keys with the same frequency), the LRU (least recently used)
 *   key among them should be evicted.
 *
 * Approach:
 * - Maintain:
 *   1) keyToNode: Map key -> Node { key, value, freq, prev, next }
 *   2) freqToList: Map freq -> DoublyLinkedList of nodes (recency order per frequency)
 *   3) minFreq: integer tracking current minimum frequency in the cache
 * - On get:
 *   - If key not in map -> -1
 *   - Else bump the node's frequency: remove from old list, add to list for freq+1 at head
 *   - If old list becomes empty and minFreq equals old frequency, increment minFreq
 * - On put:
 *   - If capacity is 0, do nothing
 *   - If key exists, update its value and bump frequency (same as get)
 *   - Else, if at capacity, evict from list at minFreq the tail (LRU in that freq),
 *     remove that key from keyToNode
 *   - Insert new node with freq=1 into freqToList(1) at head; set minFreq=1
 *
 * This structure yields amortized O(1) operations.
 */

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.freq = 1;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = { prev: null, next: null }; // sentinel head
    this.tail = { prev: null, next: null }; // sentinel tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  // Insert node right after head (most recently used position for this frequency)
  addFirst(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++;
  }
  // Remove a specific node from the list
  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
    this.size--;
  }
  // Remove the least recently used node (the one before tail)
  removeLast() {
    if (this.size === 0) return null;
    const lru = this.tail.prev;
    this.remove(lru);
    return lru;
  }
  isEmpty() {
    return this.size === 0;
  }
}

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.minFreq = 0;
    this.keyToNode = new Map();
    this.freqToList = new Map();
  }

  get(key) {
    if (!this.keyToNode.has(key)) return -1;
    const node = this.keyToNode.get(key);
    this._touch(node);
    return node.value;
  }

  put(key, value) {
    if (this.capacity === 0) return;
    if (this.keyToNode.has(key)) {
      const node = this.keyToNode.get(key);
      node.value = value;
      this._touch(node);
      return;
    }
    if (this.size === this.capacity) {
      // Evict from minFreq list
      const list = this.freqToList.get(this.minFreq);
      const evicted = list.removeLast();
      if (evicted) {
        this.keyToNode.delete(evicted.key);
        this.size--;
      }
    }
    // Insert new node
    const node = new Node(key, value);
    this.keyToNode.set(key, node);
    if (!this.freqToList.has(1)) this.freqToList.set(1, new DoublyLinkedList());
    this.freqToList.get(1).addFirst(node);
    this.minFreq = 1;
    this.size++;
  }

  // Bump node's frequency and move it to the head of the new frequency list
  _touch(node) {
    const oldFreq = node.freq;
    const oldList = this.freqToList.get(oldFreq);
    oldList.remove(node);
    if (oldList.isEmpty() && this.minFreq === oldFreq) {
      this.minFreq++;
    }
    node.freq = oldFreq + 1;
    if (!this.freqToList.has(node.freq)) this.freqToList.set(node.freq, new DoublyLinkedList());
    this.freqToList.get(node.freq).addFirst(node);
  }
}

// Tests
// Example 1
const lfu = new LFUCache(2);
lfu.put(1, 1); // cache=[1:_]
lfu.put(2, 2); // cache=[1,2]
console.log(lfu.get(1)); // 1 (freq: 1->2)
lfu.put(3, 3); // evicts key=2 (freq 1), cache has {1(freq2),3(freq1)}
console.log(lfu.get(2)); // -1
console.log(lfu.get(3)); // 3
lfu.put(4, 4); // evicts key=1 (minFreq was 1? No, after get(1) it was 2; min list for freq=1 is {3}; so evict 3)
console.log(lfu.get(1)); // -1
console.log(lfu.get(3)); // -1
console.log(lfu.get(4)); // 4

module.exports = LFUCache;


