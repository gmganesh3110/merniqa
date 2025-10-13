# PostgreSQL Interview Questions - 7 Years Experience Level (Senior Full-Stack Developer)

## Database Fundamentals

1. **Can you explain what PostgreSQL is and what makes it different from other databases?**
   PostgreSQL is an advanced open-source relational database with strong ACID compliance, extensibility, and support for complex data types. It's known for its standards compliance and advanced features.

2. **What are the key strengths of PostgreSQL compared to MySQL?**
   - Better JSON support with JSONB
   - More advanced indexing options (GIN, GiST, BRIN)
   - Better concurrency control
   - Extensibility with custom functions and data types
   - Stricter SQL compliance

3. **How do you create a database and schema in PostgreSQL?**
   ```sql
   CREATE DATABASE myapp;
   \c myapp;
   CREATE SCHEMA app_schema;
   SET search_path TO app_schema, public;
   ```

4. **What are the main data types in PostgreSQL and when would you use each?**
   - **Numeric**: INTEGER, BIGINT, NUMERIC, REAL, DOUBLE PRECISION
   - **Text**: VARCHAR, TEXT, CHAR
   - **Date/Time**: TIMESTAMP, TIMESTAMPTZ, DATE, TIME
   - **JSON**: JSON, JSONB
   - **Arrays**: Any type can be an array
   - **Custom types**: ENUM, COMPOSITE

## Advanced Data Types

5. **What's the difference between JSON and JSONB in PostgreSQL?**
   JSON stores data as text and validates on input, while JSONB stores binary format, is faster for queries, and supports indexing.

6. **How do you work with arrays in PostgreSQL?**
   ```sql
   CREATE TABLE products (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       tags TEXT[]
   );
   
   INSERT INTO products (name, tags) VALUES ('Laptop', ARRAY['electronics', 'computers']);
   SELECT * FROM products WHERE 'electronics' = ANY(tags);
   ```

7. **Can you explain PostgreSQL's ENUM type and its use cases?**
   ```sql
   CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       status user_status DEFAULT 'active'
   );
   ```

8. **How do you handle time zones in PostgreSQL?**
   ```sql
   CREATE TABLE events (
       id SERIAL PRIMARY KEY,
       event_time TIMESTAMPTZ DEFAULT NOW()
   );
   
   SELECT event_time AT TIME ZONE 'UTC' FROM events;
   ```

## Indexing and Performance

9. **What are the different types of indexes in PostgreSQL?**
   - **B-tree**: Default, good for equality and range queries
   - **Hash**: Only for equality comparisons
   - **GIN**: Generalized Inverted Index, good for arrays and JSONB
   - **GiST**: Generalized Search Tree, good for geometric data
   - **BRIN**: Block Range Index, good for large sequential data

10. **How do you create a partial index in PostgreSQL?**
    ```sql
    CREATE INDEX idx_active_users ON users (email) WHERE status = 'active';
    ```

11. **Can you explain expression indexes in PostgreSQL?**
    ```sql
    CREATE INDEX idx_user_lower_email ON users (LOWER(email));
    ```

12. **How do you use EXPLAIN ANALYZE to optimize queries?**
    ```sql
    EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) 
    SELECT * FROM users WHERE email = 'user@example.com';
    ```

## Advanced Queries

13. **How do you write Common Table Expressions (CTEs) in PostgreSQL?**
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

14. **Can you explain window functions in PostgreSQL?**
    ```sql
    SELECT 
        name,
        salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
        AVG(salary) OVER (PARTITION BY department) as dept_avg
    FROM employees;
    ```

15. **How do you implement upserts in PostgreSQL?**
    ```sql
    INSERT INTO users (email, name) 
    VALUES ('user@example.com', 'John Doe')
    ON CONFLICT (email) 
    DO UPDATE SET name = EXCLUDED.name, updated_at = NOW();
    ```

## Transactions and Concurrency

