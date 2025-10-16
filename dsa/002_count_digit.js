// Write a function to count the number of digits in a number

// approach 1
// time complexity: O(log n)
// space complexity: O(1)

// pseudo code
// 1. initialize a variable to 0
// 2. iterate through the number
// 3. divide the number by 10
// 4. increment the count
// 5. return the count

function countDigit(n){
    if(n===0){
        return 1;
    }
    // convert negative number to positive
    n=Math.abs(n);
    let count=0;
    while(n>0){
        n=Math.floor(n/10);
        count++
    }  
    return count;
}
// positive numbers
 console.log(countDigit(24578364783468))
// negative numbers
console.log(countDigit(-24578364783468))
// duplicate numbers
console.log(countDigit(2457836478346824578364783468))
// mixed numbers
console.log(countDigit(2457836478346824578364783468))
// string array
console.log(countDigit(["1","2","3","4","5","6","7","8","9","10"]))

