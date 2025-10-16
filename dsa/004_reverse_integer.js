// Write a function to reverse an integer
//Given a signed 32-bit integer x, return x with its digits reversed. 
// If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
// approach 1
// time complexity: O(log n)
// space complexity: O(1)

// pseudo code
// 1. initialize a variable to 0
// 2. iterate through the number
// 3. divide the number by 10
// 4. increment the count
// 5. return the count

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let rev=0;
    let cpx=x;
    x=Math.abs(x);
    while(x>0){
        let rem=x%10;
        rev=(rev*10)+rem;
        x=Math.floor(x/10)
    }
    let limit=Math.pow(2,31)
    if(rev<-limit||rev>limit) return 0;
    return (cpx<0)? -rev:rev
};

console.log(reverse(123))
console.log(reverse(-123))
console.log(reverse(12321))
console.log(reverse(123210))
console.log(reverse(123210))