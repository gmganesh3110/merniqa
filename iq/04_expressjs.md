# Express.js Interview Questions - 7 Years Experience Level (Senior Full-Stack Developer)

## Core Express.js Fundamentals

1. **What is Express.js and why use it?**
   Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies server creation, routing, middleware handling, and HTTP request/response management.

2. **How to create a basic Express.js application?**
   ```javascript
   const express = require('express');
   const app = express();
   const PORT = 3000;

   app.get('/', (req, res) => {
       res.send('Hello World!');
   });

   app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
   });
   ```

3. **What are the key features of Express.js?**
   - Fast, unopinionated, minimalist web framework
   - Robust routing system
   - Middleware support
   - Template engine integration
   - Static file serving
   - Error handling

## Routing

4. **How to define routes in Express.js?**
   ```javascript
   app.get('/users', (req, res) => {
       res.json({ message: 'Get all users' });
   });

   app.post('/users', (req, res) => {
       res.json({ message: 'Create user' });
   });

   app.put('/users/:id', (req, res) => {
       res.json({ message: `Update user ${req.params.id}` });
   });

   app.delete('/users/:id', (req, res) => {
       res.json({ message: `Delete user ${req.params.id}` });
   });
   ```

5. **What are route parameters and query parameters?**
   - Route parameters: `req.params` (e.g., `/users/:id`)
   - Query parameters: `req.query` (e.g., `/users?name=john&age=25`)

6. **How to create optional path API endpoints in Express.js?**
   ```javascript
   app.get('/users/:id?', (req, res) => {
       if (req.params.id) {
           res.json({ message: `Get user ${req.params.id}` });
       } else {
           res.json({ message: 'Get all users' });
       }
   });
   ```

7. **What is the difference between app.get() and app.use()?**
   - `app.get()`: Handles GET requests for specific routes
   - `app.use()`: Mounts middleware functions for all HTTP methods

## Middleware

8. **What is middleware in Express.js?**
   Middleware functions are functions that have access to the request object (req), response object (res), and the next middleware function in the application's request-response cycle.

9. **How to create custom middleware?**
   ```javascript
   const logger = (req, res, next) => {
       console.log(`${req.method} ${req.path} - ${new Date()}`);
       next();
   };

   app.use(logger);
   ```

10. **What happens if we pass a parameter to the next() function inside middleware?**
    Passing a parameter to `next()` triggers Express's error handling middleware, skipping all remaining middleware in the current route.

11. **How can we jump from one middleware to another, skipping some?**
    Use `next('route')` to skip remaining middleware in the current route and move to the next route handler.

12. **What are the different types of middleware?**
    - Application-level middleware: `app.use()`
    - Router-level middleware: `router.use()`
    - Error-handling middleware: `(err, req, res, next) => {}`
    - Built-in middleware: `express.json()`, `express.static()`
    - Third-party middleware: `cors`, `helmet`, `morgan`

## Request and Response Handling

13. **How to parse JSON and URL-encoded bodies?**
    ```javascript
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    ```

14. **How to serve static files in Express.js?**
    ```javascript
    app.use(express.static('public'));
    // Files in public folder accessible at /filename
    ```

15. **What is CORS and how to enable it in Express.js?**
    ```javascript
    const cors = require('cors');
    app.use(cors()); // Enable CORS for all routes
    ```

16. **How to handle different content types in responses?**
    ```javascript
    app.get('/data', (req, res) => {
       res.json({ data: 'JSON response' });
       // or
       res.send('<h1>HTML response</h1>');
       // or
       res.download('file.pdf');
    });
    ```

## Error Handling

17. **How to implement error handling in Express.js?**
    ```javascript
    // Error handling middleware (must be last)
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something went wrong!' });
    });

    // Throwing errors in routes
    app.get('/error', (req, res, next) => {
        const error = new Error('Custom error');
        next(error);
    });
    ```

18. **What is the difference between res.send() and res.json()?**
    - `res.send()`: Sends various types of responses (string, object, buffer)
    - `res.json()`: Specifically sends JSON responses with proper Content-Type header

## Authentication and Security

19. **How to implement JWT authentication in Express.js?**
    ```javascript
    const jwt = require('jsonwebtoken');
    
    // Login route
    app.post('/login', (req, res) => {
        const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    });

    // Protected route middleware
    const authenticateToken = (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return res.sendStatus(401);
        
        jwt.verify(token, 'secret', (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    };
    ```

20. **How to implement role-based access control (RBAC) in Express.js?**
    ```javascript
    const authorize = (roles) => {
        return (req, res, next) => {
            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({ error: 'Access denied' });
            }
            next();
        };
    };

    app.get('/admin', authenticateToken, authorize(['admin']), (req, res) => {
        res.json({ message: 'Admin access granted' });
    });
    ```

21. **How to implement input validation in Express.js?**
    ```javascript
    const { body, validationResult } = require('express-validator');

    app.post('/users', [
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Process valid data
    });
    ```

22. **How to implement rate limiting in Express.js?**
    ```javascript
    const rateLimit = require('express-rate-limit');

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });

    app.use(limiter);
    ```

## Application Structure and Organization

