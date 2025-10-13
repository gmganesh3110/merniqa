# MongoDB Interview Questions - 7 Years Experience Level (Senior Full-Stack Developer)

## Database Fundamentals

1. **Can you explain what MongoDB is and how it differs from relational databases?**
   MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents. Unlike relational databases, it doesn't require a fixed schema and can handle complex, nested data structures.

2. **What are the key advantages of using MongoDB over traditional SQL databases?**
   - Flexible schema design
   - Horizontal scaling through sharding
   - Rich query language
   - Built-in replication
   - Support for complex data types
   - Fast development cycles

3. **How do you create a database and collection in MongoDB?**
   ```javascript
   // Create database (implicit)
   use ecommerce;
   
   // Create collection
   db.users.insertOne({name: "John Doe", email: "john@example.com"});
   
   // Or explicitly create collection
   db.createCollection("products");
   ```

4. **What are the main data types in MongoDB?**
   - **Primitive**: String, Number, Boolean, Date, ObjectId
   - **Complex**: Array, Object, Binary, Code
   - **Special**: Null, Undefined, MinKey, MaxKey

## Document Structure and Schema Design

5. **How do you design a schema for a user management system in MongoDB?**
   ```javascript
   {
     _id: ObjectId("..."),
     email: "user@example.com",
     profile: {
       firstName: "John",
       lastName: "Doe",
       avatar: "https://...",
       preferences: {
         theme: "dark",
         notifications: true
       }
     },
     addresses: [
       {
         type: "home",
         street: "123 Main St",
         city: "New York",
         zipCode: "10001"
       }
     ],
     createdAt: ISODate("2024-01-01T00:00:00Z"),
     updatedAt: ISODate("2024-01-01T00:00:00Z")
   }
   ```

6. **What's the difference between embedding and referencing in MongoDB?**
   - **Embedding**: Store related data in the same document (good for 1:1 or 1:few relationships)
   - **Referencing**: Store references to other documents (good for 1:many or many:many relationships)

7. **How do you handle one-to-many relationships in MongoDB?**
   ```javascript
   // Option 1: Embedding (for small arrays)
   {
     _id: ObjectId("..."),
     name: "User",
     orders: [
       {orderId: 1, amount: 100},
       {orderId: 2, amount: 200}
     ]
   }
   
   // Option 2: Referencing (for large arrays)
   {
     _id: ObjectId("..."),
     name: "User",
     orderIds: [ObjectId("..."), ObjectId("...")]
   }
   ```

## Basic Queries

8. **How do you find documents with specific criteria?**
   ```javascript
   // Find all users with age greater than 18
   db.users.find({age: {$gt: 18}});
   
   // Find users with specific email
   db.users.find({email: "user@example.com"});
   
   // Find users with array containing specific value
   db.users.find({tags: "premium"});
   ```

9. **How do you use projection to limit returned fields?**
   ```javascript
   // Return only name and email fields
   db.users.find({}, {name: 1, email: 1, _id: 0});
   
   // Exclude specific fields
   db.users.find({}, {password: 0, ssn: 0});
   ```

10. **How do you sort and limit results in MongoDB?**
    ```javascript
    // Sort by name ascending, limit to 10 results
    db.users.find().sort({name: 1}).limit(10);
    
    // Sort by multiple fields
    db.users.find().sort({age: -1, name: 1});
    ```

## Advanced Queries

11. **How do you use aggregation pipeline in MongoDB?**
    ```javascript
    db.orders.aggregate([
      // Match stage
      {$match: {status: "completed"}},
      
      // Group stage
      {$group: {
        _id: "$userId",
        totalAmount: {$sum: "$amount"},
        orderCount: {$sum: 1}
      }},
      
      // Sort stage
      {$sort: {totalAmount: -1}},
      
      // Limit stage
      {$limit: 10}
    ]);
    ```

12. **How do you implement joins in MongoDB?**
    ```javascript
    // Using $lookup (left outer join)
    db.orders.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {$unwind: "$user"},
      {$project: {
        orderId: 1,
        amount: 1,
        userName: "$user.name",
        userEmail: "$user.email"
      }}
    ]);
    ```

