/**
 * Problem 56: Implement Trie (Prefix Tree) (Medium)
 * Supports insert, search, startsWith.
 */

class TrieNode {
  constructor() { this.children = new Map(); this.end = false; }
}

class Trie {
  constructor(){ this.root = new TrieNode(); }
  insert(word){
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.end = true;
  }
  search(word){
    const node = this._traverse(word);
    return !!node && node.end;
  }
  startsWith(prefix){
    return !!this._traverse(prefix);
  }
  _traverse(s){
    let node = this.root;
    for (const ch of s) {
      node = node.children.get(ch);
      if (!node) return null;
    }
    return node;
  }
}

// Tests
const trie = new Trie();
trie.insert('apple');
console.log(trie.search('apple')); // true
console.log(trie.search('app')); // false
console.log(trie.startsWith('app')); // true
trie.insert('app');
console.log(trie.search('app')); // true

module.exports = Trie;


