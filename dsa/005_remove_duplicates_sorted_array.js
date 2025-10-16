// Write a function to remove duplicates from a sorted array

// approach 1
// time complexity: O(n)
// space complexity: O(1)

// pseudo code
// 1. initialize a variable to 0
// 2. iterate through the array
// 3. if the current element is greater than the previous element, then increment the variable
// 4. return the variable
// 5. return the k value
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let x=0;
    for (let i=0;i<nums.length;i++){
        if(nums[x]<nums[i]){
            x=x+1
            nums[x]=nums[i]
        }
    }
    return x+1;
};

console.log(removeDuplicates([1,1,2]))
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))
console.log(removeDuplicates([1,1,2]))