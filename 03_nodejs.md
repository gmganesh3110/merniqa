# Node.js Interview Questions - Essential & Most Asked

## Core Node.js Fundamentals

1. **What is Node.js and what problem does it solve?**
   Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows JavaScript to run on the server side. It solves the problem of building scalable network applications using JavaScript on both client and server.

2. **How does Node.js differ from browser JavaScript?**
   - Node.js runs on the server, browser JavaScript runs in the browser
   - Node.js has access to file system, network, and OS APIs
   - Node.js uses CommonJS/ES modules, browsers use script tags
   - Different global objects (process vs window)

3. **What is npm and what is a package?**
   npm (Node Package Manager) is the default package manager for Node.js. A package is a directory containing a program described by a package.json file.

4. **What does package.json contain?**
   - Project metadata (name, version, description)
   - Dependencies and devDependencies
   - Scripts for automation
   - Configuration settings

5. **What are devDependencies vs dependencies?**
   - `dependencies`: Required for production
   - `devDependencies`: Only needed during development

## Event Loop and Asynchronous Programming

6. **What is the event loop in Node.js?**
   The event loop is the core mechanism that allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible.

7. **What are the event loop phases?**
   - Timers: setTimeout, setInterval callbacks
   - Pending callbacks: I/O callbacks deferred to next loop
   - Idle, prepare: Internal use
   - Poll: Fetch new I/O events
   - Check: setImmediate callbacks
   - Close callbacks: socket.on('close', ...)

8. **What is process.nextTick vs microtasks vs setImmediate?**
   - `process.nextTick`: Highest priority, executes before any other phase
   - Microtasks: Promise callbacks, queueMicrotask()
   - `setImmediate`: Executes in the Check phase

9. **Explain the execution flow of Promise, async/await, setTimeout, setImmediate, process.nextTick()**
   Priority order: process.nextTick > microtasks (Promises) > setImmediate > setTimeout

## Modules and File System

10. **What are CommonJS modules? How to export/import?**
    ```javascript
    // Export
    module.exports = { functionName };
    // Import
    const { functionName } = require('./module');
    ```

11. **What are ES modules in Node.js? How to enable/use?**
    ```javascript
    // Export
    export { functionName };
    // Import
    import { functionName } from './module.js';
    ```

12. **Difference between require and import in Node.js**
    - `require`: CommonJS, synchronous, can be called anywhere
    - `import`: ES modules, asynchronous, must be at top level

## Streams and Buffers

13. **What are Buffers in Node.js?**
    Buffers are objects that represent a fixed-length sequence of bytes, used to handle binary data.

14. **What are Streams in Node.js?**
    Streams are objects that let you read data from a source or write data to a destination in a continuous fashion.

15. **Readable vs Writable vs Duplex vs Transform streams**
    - Readable: Can read data from
    - Writable: Can write data to
    - Duplex: Both readable and writable
    - Transform: Duplex stream that can modify data as it's written and read

16. **How does piping work between streams?**
    Piping connects the output of one stream to the input of another stream, handling backpressure automatically.

17. **What is backpressure in streams?**
    Backpressure occurs when the receiving stream is slower than the sending stream, causing data to accumulate in memory.

## HTTP and Web Servers

18. **How to create a basic HTTP server in Node.js**
    ```javascript
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World');
    });
    server.listen(3000);
    ```

19. **What is Express.js and why use it?**
    Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

20. **How to define routes and middleware in Express**
    ```javascript
    app.use('/api', middleware);
    app.get('/users', (req, res) => {});
    ```

21. **Explain the middleware concept in Node.js**
    Middleware functions are functions that have access to the request object, response object, and the next middleware function in the application's request-response cycle.

22. **Error-handling middleware signature and usage**
    ```javascript
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    ```

## Database and Data Management

23. **How to connect Node.js to a database (MongoDB/PostgreSQL)**
    Use appropriate drivers like mongoose for MongoDB or pg for PostgreSQL with connection strings and proper error handling.

24. **What is connection pooling and why use it?**
    Connection pooling maintains a cache of database connections that can be reused, reducing the overhead of establishing new connections.