13. **How do you handle text search in MongoDB?**
    ```javascript
    // Create text index
    db.products.createIndex({title: "text", description: "text"});
    
    // Text search
    db.products.find({$text: {$search: "laptop gaming"}});
    
    // Text search with score
    db.products.find(
      {$text: {$search: "laptop gaming"}},
      {score: {$meta: "textScore"}}
    ).sort({score: {$meta: "textScore"}});
    ```

## Indexing

14. **What types of indexes are available in MongoDB?**
    - **Single Field**: Index on one field
    - **Compound**: Index on multiple fields
    - **Multikey**: Index on array fields
    - **Text**: Full-text search index
    - **Geospatial**: For geographic data
    - **Hashed**: For sharding
    - **Sparse**: Only index documents with the field
    - **Partial**: Index only documents matching criteria

15. **How do you create and manage indexes in MongoDB?**
    ```javascript
    // Create single field index
    db.users.createIndex({email: 1});
    
    // Create compound index
    db.users.createIndex({age: 1, city: 1});
    
    // Create text index
    db.products.createIndex({title: "text", description: "text"});
    
    // Create sparse index
    db.users.createIndex({phone: 1}, {sparse: true});
    
    // List indexes
    db.users.getIndexes();
    
    // Drop index
    db.users.dropIndex({email: 1});
    ```

16. **How do you optimize query performance with proper indexing?**
    - Analyze query patterns
    - Create compound indexes for multi-field queries
    - Use explain() to analyze query plans
    - Consider index intersection
    - Monitor index usage with db.collection.stats()

## Data Manipulation

17. **How do you insert documents in MongoDB?**
    ```javascript
    // Insert single document
    db.users.insertOne({
      name: "John Doe",
      email: "john@example.com",
      age: 30
    });
    
    // Insert multiple documents
    db.users.insertMany([
      {name: "Jane Doe", email: "jane@example.com"},
      {name: "Bob Smith", email: "bob@example.com"}
    ]);
    ```

18. **How do you update documents in MongoDB?**
    ```javascript
    // Update single document
    db.users.updateOne(
      {email: "john@example.com"},
      {$set: {age: 31, updatedAt: new Date()}}
    );
    
    // Update multiple documents
    db.users.updateMany(
      {status: "inactive"},
      {$set: {status: "active", reactivatedAt: new Date()}}
    );
    
    // Upsert (insert if not exists)
    db.users.updateOne(
      {email: "newuser@example.com"},
      {$set: {name: "New User", createdAt: new Date()}},
      {upsert: true}
    );
    ```

19. **How do you delete documents in MongoDB?**
    ```javascript
    // Delete single document
    db.users.deleteOne({email: "john@example.com"});
    
    // Delete multiple documents
    db.users.deleteMany({status: "inactive"});
    
    // Delete all documents (keep collection)
    db.users.deleteMany({});
    ```

## Transactions

20. **How do you implement transactions in MongoDB?**
    ```javascript
    // Start a session
    const session = db.getMongo().startSession();
    
    try {
      session.startTransaction();
      
      // Operations within transaction
      db.users.updateOne(
        {_id: userId},
        {$inc: {balance: -100}},
        {session: session}
      );
      
      db.orders.insertOne({
        userId: userId,
        amount: 100,
        status: "completed"
      }, {session: session});
      
      session.commitTransaction();
    } catch (error) {
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
    ```

21. **What are the limitations of transactions in MongoDB?**
    - Limited to single replica set (not across shards)
    - Performance impact
    - Size limitations (16MB document limit)
    - Not suitable for all use cases

## Replication

22. **How do you set up replication in MongoDB?**
    ```javascript
    // Start replica set
    rs.initiate({
      _id: "rs0",
      members: [
        {_id: 0, host: "mongodb1:27017"},
        {_id: 1, host: "mongodb2:27017"},
        {_id: 2, host: "mongodb3:27017"}
      ]
    });
    
    // Check replica set status
    rs.status();
    ```

