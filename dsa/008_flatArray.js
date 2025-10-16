// Write a function to flatten a nested array
// approach 1
// time complexity: O(n)
// space complexity: O(1)

// pseudo code
// 1. initialize a variable to 0
// 2. iterate through the array
// 3. if the current element is an array, then flatten the array
// 4. return the array

function flatArray(arr){
    let result=[];
    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            result.push(...flatArray(arr[i])); 
        }
        else{
            result.push(arr[i])
        }
    }
    return result;
}
console.log(flatArray([1,2,3,[2,3,4,5],[32,4,[43,43,5,6]]]))