25. **What is Redis and explain the uses of it**
    Redis is an in-memory data structure store used as a database, cache, and message broker. Uses include caching, session storage, and real-time analytics.

## Authentication and Security

26. **What is JWT and explain the structure of JWT token**
    JWT (JSON Web Token) consists of three parts: Header (algorithm), Payload (claims), and Signature (verification).

27. **How to implement role-based and permission-based access control**
    Use middleware to check user roles and permissions before allowing access to protected routes.

28. **How to hash passwords in Node.js (bcrypt/argon2)**
    ```javascript
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    ```

29. **Rate limiting strategies in Node.js APIs**
    Implement rate limiting using libraries like express-rate-limit to prevent abuse and ensure fair usage.

## Performance and Optimization

30. **How to scale Node.js application using cluster module**
    ```javascript
    const cluster = require('cluster');
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    } else {
        // Worker process
    }
    ```

31. **What are Worker Threads and how do they handle CPU-intensive tasks?**
    Worker Threads allow running JavaScript operations in parallel, useful for CPU-intensive tasks without blocking the main thread.

32. **How can you optimize database queries?**
    - Use proper indexing
    - Optimize query structure
    - Use connection pooling
    - Implement caching strategies

33. **What is the profiling concept in Node.js?**
    Profiling involves analyzing application performance to identify bottlenecks, memory leaks, and optimization opportunities.

## Error Handling and Logging

34. **How to handle unhandledRejection and uncaughtException**
    ```javascript
    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    });
    ```

35. **What is Winston/Pino and why use them?**
    Winston and Pino are logging libraries that provide structured logging, multiple transports, and better performance than console.log.

## API Design and Best Practices

36. **What is a RESTful API and basic best practices?**
    RESTful APIs follow REST principles: stateless, cacheable, uniform interface, client-server architecture.

37. **What is the difference between PATCH and PUT API?**
    - PUT: Replaces the entire resource
    - PATCH: Partially updates the resource

38. **What is the difference between stateless and stateful API?**
    - Stateless: Each request contains all necessary information
    - Stateful: Server maintains client state between requests

39. **How to implement input validation in Express.js**
    Use libraries like Joi or express-validator to validate and sanitize input data.

## Testing

40. **How to test Node.js apps (unit/integration)**
    Use testing frameworks like Jest or Mocha with assertion libraries like Chai for comprehensive testing.

41. **Using supertest for HTTP tests**
    Supertest provides a high-level abstraction for testing HTTP endpoints with a fluent API.

## Deployment and DevOps

42. **Graceful shutdown of Node.js servers**
    ```javascript
    process.on('SIGTERM', () => {
        server.close(() => {
            console.log('Process terminated');
        });
    });
    ```

43. **Health checks and readiness/liveness probes**
    Implement endpoints that return application status for monitoring and load balancer health checks.

44. **Dockerizing a Node.js app**
    Create a Dockerfile with proper base image, dependency installation, and application startup commands.

## Advanced Concepts

45. **What is load balancer and how to implement in Node.js?**
    Load balancers distribute incoming requests across multiple server instances. Can be implemented using nginx, HAProxy, or cloud load balancers.

46. **What are the SOLID principles for software development?**
    - Single Responsibility Principle
    - Open/Closed Principle
    - Liskov Substitution Principle
    - Interface Segregation Principle
    - Dependency Inversion Principle

47. **What is Kafka and explain the use cases?**
    Apache Kafka is a distributed streaming platform used for building real-time data pipelines and streaming applications.

## MongoDB Specific (if applicable)

48. **What is the aggregation pipeline in MongoDB?**
    Aggregation pipeline processes documents through a series of stages to transform and analyze data.

49. **What are transactions and how to achieve them in MongoDB?**
    Transactions ensure ACID properties across multiple operations. Use startSession() and withTransaction() for multi-document transactions.

50. **What is replica sets and sharding mechanism in MongoDB?**
    - Replica sets: Multiple copies of data for high availability
    - Sharding: Horizontal partitioning of data across multiple servers