23. **How do you handle read preferences in MongoDB?**
    ```javascript
    // Read from primary only
    db.users.find().readPref("primary");
    
    // Read from secondary
    db.users.find().readPref("secondary");
    
    // Read from nearest
    db.users.find().readPref("nearest");
    ```

## Sharding

24. **How do you implement sharding in MongoDB?**
    ```javascript
    // Enable sharding on database
    sh.enableSharding("ecommerce");
    
    // Shard collection
    sh.shardCollection("ecommerce.users", {userId: "hashed"});
    
    // Add shards
    sh.addShard("shard1/mongodb1:27017");
    sh.addShard("shard2/mongodb2:27017");
    ```

25. **How do you choose a shard key?**
    - High cardinality
    - Even distribution
    - Query patterns
    - Avoid hotspots
    - Consider compound shard keys

## Performance Optimization

26. **How do you optimize MongoDB performance?**
    - Use appropriate indexes
    - Optimize query patterns
    - Use projection to limit fields
    - Implement connection pooling
    - Monitor and tune configuration
    - Use explain() to analyze queries

27. **How do you monitor MongoDB performance?**
    ```javascript
    // Check database stats
    db.stats();
    
    // Check collection stats
    db.users.stats();
    
    // Check index usage
    db.users.aggregate([{$indexStats: {}}]);
    
    // Check current operations
    db.currentOp();
    ```

## Security

28. **How do you implement authentication in MongoDB?**
    ```javascript
    // Create user
    db.createUser({
      user: "appuser",
      pwd: "password",
      roles: [
        {role: "readWrite", db: "ecommerce"}
      ]
    });
    
    // Enable authentication
    // In mongod.conf: security.authorization: enabled
    ```

29. **How do you implement authorization in MongoDB?**
    ```javascript
    // Create role with specific privileges
    db.createRole({
      role: "userManager",
      privileges: [
        {
          resource: {db: "ecommerce", collection: "users"},
          actions: ["find", "insert", "update"]
        }
      ],
      roles: []
    });
    
    // Grant role to user
    db.grantRolesToUser("appuser", ["userManager"]);
    ```

## Advanced Features

30. **How do you implement change streams in MongoDB?**
    ```javascript
    // Watch for changes
    const changeStream = db.users.watch();
    
    changeStream.on('change', (change) => {
      console.log('Change detected:', change);
    });
    
    // Watch with pipeline
    const changeStream = db.users.watch([
      {$match: {operationType: "insert"}},
      {$project: {fullDocument: 1}}
    ]);
    ```

31. **How do you implement GridFS for large files?**
    ```javascript
    // Store file
    const bucket = new GridFSBucket(db, {bucketName: 'files'});
    const uploadStream = bucket.openUploadStream('largefile.pdf');
    fs.createReadStream('largefile.pdf').pipe(uploadStream);
    
    // Retrieve file
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(fs.createWriteStream('downloaded.pdf'));
    ```

32. **How do you implement full-text search with Atlas Search?**
    ```javascript
    // Create search index
    {
      "mappings": {
        "dynamic": true,
        "fields": {
          "title": {
            "type": "string",
            "analyzer": "lucene.standard"
          },
          "description": {
            "type": "string",
            "analyzer": "lucene.standard"
          }
        }
      }
    }
    
    // Search query
    db.products.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: "laptop gaming",
            path: ["title", "description"]
          }
        }
      }
    ]);
    ```

## Production Considerations

33. **How do you handle backup and recovery in MongoDB?**
    ```bash
    # Backup
    mongodump --host localhost:27017 --db ecommerce --out /backup
    
    # Restore
    mongorestore --host localhost:27017 --db ecommerce /backup/ecommerce
    
    # Point-in-time recovery
    mongodump --host localhost:27017 --oplog --out /backup
    ```

34. **How do you monitor MongoDB in production?**
    - Use MongoDB Atlas monitoring
    - Set up alerts for key metrics
    - Monitor slow queries
    - Track replication lag
    - Monitor disk space and memory usage

35. **How do you scale MongoDB for high-traffic applications?**
    - Implement read replicas
    - Use sharding for horizontal scaling
    - Optimize queries and indexes
    - Implement connection pooling
    - Use caching strategies
