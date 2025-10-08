PostgreSQL Interview Questions (Easy → Advanced)
1. What is PostgreSQL and key strengths vs MySQL?
2. What are databases, schemas, tables in Postgres?
3. How to create a database and schema.
4. Common data types in Postgres.
5. How to insert, update, delete rows.
6. SELECT basics with WHERE.
7. ORDER BY, LIMIT/OFFSET usage.
8. Aggregates: COUNT, SUM, AVG, MIN, MAX.
9. GROUP BY and HAVING.
10. DISTINCT and performance considerations.
11. INNER/LEFT/RIGHT/FULL joins.
12. CROSS join and use cases.
13. Subqueries vs joins trade-offs.
14. EXISTS vs IN in Postgres.
15. UNION vs UNION ALL.
16. Views and materialized views.
17. Sequences and serial/identity columns.
18. Primary keys, unique constraints, foreign keys.
19. Check constraints and exclusion constraints.
20. Data types: JSON/JSONB differences and use.
21. Arrays and array operators.
22. HSTORE key-value type basics.
23. ENUM type pros/cons.
24. Time and time zone types.
25. Text search basics (tsvector/tsquery).
26. Index types: B-tree, Hash, GIN, GiST, BRIN.
27. Choosing the right index type.
28. Partial indexes and expression indexes.
29. Covering indexes and INCLUDE columns.
30. Explain ANALYZE: reading query plans.
31. Cost-based optimizer basics (rows, width, cost).
32. Statistics and ANALYZE/VACUUM role.
33. VACUUM, VACUUM FULL, and autovacuum.
34. Table bloat and how to prevent it.
35. MVCC model and visibility rules.
36. Transaction isolation levels in Postgres.
37. Read phenomena: dirty/non-repeatable/phantom reads.
38. Locks in Postgres: row/table levels.
39. Detecting and resolving deadlocks.
40. Advisory locks and use cases.
41. CTEs: non-recursive and recursive.
42. Window functions in depth.
43. Common performance pitfalls with CTEs.
44. Server configuration basics (postgresql.conf).
45. Shared buffers, work_mem, maintenance_work_mem.
46. Effective_cache_size and planner influence.
47. WAL (Write-Ahead Logging) basics.
48. Checkpoints and tuning.
49. Synchronous vs asynchronous commit.
50. Replication: streaming replication basics.
51. Hot standby and read replicas.
52. Logical replication and use cases.
53. Failover strategies with Patroni/pg_auto_failover.
54. Backup/restore: pg_dump vs physical backups.
55. Point-in-time recovery (PITR) with WAL archiving.
56. Extensions: popular ones (pg_stat_statements, PostGIS).
57. pg_stat_statements for query tuning.
58. Monitoring: pg_stat_activity, blocking queries.
59. EXPLAIN (ANALYZE, BUFFERS) deep dive.
60. Parameter sniffing and plan instability.
61. Query parameterization and PREPARE usage.
62. Partitioning: range/list/hash.
63. Partition pruning and performance.
64. Foreign data wrappers (FDW) basics.
65. Parallel query execution in Postgres.
66. JIT compilation in Postgres.
67. TOAST storage for large values.
68. Table inheritance vs partitioning.
69. Triggers and trigger functions.
70. Stored procedures vs functions (PL/pgSQL basics).
71. Error handling in PL/pgSQL.
72. Upserts: INSERT ... ON CONFLICT.
73. Row-level security (RLS) and policies.
74. Roles, privileges, and default privileges.
75. SSL/TLS and encryption at rest options.
76. Authentication methods (md5, scram-sha-256, peer, etc.).
77. Collations and ICU support.
78. Full-text search tuning.
79. Index-only scans and visibility map.
80. BRIN indexes for large append-only tables.
81. JSONB indexing with GIN.
82. Geospatial data with PostGIS basics.
83. Time-series patterns and hypertables (TimescaleDB conceptually).
84. Handling time zones correctly.
85. Avoiding sequence gaps and performance.
86. Autovacuum tuning for high-churn tables.
87. Migrating from MySQL to Postgres: key differences.
88. ORM considerations for Postgres.
89. Lock timeout and statement timeout usage.
90. Temp tables vs unlogged tables.
91. Materialized view refresh strategies.
92. Data integrity with constraints vs app logic.
93. Data modeling best practices for Postgres.
94. Testing schema and migration safety.
95. Query anti-patterns to avoid.
96. Scaling reads and writes: patterns and tools.
97. Sharding vs logical partitioning trade-offs.
98. Common operational pitfalls and mitigations.
99. Checklist for production-ready Postgres.
100. Postgres 16/17 notable features (high level).