23. **How to organize Express.js app structure?**
    ```
    project/
    ├── routes/
    │   ├── users.js
    │   └── auth.js
    ├── middleware/
    │   ├── auth.js
    │   └── validation.js
    ├── controllers/
    │   ├── userController.js
    │   └── authController.js
    ├── models/
    │   └── User.js
    ├── config/
    │   └── database.js
    └── app.js
    ```

24. **How to use Express Router for modular routing?**
    ```javascript
    // routes/users.js
    const express = require('express');
    const router = express.Router();

    router.get('/', (req, res) => {
        res.json({ message: 'Get all users' });
    });

    module.exports = router;

    // app.js
    const userRoutes = require('./routes/users');
    app.use('/api/users', userRoutes);
    ```

25. **What is MVC pattern in Express.js?**
    - Model: Data layer (database models)
    - View: Presentation layer (templates, JSON responses)
    - Controller: Business logic layer (route handlers)

## Template Engines

26. **How to use template engines with Express.js?**
    ```javascript
    app.set('view engine', 'ejs');
    app.set('views', './views');

    app.get('/', (req, res) => {
        res.render('index', { title: 'Home Page', data: someData });
    });
    ```

## API Design Best Practices

27. **What are RESTful API best practices in Express.js?**
    - Use proper HTTP methods (GET, POST, PUT, DELETE)
    - Use meaningful URLs (`/api/users` not `/api/getUsers`)
    - Return appropriate status codes
    - Use consistent response formats
    - Implement proper error handling

28. **How to implement API versioning in Express.js?**
    ```javascript
    app.use('/api/v1', v1Routes);
    app.use('/api/v2', v2Routes);
    ```

29. **How to implement pagination in Express.js APIs?**
    ```javascript
    app.get('/users', (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Database query with skip and limit
        res.json({
            data: users,
            pagination: {
                page,
                limit,
                total: totalUsers,
                pages: Math.ceil(totalUsers / limit)
            }
        });
    });
    ```

## File Upload and Handling

30. **How to implement file uploads in Express.js?**
    ```javascript
    const multer = require('multer');
    const upload = multer({ dest: 'uploads/' });

    app.post('/upload', upload.single('file'), (req, res) => {
        res.json({ message: 'File uploaded successfully' });
    });
    ```

## Testing

31. **How to test Express.js applications?**
    ```javascript
    const request = require('supertest');
    const app = require('../app');

    describe('GET /users', () => {
        it('should return all users', async () => {
            const res = await request(app)
                .get('/users')
                .expect(200);
            
            expect(res.body).toHaveProperty('users');
        });
    });
    ```

## Performance and Optimization

32. **How to optimize Express.js application performance?**
    - Use compression middleware
    - Implement caching strategies
    - Optimize database queries
    - Use clustering for multi-core utilization
    - Implement proper error handling
    - Use connection pooling

33. **How to implement caching in Express.js?**
    ```javascript
    const redis = require('redis');
    const client = redis.createClient();

    app.get('/users/:id', async (req, res) => {
        const cacheKey = `user:${req.params.id}`;
        const cached = await client.get(cacheKey);
        
        if (cached) {
            return res.json(JSON.parse(cached));
        }
        
        const user = await getUserFromDB(req.params.id);
        await client.setex(cacheKey, 3600, JSON.stringify(user));
        res.json(user);
    });
    ```

## Security Best Practices

34. **How to secure Express.js applications?**
    - Use Helmet.js for security headers
    - Implement input validation and sanitization
    - Use HTTPS in production
    - Implement rate limiting
    - Use environment variables for secrets
    - Keep dependencies updated
    - Implement proper authentication and authorization

35. **How to use Helmet.js for security headers?**
    ```javascript
    const helmet = require('helmet');
    app.use(helmet());
    ```

## Environment and Configuration

36. **How to handle environment variables in Express.js?**
    ```javascript
    require('dotenv').config();
    
    const PORT = process.env.PORT || 3000;
    const DB_URL = process.env.DATABASE_URL;
    const JWT_SECRET = process.env.JWT_SECRET;
    ```

## WebSocket Integration

37. **How to integrate WebSockets with Express.js?**
    ```javascript
    const http = require('http');
    const socketIo = require('socket.io');
    
    const server = http.createServer(app);
    const io = socketIo(server);
    
    io.on('connection', (socket) => {
        console.log('User connected');
        
        socket.on('message', (data) => {
            io.emit('message', data);
        });
    });
    ```

## Logging and Monitoring

38. **How to implement logging in Express.js?**
    ```javascript
    const morgan = require('morgan');
    const winston = require('winston');
    
    app.use(morgan('combined'));
    
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    });
    ```

## Database Integration

39. **How to integrate databases with Express.js?**
    ```javascript
    const mongoose = require('mongoose');
    
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const User = mongoose.model('User', {
        name: String,
        email: String
    });
    
    app.get('/users', async (req, res) => {
        const users = await User.find();
        res.json(users);
    });
    ```

## Deployment Considerations

40. **How to prepare Express.js app for production?**
    - Set NODE_ENV to 'production'
    - Use process managers like PM2
    - Implement proper error handling
    - Use reverse proxy (nginx)
    - Enable compression and caching
    - Set up monitoring and logging
    - Use HTTPS
    - Implement health checks
