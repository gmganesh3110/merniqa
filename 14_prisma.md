## Prisma in NestJS - Senior Q&A

1. What is Prisma and why use it with NestJS?
   Prisma is a type-safe ORM that generates a client from your schema. With NestJS, it provides fast dev, strong types, and easy testing.

2. How do you set up Prisma in NestJS?
   Define `schema.prisma`, run `prisma migrate dev`, generate client, and provide `PrismaService` (extending PrismaClient) as an injectable.

3. How to model relations (1-1, 1-n, n-n with extra fields)?
   Use explicit relation fields with `@relation`. For n-n with metadata, create a join model and `@@unique([aId,bId])`.

4. How to prevent N+1 in GraphQL resolvers?
   Use request-scoped DataLoader and batch `in` queries; avoid calling Prisma per item in loops.

5. How to do pagination?
   Prefer cursor-based with `cursor`, `take`, `skip`. Always order by a stable unique field.

6. When to use `$queryRaw`/`$executeRaw`?
   For DB features not covered by client (CTEs, window functions). Always parameterize to avoid SQL injection.

7. How to run transactions?
   Use `prisma.$transaction` (interactive for multi-step flows). Keep short; add retries for serialization conflicts.

8. How to add soft deletes?
   Add `deletedAt` and use middleware to rewrite delete/queries to exclude soft-deleted rows.

9. Migrations in CI/CD?
   Commit migration SQL; run `prisma migrate deploy` during deploy. Use expand/contract for zero-downtime changes.

10. How to handle unique constraint errors (P2002)?
   Catch and map to a domain error; return a clear message or retry with different input.

11. Multi-tenancy options?
   Row-level (tenantId in models) or separate schemas/databases per tenant; wire Prisma client per request accordingly.

12. Testing approach?
   Use Testcontainers or a test DB; seed with idempotent scripts; mock Prisma via a service wrapper for unit tests.

13. Performance tuning?
   Use `select/include` to limit data, add indexes, profile slow queries, and cache hot reads.

14. Security best practices?
   Validate inputs, parameterize raw queries, restrict select fields by role, and redact PII in logs.

15. Handling large imports?
   Batch inserts, use `createMany`, or DB COPY/LOAD; use transactions and checkpoints; make the process idempotent.

## Prisma Quick Reference (CRUD, Relations, Aggregations)

- CRUD (Model delegates)
  - `prisma.user.findMany({ where, select/include, orderBy, take, skip })`
  - `prisma.user.findUnique({ where: { id } })`
  - `prisma.user.findFirst({ where })`
  - `prisma.user.create({ data })`
  - `prisma.user.createMany({ data, skipDuplicates })`
  - `prisma.user.update({ where, data })`
  - `prisma.user.updateMany({ where, data })`
  - `prisma.user.upsert({ where, create, update })`
  - `prisma.user.delete({ where })`
  - `prisma.user.deleteMany({ where })`

- Relations
  - Nested writes: `create`, `connect`, `connectOrCreate`, `disconnect`, `set`, `update`, `upsert`, `delete`
  - Nested reads: `include: { posts: true, profile: true }` or `select`
  - Many-to-many with join model: explicit join table + nested operations

- Pagination
  - Offset-like: `take`, `skip`
  - Cursor-based: `{ cursor: { id: lastId }, skip: 1, take: 20, orderBy: { id: 'asc' } }`

- Aggregations
  - `aggregate`: `{ _count, _sum, _avg, _min, _max }`
    ```
    await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: 'PAID' }
    })
    ```
  - `groupBy`: `{ by: ['status'], _count: { _all: true }, having, orderBy, take, skip }`

- Distinct
  - `findMany({ where, distinct: ['email'] })`

- Transactions
  - `prisma.$transaction([ op1, op2 ])` (batch)
  - `prisma.$transaction(async (tx) => { ... })` (interactive)

- Raw Queries
  - `$queryRaw` / `$executeRaw` with parameterization

- Useful Patterns
  - Limit fields with `select` for performance/security
  - Soft delete with `deletedAt` + middleware

## WHERE Conditions Cheat Sheet (Prisma)

- Equality / Inequality
  - `{ where: { status: 'ACTIVE' } }`
  - `{ where: { status: { not: 'DELETED' } } }`

- Comparison
  - `{ where: { age: { gt: 18 } } }`
  - `{ where: { age: { gte: 18 } } }`
  - `{ where: { age: { lt: 65 } } }`
  - `{ where: { age: { lte: 65 } } }`

- Between / Ranges
  - `{ where: { createdAt: { gte: start, lte: end } } }`

- Null checks
  - `{ where: { deletedAt: null } }`
  - `{ where: { deletedAt: { not: null } } }`

- IN / NOT IN
  - `{ where: { id: { in: [1,2,3] } } }`
  - `{ where: { id: { notIn: [1,2,3] } } }`

- Contains / StartsWith / EndsWith (string)
  - `{ where: { name: { contains: 'john', mode: 'insensitive' } } }`
  - `{ where: { email: { endsWith: '@example.com' } } }`
  - `{ where: { title: { startsWith: 'Intro' } } }`

- Array fields (Postgres)
  - `{ where: { tags: { has: 'a' } } }`
  - `{ where: { tags: { hasEvery: ['a','b'] } } }`
  - `{ where: { tags: { hasSome: ['a','b'] } } }`

- JSON fields
  - `{ where: { metadata: { path: ['key'], equals: 'value' } } }`

- AND / OR / NOT groups
  - `{ where: { AND: [{ status: 'ACTIVE' }, { age: { gte: 18 } }] } }`
  - `{ where: { OR: [{ email: { contains: '@x' } }, { username: { startsWith: 'a' } }] } }`
  - `{ where: { NOT: { status: 'BANNED' } } }`


