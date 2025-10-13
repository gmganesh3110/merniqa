## GraphQL in NestJS - Senior Q&A

1. What is GraphQL and why use it with NestJS?
   GraphQL is a query language for APIs. With NestJS, it integrates via `@nestjs/graphql` to build typed schemas and resolvers quickly.

2. SDL-first vs code-first in NestJS?
   SDL-first writes schema `.graphql` files. Code-first uses decorators to generate SDL. Choose based on team preference; code-first pairs well with TypeScript.

3. How to define resolvers, queries, and mutations?
   Use `@Resolver`, `@Query`, `@Mutation`, and `@ResolveField`. Keep resolvers thin and delegate to services.

4. How to avoid N+1 in GraphQL?
   Use request-scoped DataLoader to batch and cache per request; avoid fetching inside loops.

5. Pagination strategy?
   Prefer cursor-based (edges/nodes) with `endCursor` and `hasNextPage`. Offset is fine for small, static lists.

6. Field-level authorization?
   Use guards/directives/middlewares at schema or resolver level; centralize policy checks using context user claims.

7. Subscriptions in NestJS?
   Use `graphql-ws` backend with PubSub/Redis. Authenticate on connection and filter events server-side.

8. Caching strategies?
   Persisted queries, HTTP caching for query GETs, and per-field caching with TTL; invalidate on mutations.

9. Error handling best practices?
   Return partial data with `errors`, use `extensions.code` for domain errors, and avoid throwing for non-critical subfields.

10. Federation vs stitching?
   Use Apollo Federation for multi-service graphs with entity ownership; stitching is simpler for internal composition.

11. Input validation?
   Validate in DTOs/pipes before resolver logic; use custom scalars for email/URL/Date and sanitize inputs.

12. Performance profiling?
   Enable tracing (Apollo/OTEL), log resolver timings, and monitor query depth/complexity and cache hit rates.

## GraphQL Quick Reference (Schema, Resolvers, Relations, Aggregations)

- Schema (code-first NestJS)
  - `@ObjectType()`, `@Field()`, `@InputType()`, `@Resolver()`
  - `@Query(() => Type)`, `@Mutation(() => Type)`, `@ResolveField(() => Type)`
  - Scalars: `ID`, `String`, `Int`, `Float`, `Boolean`, custom scalars (Date, Email)
  - Interfaces vs Unions: reuse common fields vs represent disjoint types

- CRUD Patterns
  - Query list/detail: `listEntities(filters, pagination)`, `entity(id: ID!)`
  - Mutations: `createEntity(input)`, `updateEntity(id, input)`, `deleteEntity(id)` returning status or entity

- Relations
  - Parent -> children via `@ResolveField()` using service/DataLoader
  - Batch child fetching by IDs to avoid N+1

- Pagination
  - Cursor-based: `edges { node cursor } pageInfo { endCursor hasNextPage }`
  - Offset-based: `items, total, page, pageSize`

- Aggregations
  - Expose aggregate fields or separate queries: `stats { count sum avg min max }`
  - Backed by DB-layer aggregates (TypeORM QueryBuilder or Prisma aggregate/groupBy)

- Caching & Persisted Queries
  - APQ (automatic persisted queries), CDN caching for public queries, per-field cache TTLs

- Security
  - Auth/role checks in guards/directives, input validation via DTOs/pipes, depth/complexity limits

## Filter Inputs Cheat Sheet (GraphQL in NestJS)

- Common operator pattern (code-first)
  - Define reusable inputs like `StringFilter`, `IntFilter`, `DateTimeFilter` with operators.
  - Example:
    ```
    @InputType()
    class IntFilter {
      @Field({ nullable: true }) equals?: number;
      @Field({ nullable: true }) not?: number;
      @Field({ nullable: true }) lt?: number;
      @Field({ nullable: true }) lte?: number;
      @Field({ nullable: true }) gt?: number;
      @Field({ nullable: true }) gte?: number;
      @Field(() => [Number], { nullable: true }) in?: number[];
      @Field(() => [Number], { nullable: true }) notIn?: number[];
    }
    
    @InputType()
    class StringFilter {
      @Field({ nullable: true }) equals?: string;
      @Field({ nullable: true }) not?: string;
      @Field({ nullable: true }) contains?: string;
      @Field({ nullable: true }) startsWith?: string;
      @Field({ nullable: true }) endsWith?: string;
      @Field(() => [String], { nullable: true }) in?: string[];
      @Field(() => [String], { nullable: true }) notIn?: string[];
      @Field({ nullable: true }) mode?: 'insensitive' | 'default';
    }
    
    @InputType()
    class DateTimeFilter {
      @Field({ nullable: true }) equals?: Date;
      @Field({ nullable: true }) not?: Date;
      @Field({ nullable: true }) lt?: Date;
      @Field({ nullable: true }) lte?: Date;
      @Field({ nullable: true }) gt?: Date;
      @Field({ nullable: true }) gte?: Date;
      @Field(() => [Date], { nullable: true }) in?: Date[];
      @Field(() => [Date], { nullable: true }) notIn?: Date[];
    }
    
    @InputType()
    class UserWhereInput {
      @Field(() => [UserWhereInput], { nullable: true }) AND?: UserWhereInput[];
      @Field(() => [UserWhereInput], { nullable: true }) OR?: UserWhereInput[];
      @Field(() => [UserWhereInput], { nullable: true }) NOT?: UserWhereInput[];
      @Field(() => IntFilter, { nullable: true }) age?: IntFilter;
      @Field(() => StringFilter, { nullable: true }) email?: StringFilter;
      @Field(() => DateTimeFilter, { nullable: true }) createdAt?: DateTimeFilter;
      // ... more fields
    }
    ```

- Mapping filters
  - Map GraphQL filters to ORM filters (TypeORM `MoreThan/Between/Like` or Prisma `gt/gte/in/contains`).
  - Validate allowed fields to prevent costly queries; add index-aware constraints.
