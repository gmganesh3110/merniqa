// Write a function to find the second largest number in an array

// approach 1
// time complexity: O(n)
// space complexity: O(1)

// pseudo code
// 1. initialize two variables to 0
// 2. iterate through the array
// 3. if the current element is greater than the first largest, then update the second largest to the first largest and the first largest to the current element
// 4. else if the current element is greater than the second largest, then update the second largest to the current element
// 5. return the second largest

function findSecondLarget(arr){
    if(arr.length<2){
        return "Array should have at least two elements";
    }
    let firstlargest=-Infinity;
    let secondlargest=-Infinity;
    for(let i=0;i<arr.length;i++){
        if(arr[i]>firstlargest){
            secondlargest=firstlargest;
            firstlargest=arr[i]
        }
        else if(arr[i]>secondlargest && arr[i]<firstlargest){
            secondlargest=arr[i]
        }
    }
    return secondlargest;
}
// positive numbers
console.log(findSecondLarget([1, 2, 3, 4, 5, 6, 7, 4, 3, 6, 6, 8, 9, 10]));
// negative numbers 
console.log(findSecondLarget([-1, -2, -3, -4, -5, -6, -7, -4, -3, -6, -6, -8, -9, -10]));
// duplicate numbers and negative numbers
console.log(findSecondLarget([1, 2, 3, 4, 5, 6, 7, 4, 3, 6, 6, 8, 9, 10, 10]));
// mixed numbers and negative numbers
console.log(findSecondLarget([1, 2, 3, 4, 5, 6, 7, 4, 3, 6, 6, 8, 9, 10, 10, -1, -2, -3, -4, -5, -6, -7, -4, -3, -6, -6, -8, -9, -10]));
// empty array
console.log(findSecondLarget([]));
// string array and negative numbers
console.log(findSecondLarget(["1", "2", "3", "4", "5", "6", "7", "4", "3", "6", "6", "8", "9", "10"]));
// duplicate numbers and positive numbers
console.log(findSecondLarget([10,20,20]))
// duplicate numbers and negative numbers
console.log(findSecondLarget([-10,-20,-20]))
// duplicate numbers and mixed numbers
console.log(findSecondLarget([10,20,20,-10,-20,-20]))
// duplicate numbers and string array
console.log(findSecondLarget(["10","20","20","-10","-20","-20"]))
// duplicate numbers and empty array
console.log(findSecondLarget([]))

try {
    
} catch (error) {
    
}