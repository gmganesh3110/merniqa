# JavaScript Interview Questions - 7 Years Experience Level (Senior Full-Stack Developer)

## Core JavaScript Fundamentals

1. **What is JavaScript?**
   JavaScript is a high-level, interpreted, dynamically typed, cross-platform and open-source programming language which supports functional and object-oriented programming.
   
   Uses:
   - Creating interactive web pages and user interfaces
   - Developing mobile and desktop applications
   - Implementing server-side programming with environments like Node.js

2. **What are the different data types in JavaScript?**
   **Primitive types:**
   - undefined, null, Boolean, Number, BigInt, String, Symbol
   
   **Non-primitive types:**
   - Object, Array, Function, Map, Set, Date, Error, Promise, ArrayBuffer

3. **What is the difference between null and undefined?**
   - `undefined` means a variable has been declared but not yet assigned a value
   - `null` is an assignment value representing the intentional absence of any object value
   - `null` data type is object

4. **What is the difference between == and === operators?**
   - `==` performs type coercion before comparison
   - `===` performs strict comparison without type coercion

5. **What is hoisting in JavaScript?**
   Hoisting is JavaScript's default behavior of moving declarations (variables and functions) to the top of their containing scope. Only declarations are hoisted, not initializations.
   
   - `var` variables are hoisted and initialized with `undefined`
   - `let` and `const` are hoisted but not initialized (Temporal Dead Zone)
   - Function declarations are fully hoisted

6. **What are var, let, and const?**
   - `var`: Function-scoped, hoisted, can be redeclared
   - `let`: Block-scoped, hoisted but not initialized, cannot be redeclared
   - `const`: Block-scoped, must be initialized, cannot be reassigned

## Functions and Scope

7. **What are closures in JavaScript?**
   A closure is a function that has access to variables from its outer (enclosing) function's scope, even after the outer function has finished executing.
   
   ```javascript
   function outerFunction() {
       const outerVariable = "I'm from outer function";
       return function innerFunction() {
           console.log(outerVariable); // Can access outerVariable
       };
   }
   const myFunction = outerFunction();
   myFunction(); // Output: "I'm from outer function"
   ```

8. **What is the purpose of the `this` keyword?**
   `this` refers to the object that is currently executing the function. Its value depends on how the function is called.

9. **What are the differences between call(), apply(), and bind()?**
   - `call()`: Invokes function with specified `this` value and individual arguments
   - `apply()`: Invokes function with specified `this` value and array of arguments
   - `bind()`: Returns a new function with specified `this` value and arguments

10. **What are arrow functions and how do they differ from regular functions?**
    - Arrow functions have lexical `this` binding
    - Cannot be used as constructors
    - Don't have their own `arguments` object
    - More concise syntax

11. **What are higher-order functions?**
    Functions that either take one or more functions as arguments or return another function as a result.

12. **What is a callback function?**
    A function that is passed as an argument to another function and is executed after the first function has completed its task.

## Asynchronous JavaScript

13. **What are Promises?**
    A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    
    States: pending, fulfilled, rejected

14. **What is async/await?**
    `async/await` is syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code.

15. **What is the event loop?**
    The event loop is the mechanism that allows JavaScript to perform non-blocking operations by offloading operations to the system kernel whenever possible.

16. **What is the difference between microtasks and macrotasks?**
    - Microtasks: Promise callbacks, queueMicrotask()
    - Macrotasks: setTimeout, setInterval, I/O operations

17. **What is callback hell and how to avoid it?**
    Callback hell occurs when multiple nested callbacks make code hard to read and maintain. Avoid using Promises, async/await, or modularizing code.

## Array Methods

18. **What is the difference between map(), filter(), and reduce()?**
    - `map()`: Transforms each element and returns new array
    - `filter()`: Returns new array with elements that pass test
    - `reduce()`: Reduces array to single value using accumulator

19. **What is the difference between forEach() and map()?**
    - `forEach()`: Executes function for each element, returns undefined
    - `map()`: Executes function for each element, returns new array

