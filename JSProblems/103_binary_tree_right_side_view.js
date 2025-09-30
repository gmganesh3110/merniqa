/**
 * Problem 103: Binary Tree Right Side View (Medium)
 * Return the values of the nodes you can see from the right side.
 * BFS by levels; take last node of each level.
 */

function rightSideView(root){
  const res=[]; if(!root) return res;
  const q=[root];
  for(let qi=0; qi<q.length;){
    const size=q.length-qi; let val;
    for(let i=0;i<size;i++){
      const node=q[qi++]; val=node.val;
      if(node.left) q.push(node.left);
      if(node.right) q.push(node.right);
    }
    res.push(val);
  }
  return res;
}

// Tests
const t={val:1,left:{val:2,right:{val:5}},right:{val:3,right:{val:4}}};
console.log(rightSideView(t)); // [1,3,4]

module.exports=rightSideView;


