## TypeORM in NestJS - Senior Q&A

1. What is TypeORM and why use it with NestJS?
   TypeORM is an ORM for Node.js supporting TypeScript and multiple DBs. With NestJS, it integrates via `TypeOrmModule` for DI, repositories, and testing.

2. Active Record vs Data Mapper in TypeORM?
   AR keeps logic on entities (simple, small apps). DM uses repositories/services (cleaner separation, better for large codebases).

3. How to configure TypeORM in NestJS?
   Use `TypeOrmModule.forRoot` in `AppModule`, and `TypeOrmModule.forFeature([User])` in feature modules to inject repositories.

4. How do you define entities and relations?
   Use decorators: `@Entity`, `@Column`, `@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@JoinTable`. Prefer explicit relations and indexes.

5. How do you avoid N+1 queries?
   Load relations with joins, use `relationId` or DataLoader, and select only needed columns.

6. When to use QueryBuilder?
   For complex joins/filters, aggregations, or raw SQL needs that repositories don’t cover.

7. How to handle transactions?
   Use `DataSource.transaction` for scoped work; `QueryRunner` for fine-grained control. Keep transactions short and retry on serialization errors.

8. How to do pagination?
   Use cursor-based for large datasets or `skip/take` for small sets; always include stable ordering and total count when needed.

9. How do you do migrations in a team?
   Generate, review, and commit migration files; apply with CI using `runMigrations`. Use expand/contract for zero-downtime.

10. Soft delete vs hard delete?
   Prefer soft delete (`deletedAt`) for recovery/audit; hard delete for PII when required by compliance.

11. Optimistic vs pessimistic locking?
   Optimistic with version columns for low contention; pessimistic with `FOR UPDATE` for hot rows to avoid lost updates.

12. Multi-tenancy approaches?
   Row-level (tenantId predicate) or schema-per-tenant. Row-level is simpler; schema-per-tenant isolates better but complicates ops.

13. How to test with TypeORM?
   Use Testcontainers/SQLite for integration, mock repositories for unit tests, and seed data idempotently.

14. How to secure queries?
   Always parameterize, avoid string concatenation, validate inputs, and restrict raw SQL usage to a thin layer.

15. Performance tips?
   Add proper indexes, analyze with EXPLAIN, avoid over-fetching, batch loads, and cache hot reads.

## TypeORM Quick Reference (CRUD, Relations, Aggregations)

- CRUD (Repository)
  - `repository.find(options)`
  - `repository.findOne({ where })`
  - `repository.findBy({ ...where })`
  - `repository.save(entity | entities)`
  - `repository.insert(partial | partials)`
  - `repository.update(criteria, partial)`
  - `repository.remove(entity | entities)`
  - `repository.delete(criteria)`
  - `repository.increment(criteria, field, value)` / `decrement(...)`
  - `repository.count(options)` / `exist(options)`

- Relations
  - Eager vs Lazy: prefer explicit joins
  - Join helpers (QueryBuilder):
    - `.leftJoinAndSelect('user.posts', 'post')`
    - `.innerJoin('post.author', 'author')`
  - Load relation ids: `.loadRelationIds()` / `@RelationId`
  - Manage many-to-many: use `@JoinTable()` on owner side

- Pagination
  - Offset: `.skip(n).take(m)`
  - Cursor-like: stable `WHERE > lastId ORDER BY id ASC LIMIT m`

- Aggregations (QueryBuilder)
  - `.select('COUNT(user.id)', 'count')`
  - `.addSelect('SUM(order.total)', 'sumTotal')`
  - `.groupBy('user.departmentId').addGroupBy('user.status')`
  - Example:
    ```
    const qb = dataSource
      .getRepository(Order)
      .createQueryBuilder('o')
      .select('o.userId', 'userId')
      .addSelect('SUM(o.total)', 'totalSpent')
      .groupBy('o.userId');
    ```

- Transactions
  - `dataSource.transaction(async (manager) => { ... })`
  - `queryRunner.startTransaction()` / `commitTransaction()` / `rollbackTransaction()`

- Locking
  - Optimistic: `@VersionColumn()`
  - Pessimistic: `.setLock('pessimistic_write')`

- Useful Options
  - `select`, `where`, `relations`, `order`, `take`, `skip`
  - `withDeleted()` when using soft delete

## WHERE Conditions Cheat Sheet (TypeORM)

- Equality / Inequality
  - `{ where: { status: 'ACTIVE' } }`
  - `{ where: { status: Not('DELETED') } }`

- Comparison
  - `MoreThan(100)`, `MoreThanOrEqual(100)`
  - `LessThan(100)`, `LessThanOrEqual(100)`

- Between / Ranges
  - `{ where: { createdAt: Between(startDate, endDate) } }`

- Null checks
  - `{ where: { deletedAt: IsNull() } }`
  - `{ where: { deletedAt: Not(IsNull()) } }`

- IN / NOT IN
  - `{ where: { id: In([1,2,3]) } }`
  - `{ where: { id: Not(In([1,2,3])) } }`

- LIKE / ILIKE (Postgres)
  - `{ where: { name: Like('%john%') } }`
  - `{ where: { email: ILike('%@example.com') } }`

- Any / Raw
  - `{ where: { tags: Any(['a','b']) } }` (Postgres array)
  - `{ where: { score: Raw(alias => `${alias} % 2 = 0`) } }`

- JSON (Postgres)
  - `Raw(alias => `${alias} ->> 'key' = 'value'` )`

- AND / OR groups
  - `find({ where: [{ status: 'ACTIVE', orgId }, { status: 'PENDING', orgId }] })` (OR between objects)
  - QueryBuilder:
    ```
    qb.where('user.status = :s', { s: 'ACTIVE' })
      .andWhere('user.age >= :min', { min: 18 })
      .orWhere('user.email ILIKE :e', { e: '%@example.com' })
    ```