20. **What is the difference between slice() and splice()?**
    - `slice()`: Returns shallow copy of portion of array (non-destructive)
    - `splice()`: Changes array by removing/replacing elements (destructive)

## Objects and Prototypes

21. **What is prototype and prototype inheritance?**
    JavaScript uses prototype-based inheritance where objects can inherit properties and methods from other objects through the prototype chain.

22. **What is the difference between shallow and deep copy?**
    - Shallow copy: Copies only the first level of properties
    - Deep copy: Copies all levels of nested properties

23. **What is Object.freeze() vs Object.seal()?**
    - `Object.freeze()`: Makes object immutable (cannot add, modify, or delete properties)
    - `Object.seal()`: Prevents adding/deleting properties but allows modification

24. **What is destructuring?**
    Destructuring allows extracting values from arrays or properties from objects into distinct variables.

## ES6+ Features

25. **What is the spread operator?**
    The spread operator (`...`) allows an iterable to be expanded in places where multiple arguments or elements are expected.

26. **What is the rest operator?**
    The rest operator (`...`) allows representing an indefinite number of arguments as an array.

27. **What is the nullish coalescing operator (??)?**
    Returns the right-hand side operand when the left side is null or undefined.

28. **What is optional chaining (?.)?**
    Allows safe access to nested object properties without throwing errors if intermediate properties are null or undefined.

29. **What is an IIFE (Immediately Invoked Function Expression)?**
    A function that runs as soon as it is defined, creating its own scope to avoid polluting the global scope.

## DOM and Events

30. **What is event delegation?**
    Event delegation is adding an event to a parent element that can listen through child elements, useful for dynamic content.

31. **What is event bubbling and event capturing?**
    - Event bubbling: Events bubble up from the target element to the root
    - Event capturing: Events are captured from the root down to the target element

32. **What is the difference between localStorage and sessionStorage?**
    - `localStorage`: Data persists until explicitly cleared
    - `sessionStorage`: Data persists only for the session (until tab is closed)

## Advanced Concepts

33. **What is memoization?**
    An optimization technique that caches the results of expensive function calls and returns the cached result when the same inputs occur again.

34. **What is currying?**
    A technique of evaluating functions with multiple arguments by transforming them into a sequence of functions with single arguments.

35. **What is debouncing and throttling?**
    - Debouncing: Delays function execution until after a certain time has passed since last invocation
    - Throttling: Limits function execution to once per specified time period

36. **What is the difference between Map and Set?**
    - `Map`: Collection of key-value pairs where keys can be any type
    - `Set`: Collection of unique values

37. **What is strict mode?**
    Strict mode makes several changes to normal JavaScript semantics, helping catch common coding mistakes and unsafe actions.

38. **What is the difference between primitive and non-primitive data types?**
    - Primitive: Stored by value, immutable
    - Non-primitive: Stored by reference, mutable

## HTTP Status Codes

**Success (2xx)**
- 200 OK: Request succeeded
- 201 Created: Resource created
- 202 Accepted: Request accepted
- 204 No Content: No content to return

**Redirection (3xx)**
- 301 Moved Permanently: Resource permanently moved
- 302 Found: Temporarily moved
- 304 Not Modified: Resource unchanged

**Client Errors (4xx)**
- 400 Bad Request: Request error
- 401 Unauthorized: Authentication needed
- 403 Forbidden: Access denied
- 404 Not Found: Resource missing
- 405 Not Allowed: Method disallowed
- 408 Request Timeout: Request timed out

**Server Errors (5xx)**
- 500 Internal Server Error: Server-side failure
- 501 Not Implemented: Not implemented on the server
- 502 Bad Gateway: Invalid response from another server
- 503 Service Unavailable: Server unavailable
- 504 Gateway Timeout: Server took too long to respond

## Advanced JavaScript Concepts (7+ Years Experience)