16. **How does PostgreSQL's MVCC (Multi-Version Concurrency Control) work?**
    MVCC allows multiple transactions to read and write simultaneously by maintaining multiple versions of rows, eliminating the need for read locks.

17. **What are the transaction isolation levels in PostgreSQL?**
    - READ UNCOMMITTED
    - READ COMMITTED (default)
    - REPEATABLE READ
    - SERIALIZABLE

18. **How do you handle deadlocks in PostgreSQL?**
    ```sql
    -- Set lock timeout
    SET lock_timeout = '5s';
    
    -- Detect deadlocks
    SELECT * FROM pg_stat_activity WHERE state = 'active';
    ```

19. **Can you explain advisory locks in PostgreSQL?**
    ```sql
    SELECT pg_advisory_lock(123);
    -- Critical section
    SELECT pg_advisory_unlock(123);
    ```

## Stored Procedures and Functions

20. **How do you create stored procedures in PostgreSQL?**
    ```sql
    CREATE OR REPLACE FUNCTION get_user_stats(user_id INTEGER)
    RETURNS TABLE(total_orders INTEGER, total_amount NUMERIC) AS $$
    BEGIN
        RETURN QUERY
        SELECT COUNT(*), COALESCE(SUM(amount), 0)
        FROM orders WHERE user_id = $1;
    END;
    $$ LANGUAGE plpgsql;
    ```

21. **What's the difference between functions and procedures in PostgreSQL?**
    Functions return values and can be used in expressions, while procedures are called for their side effects and don't return values.

22. **How do you handle errors in PL/pgSQL?**
    ```sql
    CREATE OR REPLACE FUNCTION safe_divide(a NUMERIC, b NUMERIC)
    RETURNS NUMERIC AS $$
    BEGIN
        IF b = 0 THEN
            RAISE EXCEPTION 'Division by zero';
        END IF;
        RETURN a / b;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'Error occurred: %', SQLERRM;
            RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;
    ```

## Full-Text Search

23. **How do you implement full-text search in PostgreSQL?**
    ```sql
    CREATE TABLE articles (
        id SERIAL PRIMARY KEY,
        title TEXT,
        content TEXT,
        search_vector tsvector
    );
    
    CREATE INDEX idx_search ON articles USING GIN(search_vector);
    
    UPDATE articles SET search_vector = to_tsvector('english', title || ' ' || content);
    
    SELECT * FROM articles WHERE search_vector @@ plainto_tsquery('english', 'search terms');
    ```

24. **How do you optimize full-text search performance?**
    - Use appropriate text search configurations
    - Create GIN indexes on tsvector columns
    - Use ranking functions for relevance
    - Consider materialized views for complex searches

## Replication and High Availability

25. **How do you set up streaming replication in PostgreSQL?**
    ```bash
    # On master
    CREATE USER replicator REPLICATION LOGIN CONNECTION LIMIT 3 ENCRYPTED PASSWORD 'password';
    
    # On standby
    pg_basebackup -h master_host -D /var/lib/postgresql/data -U replicator -v -P -W
    ```

26. **What's the difference between physical and logical replication?**
    Physical replication replicates the entire database cluster, while logical replication replicates specific tables and can be filtered.

27. **How do you handle failover in PostgreSQL?**
    - Use tools like Patroni or pg_auto_failover
    - Implement health checks
    - Configure automatic failover triggers
    - Test failover procedures regularly

## Backup and Recovery

28. **How do you perform backups in PostgreSQL?**
    ```bash
    # Logical backup
    pg_dump -h localhost -U username -d database_name > backup.sql
    
    # Physical backup
    pg_basebackup -D /backup/location -Ft -z -P
    ```

29. **How do you implement point-in-time recovery (PITR)?**
    ```bash
    # Configure WAL archiving
    archive_mode = on
    archive_command = 'cp %p /backup/wal/%f'
    
    # Restore to point in time
    pg_restore -t target_time /backup/location
    ```

## Extensions and Customization

