/**
 * Problem 82: Word Search II (Hard)
 * Given board and list of words, find all present words.
 * Trie + backtracking with pruning.
 */

class TrieNode { constructor(){ this.children=new Map(); this.word=null; } }
function buildTrie(words){
  const root=new TrieNode();
  for (const w of words){ let node=root; for (const ch of w){ if(!node.children.has(ch)) node.children.set(ch,new TrieNode()); node=node.children.get(ch);} node.word=w; }
  return root;
}

function findWords(board, words) {
  const m=board.length, n=board[0].length, res=[];
  const root=buildTrie(words);
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  const seen=Array.from({length:m},()=>Array(n).fill(false));
  function dfs(r,c,node){
    const ch=board[r][c];
    const nxt=node.children.get(ch);
    if (!nxt) return;
    if (nxt.word){ res.push(nxt.word); nxt.word=null; }
    seen[r][c]=true;
    for (const [dr,dc] of dirs){ const nr=r+dr,nc=c+dc; if(nr>=0&&nc>=0&&nr<m&&nc<n&&!seen[nr][nc]) dfs(nr,nc,nxt); }
    seen[r][c]=false;
    if (nxt.children.size===0) node.children.delete(ch);
  }
  for (let r=0;r<m;r++) for (let c=0;c<n;c++) dfs(r,c,root);
  return res;
}

// Tests
console.log(findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],["oath","pea","eat","rain"])); // ["oath","eat"]

module.exports = findWords;


