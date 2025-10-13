# MySQL Interview Questions - 7 Years Experience Level (Senior Full-Stack Developer)

## Database Fundamentals

1. **Can you explain what MySQL is and where it's commonly used in enterprise applications?**
   MySQL is an open-source relational database management system that's widely used for web applications, e-commerce platforms, and data warehousing. It's popular for its reliability, performance, and ease of use.

2. **What are the key differences between MySQL, MariaDB, and PostgreSQL that I should consider for a project?**
   - **MySQL**: Oracle-owned, strong ecosystem, good for web apps
   - **MariaDB**: MySQL fork, community-driven, better performance in some cases
   - **PostgreSQL**: More advanced features, better JSON support, stricter SQL compliance

3. **How would you explain the relationship between databases, tables, rows, and columns to a junior developer?**
   A database is like a filing cabinet, tables are like folders within it, rows are individual records, and columns are the specific fields of information.

4. **Can you walk me through creating a database and table with proper constraints?**
   ```sql
   CREATE DATABASE ecommerce;
   USE ecommerce;
   
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       name VARCHAR(100) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Data Types and Constraints

5. **What are the main data types in MySQL and when would you use each?**
   - **Numeric**: INT, BIGINT, DECIMAL, FLOAT
   - **String**: VARCHAR, TEXT, CHAR
   - **Date/Time**: DATE, DATETIME, TIMESTAMP
   - **JSON**: For semi-structured data

6. **How do you choose between VARCHAR and CHAR data types?**
   Use VARCHAR for variable-length strings and CHAR for fixed-length strings (like country codes).

7. **Can you explain the difference between a primary key and a foreign key?**
   A primary key uniquely identifies each row in a table, while a foreign key creates a relationship between tables by referencing another table's primary key.

8. **What's the difference between UNIQUE and PRIMARY KEY constraints?**
   A table can have multiple UNIQUE constraints but only one PRIMARY KEY. PRIMARY KEY automatically creates a UNIQUE constraint and doesn't allow NULL values.

## Basic Queries

9. **How would you write a query to find all users created in the last 30 days?**
   ```sql
   SELECT * FROM users 
   WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY);
   ```

10. **Can you explain the difference between WHERE and HAVING clauses?**
    WHERE filters rows before grouping, while HAVING filters groups after GROUP BY.

11. **How do you handle NULL values in MySQL queries?**
    Use IS NULL or IS NOT NULL operators, never use = NULL or != NULL.

12. **What's the difference between INNER JOIN and LEFT JOIN?**
    INNER JOIN returns only matching records, while LEFT JOIN returns all records from the left table and matching records from the right table.

## Advanced Queries

13. **How would you optimize a slow query that joins multiple large tables?**
    - Add proper indexes
    - Use EXPLAIN to analyze the query plan
    - Consider query rewriting
    - Use appropriate JOIN types

14. **Can you explain the difference between EXISTS and IN operators?**
    EXISTS stops at the first match and can be more efficient, while IN creates a list of values to compare against.

15. **How would you write a recursive query in MySQL?**
    ```sql
    WITH RECURSIVE category_tree AS (
        SELECT id, name, parent_id, 0 as level
        FROM categories WHERE parent_id IS NULL
        UNION ALL
        SELECT c.id, c.name, c.parent_id, ct.level + 1
        FROM categories c
        JOIN category_tree ct ON c.parent_id = ct.id
    )
    SELECT * FROM category_tree;
    ```

## Indexing and Performance

16. **What types of indexes are available in MySQL and when would you use each?**
    - **B-Tree**: Default, good for equality and range queries
    - **Hash**: Only for equality comparisons
    - **Full-text**: For text search
    - **Spatial**: For geographic data

17. **How do you choose which columns to index?**
    Index columns used in WHERE clauses, JOIN conditions, and ORDER BY clauses. Avoid over-indexing as it slows down writes.

18. **Can you explain the concept of a covering index?**
    A covering index includes all columns needed for a query, allowing the query to be satisfied entirely from the index without accessing the table.

19. **What's the difference between clustered and non-clustered indexes in InnoDB?**
    InnoDB uses clustered indexes where the primary key is the clustered index, and all other indexes are non-clustered (secondary).

## Transactions and Concurrency

20. **Can you explain ACID properties in the context of MySQL?**
    - **Atomicity**: All operations succeed or all fail
    - **Consistency**: Database remains in valid state
    - **Isolation**: Concurrent transactions don't interfere
    - **Durability**: Committed changes persist

21. **What are the different transaction isolation levels in MySQL?**
    - READ UNCOMMITTED
    - READ COMMITTED
    - REPEATABLE READ (default)
    - SERIALIZABLE

22. **How do you handle deadlocks in MySQL?**
    - Use shorter transactions
    - Access tables in consistent order
    - Use appropriate isolation levels
    - Implement retry logic in application

23. **What's the difference between shared and exclusive locks?**
    Shared locks allow multiple readers, exclusive locks prevent other locks and are used for writes.

## Storage Engines

24. **What are the key differences between MyISAM and InnoDB?**
    - **MyISAM**: Table-level locking, no transactions, faster reads
    - **InnoDB**: Row-level locking, ACID compliance, better for concurrent writes

25. **When would you choose InnoDB over MyISAM?**
    Choose InnoDB for applications requiring transactions, foreign keys, or high concurrency.

## Backup and Recovery

26. **What are the different backup strategies for MySQL?**
    - **Logical backups**: mysqldump, MySQL Shell
    - **Physical backups**: File system snapshots, Percona XtraBackup
    - **Point-in-time recovery**: Using binary logs

27. **How do you perform point-in-time recovery in MySQL?**
    ```bash
    # Restore from backup
    mysql < backup.sql
    
    # Apply binary logs
    mysqlbinlog --start-datetime="2024-01-01 10:00:00" binlog.000001 | mysql
    ```

## Security

28. **How do you implement proper user management and privileges in MySQL?**
    ```sql
    CREATE USER 'app_user'@'%' IDENTIFIED BY 'strong_password';
    GRANT SELECT, INSERT, UPDATE ON ecommerce.* TO 'app_user'@'%';
    FLUSH PRIVILEGES;
    ```

29. **What are the best practices for preventing SQL injection in MySQL?**
    - Use prepared statements
    - Validate and sanitize input
    - Use parameterized queries
    - Implement least privilege access

30. **How do you handle encryption in MySQL?**
    - **At rest**: InnoDB tablespace encryption
    - **In transit**: SSL/TLS connections
    - **Application level**: Encrypt sensitive data before storing

## Performance Tuning

31. **How do you identify and resolve performance bottlenecks in MySQL?**
    - Use EXPLAIN to analyze query plans
    - Monitor slow query log
    - Use Performance Schema
    - Analyze key metrics (QPS, connections, buffer pool)

32. **What are the key configuration parameters to tune for MySQL performance?**
    - innodb_buffer_pool_size
    - max_connections
    - query_cache_size (deprecated in 8.0)
    - innodb_log_file_size

33. **How do you optimize a query that's performing poorly?**
    - Add appropriate indexes
    - Rewrite the query
    - Use query hints
    - Consider partitioning

## Advanced Features

34. **How do you implement partitioning in MySQL?**
    ```sql
    CREATE TABLE sales (
        id INT,
        sale_date DATE,
        amount DECIMAL(10,2)
    ) PARTITION BY RANGE (YEAR(sale_date)) (
        PARTITION p2022 VALUES LESS THAN (2023),
        PARTITION p2023 VALUES LESS THAN (2024),
        PARTITION p2024 VALUES LESS THAN (2025)
    );
    ```

35. **Can you explain MySQL's JSON data type and its functions?**
    ```sql
    SELECT JSON_EXTRACT(user_data, '$.name') FROM users;
    SELECT * FROM users WHERE JSON_CONTAINS(user_data, '"premium"', '$.subscription');
    ```

## Production Considerations

36. **How do you handle schema migrations safely in production?**
    - Use migration tools
    - Test on staging first
    - Plan for rollbacks
    - Consider downtime requirements

37. **What monitoring should you implement for a production MySQL instance?**
    - Query performance
    - Connection counts
    - Replication lag
    - Disk space
    - Memory usage

38. **How do you scale MySQL for high-traffic applications?**
    - Read replicas for read scaling
    - Connection pooling
    - Query optimization
    - Consider sharding for write scaling

39. **What are common anti-patterns to avoid in MySQL?**
    - SELECT * queries
    - Missing indexes
    - Long-running transactions
    - Improper use of OR conditions

40. **How do you ensure data integrity in MySQL?**
    - Use foreign key constraints
    - Implement check constraints
    - Use transactions appropriately
    - Validate data at application level