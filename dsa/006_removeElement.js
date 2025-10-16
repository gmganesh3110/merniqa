// Write a function to remove an element from an array
// approach 1
// time complexity: O(n)
// space complexity: O(1)

// pseudo code
// 1. initialize a variable to 0
// 2. iterate through the array
// 3. if the current element is not equal to the value, then increment the variable
// 4. return the variable
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let x=0;
     for(let i=0;i<nums.length;i++){
         if(nums[i]!==val){
             nums[x]=nums[i]
             x=x+1;
         }

     }
     return x;
};

console.log(removeElement([1,2,3,4,5], 3))
console.log(removeElement([1,2,3,4,5], 3))