30. **What are some useful PostgreSQL extensions?**
    - **pg_stat_statements**: Query performance statistics
    - **PostGIS**: Geographic objects
    - **uuid-ossp**: UUID generation
    - **hstore**: Key-value storage
    - **ltree**: Hierarchical data

31. **How do you create custom data types in PostgreSQL?**
    ```sql
    CREATE TYPE address AS (
        street TEXT,
        city TEXT,
        state TEXT,
        zip_code TEXT
    );
    
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        address address
    );
    ```

## Performance Tuning

32. **What are the key configuration parameters for PostgreSQL performance?**
    - shared_buffers
    - work_mem
    - maintenance_work_mem
    - effective_cache_size
    - random_page_cost

33. **How do you monitor PostgreSQL performance?**
    ```sql
    -- Query performance
    SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;
    
    -- Active connections
    SELECT * FROM pg_stat_activity WHERE state = 'active';
    
    -- Database size
    SELECT pg_size_pretty(pg_database_size('database_name'));
    ```

34. **How do you optimize slow queries in PostgreSQL?**
    - Use EXPLAIN ANALYZE
    - Add appropriate indexes
    - Rewrite queries
    - Use query hints
    - Consider partitioning

## Security

35. **How do you implement row-level security in PostgreSQL?**
    ```sql
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY user_policy ON users
        FOR ALL TO app_user
        USING (user_id = current_setting('app.current_user_id')::INTEGER);
    ```

36. **How do you manage roles and privileges in PostgreSQL?**
    ```sql
    CREATE ROLE app_user;
    GRANT CONNECT ON DATABASE myapp TO app_user;
    GRANT USAGE ON SCHEMA app_schema TO app_user;
    GRANT SELECT, INSERT, UPDATE ON app_schema.users TO app_user;
    ```

37. **How do you implement SSL/TLS in PostgreSQL?**
    ```bash
    # Configure postgresql.conf
    ssl = on
    ssl_cert_file = 'server.crt'
    ssl_key_file = 'server.key'
    ```

## Advanced Features

38. **How do you implement partitioning in PostgreSQL?**
    ```sql
    CREATE TABLE sales (
        id SERIAL,
        sale_date DATE,
        amount NUMERIC
    ) PARTITION BY RANGE (sale_date);
    
    CREATE TABLE sales_2023 PARTITION OF sales
        FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');
    ```

39. **How do you use foreign data wrappers in PostgreSQL?**
    ```sql
    CREATE EXTENSION postgres_fdw;
    
    CREATE SERVER remote_server
        FOREIGN DATA WRAPPER postgres_fdw
        OPTIONS (host 'remote_host', dbname 'remote_db');
    
    CREATE FOREIGN TABLE remote_users (
        id INTEGER,
        name TEXT
    ) SERVER remote_server;
    ```

40. **How do you implement parallel query execution in PostgreSQL?**
    ```sql
    -- Enable parallel queries
    SET max_parallel_workers_per_gather = 4;
    SET parallel_tuple_cost = 0.1;
    SET parallel_setup_cost = 1000.0;
    ```

## Production Considerations

41. **How do you handle schema migrations in PostgreSQL?**
    - Use migration tools like Flyway or Liquibase
    - Test migrations on staging
    - Plan for rollbacks
    - Use transactions for atomic migrations

42. **What monitoring should you implement for production PostgreSQL?**
    - Query performance metrics
    - Connection monitoring
    - Replication lag
    - Disk space and I/O
    - Memory usage

43. **How do you scale PostgreSQL for high-traffic applications?**
    - Read replicas for read scaling
    - Connection pooling (PgBouncer)
    - Query optimization
    - Consider partitioning and sharding

44. **What are common anti-patterns to avoid in PostgreSQL?**
    - SELECT * queries
    - Missing indexes
    - Long-running transactions
    - Improper use of OR conditions
    - Not using prepared statements

45. **How do you ensure data integrity in PostgreSQL?**
    - Use foreign key constraints
    - Implement check constraints
    - Use transactions appropriately
    - Validate data at application level
    - Use triggers for complex business rules