39. **How would you implement a custom event system in JavaScript?**
    ```javascript
    class EventEmitter {
        constructor() {
            this.events = {};
        }
        
        on(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        }
        
        emit(event, ...args) {
            if (this.events[event]) {
                this.events[event].forEach(callback => callback(...args));
            }
        }
        
        off(event, callback) {
            if (this.events[event]) {
                this.events[event] = this.events[event].filter(cb => cb !== callback);
            }
        }
    }
    ```

40. **How would you implement a custom Promise library?**
    ```javascript
    class CustomPromise {
        constructor(executor) {
            this.state = 'pending';
            this.value = undefined;
            this.reason = undefined;
            this.onFulfilledCallbacks = [];
            this.onRejectedCallbacks = [];
            
            const resolve = (value) => {
                if (this.state === 'pending') {
                    this.state = 'fulfilled';
                    this.value = value;
                    this.onFulfilledCallbacks.forEach(callback => callback(value));
                }
            };
            
            const reject = (reason) => {
                if (this.state === 'pending') {
                    this.state = 'rejected';
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach(callback => callback(reason));
                }
            };
            
            try {
                executor(resolve, reject);
            } catch (error) {
                reject(error);
            }
        }
        
        then(onFulfilled, onRejected) {
            return new CustomPromise((resolve, reject) => {
                if (this.state === 'fulfilled') {
                    try {
                        const result = onFulfilled ? onFulfilled(this.value) : this.value;
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                } else if (this.state === 'rejected') {
                    try {
                        const result = onRejected ? onRejected(this.reason) : this.reason;
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    this.onFulfilledCallbacks.push((value) => {
                        try {
                            const result = onFulfilled ? onFulfilled(value) : value;
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    
                    this.onRejectedCallbacks.push((reason) => {
                        try {
                            const result = onRejected ? onRejected(reason) : reason;
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    });
                }
            });
        }
    }
    ```

41. **How would you implement a custom async/await using generators?**
    ```javascript
    function asyncToGenerator(generatorFunction) {
        return function(...args) {
            const generator = generatorFunction.apply(this, args);
            
            return new Promise((resolve, reject) => {
                function handle(result) {
                    if (result.done) {
                        resolve(result.value);
                    } else {
                        Promise.resolve(result.value)
                            .then(res => handle(generator.next(res)))
                            .catch(err => handle(generator.throw(err)));
                    }
                }
                
                handle(generator.next());
            });
        };
    }
    
    // Usage
    const myAsyncFunction = asyncToGenerator(function* () {
        const result = yield fetch('/api/data');
        const data = yield result.json();
        return data;
    });
    ```

42. **How would you implement a custom debounce function with advanced features?**
    ```javascript
    function advancedDebounce(func, wait, options = {}) {
        const {
            leading = false,
            trailing = true,
            maxWait = null
        } = options;
        
        let timeoutId;
        let lastCallTime = 0;
        let lastInvokeTime = 0;
        let lastArgs;
        let lastThis;
        let result;
        
        function invokeFunc(time) {
            const args = lastArgs;
            const thisArg = lastThis;
            
            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }
        
        function leadingEdge(time) {
            lastInvokeTime = time;
            timeoutId = setTimeout(timerExpired, wait);
            return leading ? invokeFunc(time) : result;
        }
        
        function remainingWait(time) {
            const timeSinceLastCall = time - lastCallTime;
            const timeSinceLastInvoke = time - lastInvokeTime;
            const timeWaiting = wait - timeSinceLastCall;
            
            return maxWait ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        
        function shouldInvoke(time) {
            const timeSinceLastCall = time - lastCallTime;
            const timeSinceLastInvoke = time - lastInvokeTime;
            
            return (lastCallTime === 0) || (timeSinceLastCall >= wait) || 
                   (timeSinceLastCall < 0) || (maxWait && timeSinceLastInvoke >= maxWait);
        }
        
        function timerExpired() {
            const time = Date.now();
            if (shouldInvoke(time)) {
                return trailingEdge(time);
            }
            timeoutId = setTimeout(timerExpired, remainingWait(time));
        }
        
        function trailingEdge(time) {
            timeoutId = undefined;
            if (trailing && lastArgs) {
                return invokeFunc(time);
            }
            lastArgs = lastThis = undefined;
            return result;
        }
        
        function debounced(...args) {
            const time = Date.now();
            const isInvoking = shouldInvoke(time);
            
            lastArgs = args;
            lastThis = this;
            lastCallTime = time;
            
            if (isInvoking) {
                if (timeoutId === undefined) {
                    return leadingEdge(lastCallTime);
                }
                if (maxWait) {
                    timeoutId = setTimeout(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }
            if (timeoutId === undefined) {
                timeoutId = setTimeout(timerExpired, wait);
            }
            return result;
        }
        
        debounced.cancel = function() {
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
            lastInvokeTime = 0;
            lastCallTime = 0;
            lastArgs = lastThis = timeoutId = undefined;
        };
        
        debounced.flush = function() {
            return timeoutId === undefined ? result : trailingEdge(Date.now());
        };
        
        debounced.pending = function() {
            return timeoutId !== undefined;
        };
        
        return debounced;
    }
    ```

