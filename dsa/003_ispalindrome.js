// Write a function to check if a number is a palindrome

// approach 1
// time complexity: O(log n)
// space complexity: O(1)

// pseudo code
// 1. if the number is negative, return false
// 2. initialize a variable to 0
// 3. iterate through the number
// 4. divide the number by 10
// 5. increment the count
// 6. return the count

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x<0) return false
    let rev=0;
    let cpx=x;
    while(x>0){
        let rem=x%10;
        rev=(rev*10)+rem;
        x=Math.floor(x/10)
        }
    return rev===cpx;
    
};

console.log(isPalindrome(121))
console.log(isPalindrome(-121))
console.log(isPalindrome(123))
console.log(isPalindrome(12321))
console.log(isPalindrome(123210))
console.log(isPalindrome(123210))