/**
 * Problem 62: LRU Cache (Upper-Medium)
 * get/put in O(1) using Map + doubly linked list.
 */

class Node { constructor(k,v){ this.k=k; this.v=v; this.prev=null; this.next=null; } }

class LRUCache {
  constructor(capacity) {
    this.cap = capacity; this.map = new Map();
    this.head = new Node(0,0); this.tail = new Node(0,0);
    this.head.next = this.tail; this.tail.prev = this.head;
  }
  _remove(node){ node.prev.next = node.next; node.next.prev = node.prev; }
  _addFront(node){ node.next = this.head.next; node.prev = this.head; this.head.next.prev = node; this.head.next = node; }
  get(key){ if(!this.map.has(key)) return -1; const n=this.map.get(key); this._remove(n); this._addFront(n); return n.v; }
  put(key,value){ if(this.map.has(key)){ const n=this.map.get(key); n.v=value; this._remove(n); this._addFront(n); return; }
    const n=new Node(key,value); this.map.set(key,n); this._addFront(n);
    if(this.map.size>this.cap){ const lru=this.tail.prev; this._remove(lru); this.map.delete(lru.k); }
  }
}

// Tests
const lru = new LRUCache(2);
lru.put(1,1); lru.put(2,2); console.log(lru.get(1)); // 1
lru.put(3,3); console.log(lru.get(2)); // -1
lru.put(4,4); console.log(lru.get(1)); // -1
console.log(lru.get(3)); // 3
console.log(lru.get(4)); // 4

module.exports = LRUCache;


