/**
 * Problem 99: LRU Cache (Map iteration trick) (Educational)
 * JS Map maintains insertion order; emulate LRU by deleting and re-inserting on get/put.
 * Note: Operations are O(1) on average but eviction uses first key via map.keys().next().value
 */

class LRUCacheMapOnly {
  constructor(capacity){ this.cap=capacity; this.map=new Map(); }
  get(key){ if(!this.map.has(key)) return -1; const val=this.map.get(key); this.map.delete(key); this.map.set(key,val); return val; }
  put(key,val){ if(this.map.has(key)) this.map.delete(key); this.map.set(key,val); if(this.map.size>this.cap){ const first=this.map.keys().next().value; this.map.delete(first);} }
}

// Tests
const l = new LRUCacheMapOnly(2);
l.put(1,1); l.put(2,2); console.log(l.get(1)); // 1
l.put(3,3); console.log(l.get(2)); // -1

module.exports = LRUCacheMapOnly;