43. **How would you implement a custom memoization function with cache management?**
    ```javascript
    function advancedMemoize(fn, options = {}) {
        const {
            maxSize = Infinity,
            ttl = Infinity,
            keyGenerator = (...args) => JSON.stringify(args)
        } = options;
        
        const cache = new Map();
        const timestamps = new Map();
        
        function isExpired(key) {
            if (ttl === Infinity) return false;
            const timestamp = timestamps.get(key);
            return Date.now() - timestamp > ttl;
        }
        
        function cleanup() {
            for (const [key, timestamp] of timestamps.entries()) {
                if (Date.now() - timestamp > ttl) {
                    cache.delete(key);
                    timestamps.delete(key);
                }
            }
        }
        
        function evictLRU() {
            if (cache.size >= maxSize) {
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
                timestamps.delete(firstKey);
            }
        }
        
        return function memoized(...args) {
            const key = keyGenerator(...args);
            
            if (cache.has(key) && !isExpired(key)) {
                return cache.get(key);
            }
            
            const result = fn.apply(this, args);
            
            if (cache.size >= maxSize) {
                evictLRU();
            }
            
            cache.set(key, result);
            timestamps.set(key, Date.now());
            
            if (ttl !== Infinity) {
                setTimeout(cleanup, ttl);
            }
            
            return result;
        };
    }
    ```

44. **How would you implement a custom reactive system similar to Vue.js?**
    ```javascript
    class ReactiveSystem {
        constructor() {
            this.targetMap = new WeakMap();
            this.activeEffect = null;
            this.effects = new Set();
        }
        
        track(target, key) {
            if (!this.activeEffect) return;
            
            let depsMap = this.targetMap.get(target);
            if (!depsMap) {
                this.targetMap.set(target, (depsMap = new Map()));
            }
            
            let dep = depsMap.get(key);
            if (!dep) {
                depsMap.set(key, (dep = new Set()));
            }
            
            dep.add(this.activeEffect);
        }
        
        trigger(target, key) {
            const depsMap = this.targetMap.get(target);
            if (!depsMap) return;
            
            const dep = depsMap.get(key);
            if (dep) {
                dep.forEach(effect => effect());
            }
        }
        
        effect(fn) {
            const effect = () => {
                this.activeEffect = effect;
                this.effects.add(effect);
                fn();
                this.activeEffect = null;
            };
            
            effect();
            return effect;
        }
        
        reactive(obj) {
            return new Proxy(obj, {
                get(target, key) {
                    this.track(target, key);
                    return target[key];
                },
                set(target, key, value) {
                    target[key] = value;
                    this.trigger(target, key);
                    return true;
                }
            });
        }
    }
    
    // Usage
    const reactiveSystem = new ReactiveSystem();
    const state = reactiveSystem.reactive({ count: 0 });
    
    reactiveSystem.effect(() => {
        console.log(`Count is: ${state.count}`);
    });
    
    state.count++; // Triggers the effect
    ```