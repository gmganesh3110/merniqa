/**
 * Problem 55: Serialize and Deserialize Binary Tree (Upper-Medium)
 * Use pre-order with null markers to serialize; deserialize recursively.
 * Time: O(n)  Space: O(n)
 */

function serialize(root) {
  const out = [];
  (function dfs(node){
    if (!node) { out.push('#'); return; }
    out.push(String(node.val));
    dfs(node.left); dfs(node.right);
  })(root);
  return out.join(',');
}

function deserialize(data) {
  const it = data.split(',');
  let idx = 0;
  function build(){
    const tok = it[idx++];
    if (tok === '#' || tok === undefined) return null;
    const node = { val: Number(tok), left: null, right: null };
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}

// Tests
const root = {val:1,left:{val:2},right:{val:3,left:{val:4},right:{val:5}}};
const s = serialize(root);
const r2 = deserialize(s);
console.log(s);
console.log(JSON.stringify(r2));

module.exports = { serialize, deserialize };


