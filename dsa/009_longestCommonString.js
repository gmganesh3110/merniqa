// Write a function to find the longest common string in an array
// approach 1
// time complexity: O(n)
// space complexity: O(1)

// pseudo code
// 1. initialize a variable to 0
// 2. iterate through the array
// 3. if the current element is not equal to the value, then return the prefix
// 4. return the prefix
function longestCommonString(arr){
    let prefix=''
    for(let i=0;i<arr[0].length;i++){
        let char=arr[0][i]
        for(let j=0;j<arr.length;j++){
            if(char!==arr[j][i]){
                return prefix ;
            }
        }
        prefix+=char
    }
    return prefix;
}
console.log(longestCommonString(["flower","flow","fly"]))
