# NestJS Interview Questions - Essential & Most Asked

## Core NestJS Fundamentals

1. **What is NestJS and why use it over Express?**
   NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses TypeScript by default, provides built-in dependency injection, decorators, and follows modular architecture. It's more structured and enterprise-ready compared to Express.

2. **How does NestJS leverage TypeScript?**
   NestJS is built with TypeScript and provides excellent type safety, decorators, interfaces, and modern JavaScript features. It offers better IDE support, compile-time error checking, and enhanced developer experience.

3. **What is the architecture pattern NestJS follows?**
   NestJS follows a modular architecture pattern inspired by Angular, with clear separation of concerns using modules, controllers, services, and providers.

## Modules and Architecture

4. **What are modules in NestJS?**
   Modules are classes annotated with `@Module()` decorator that organize the application into cohesive blocks of functionality. They encapsulate related components, services, and controllers.

5. **How to create a module (CLI and manually)?**
   ```bash
   # CLI
   nest generate module users
   
   # Manually
   @Module({
     controllers: [UsersController],
     providers: [UsersService],
     exports: [UsersService]
   })
   export class UsersModule {}
   ```

6. **What is AppModule and bootstrap process?**
   AppModule is the root module that bootstraps the application. It imports other modules and defines the application's structure.

## Controllers and Routes

7. **What are controllers in NestJS?**
   Controllers handle incoming requests and return responses to the client. They are classes decorated with `@Controller()`.

8. **How do routes map to controller methods?**
   ```typescript
   @Controller('users')
   export class UsersController {
     @Get()
     findAll() { return 'Get all users'; }
     
     @Get(':id')
     findOne(@Param('id') id: string) { return `Get user ${id}`; }
     
     @Post()
     create(@Body() createUserDto: CreateUserDto) { return 'Create user'; }
   }
   ```

9. **How to use decorators like @Controller, @Get, @Post?**
   - `@Controller('path')`: Defines the base route
   - `@Get()`, `@Post()`, `@Put()`, `@Delete()`: HTTP method decorators
   - `@Param()`, `@Body()`, `@Query()`: Parameter decorators

## Services and Dependency Injection

10. **What are providers in NestJS?**
    Providers are classes that can be injected as dependencies. They include services, repositories, factories, helpers, etc.

11. **What is dependency injection in NestJS?**
    Dependency injection is a design pattern where dependencies are provided to a class rather than the class creating them itself. NestJS has a built-in DI container.

12. **What is @Injectable and when is it used?**
    `@Injectable()` decorator marks a class as a provider that can be injected into other classes.

13. **How to inject a service into a controller?**
    ```typescript
    @Injectable()
    export class UsersService {
      findAll() { return ['user1', 'user2']; }
    }
    
    @Controller('users')
    export class UsersController {
      constructor(private readonly usersService: UsersService) {}
      
      @Get()
      findAll() { return this.usersService.findAll(); }
    }
    ```

## DTOs and Validation

14. **What are DTOs and why use class-validator/class-transformer?**
    DTOs (Data Transfer Objects) define the structure of data being transferred. class-validator provides validation decorators, and class-transformer handles object transformation.

15. **How to implement DTOs with validation?**
    ```typescript
    export class CreateUserDto {
      @IsString()
      @IsNotEmpty()
      name: string;
      
      @IsEmail()
      email: string;
      
      @IsOptional()
      @IsNumber()
      age?: number;
    }
    ```

## Pipes

16. **What is a Pipe in NestJS?**
    Pipes transform input data and validate it. They run before the route handler receives the data.

17. **Built-in pipes: ValidationPipe, ParseIntPipe, etc.**
    - `ValidationPipe`: Validates DTOs using class-validator
    - `ParseIntPipe`: Transforms string to integer
    - `ParseUUIDPipe`: Validates UUID format
    - `ParseBoolPipe`: Transforms string to boolean

18. **How to create a custom pipe?**
    ```typescript
    @Injectable()
    export class CustomValidationPipe implements PipeTransform {
      transform(value: any, metadata: ArgumentMetadata) {
        // Custom validation logic
        return value;
      }
    }
    ```

## Guards

19. **What are Guards in NestJS?**
    Guards determine whether a request should be handled by the route handler. They run after middleware but before interceptors and pipes.

20. **How to implement AuthGuard and custom guards?**
    ```typescript
    @Injectable()
    export class AuthGuard implements CanActivate {
      canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.user !== undefined;
      }
    }
    
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile() { return 'Protected route'; }
    ```

## Interceptors

21. **What are Interceptors in NestJS?**
    Interceptors can transform the result returned from a function, extend the basic functionality, or completely override a function.

22. **Common use cases for Interceptors (logging, transform, cache)**
    ```typescript
    @Injectable()
    export class LoggingInterceptor implements NestInterceptor {
      intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');
        return next.handle().pipe(
          tap(() => console.log('After...'))
        );
      }
    }
    ```

## Exception Filters

23. **What are Filters (Exception Filters) in NestJS?**
    Exception filters catch exceptions thrown by route handlers, controllers, services, or guards and return appropriate responses.

24. **How to implement a global exception filter?**
    ```typescript
    @Catch()
    export class AllExceptionsFilter implements ExceptionFilter {
      catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        
        const status = exception instanceof HttpException 
          ? exception.getStatus() 
          : 500;
        
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      }
    }
    ```

## Middleware

25. **What is Middleware in NestJS?**
    Middleware functions execute before route handlers and have access to the request and response objects.

26. **Difference between middleware and interceptors/guards**
    - Middleware: Runs before guards, can modify request/response
    - Guards: Determine if request should proceed
    - Interceptors: Transform results, handle cross-cutting concerns

## Configuration

27. **How to manage environment variables in NestJS?**
    ```typescript
    // app.module.ts
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })
    
    // service
    constructor(private configService: ConfigService) {}
    
    get databaseUrl() {
      return this.configService.get<string>('DATABASE_URL');
    }
    ```

28. **ConfigModule and ConfigService usage**
    ConfigModule loads environment variables, and ConfigService provides type-safe access to configuration values.

## Authentication and Authorization

29. **How to implement authentication with Passport?**
    ```typescript
    @Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy) {
      constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: 'secret',
        });
      }
      
      async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
      }
    }
    ```

30. **How to protect routes with roles/permissions (RBAC)?**
    ```typescript
    @Injectable()
    export class RolesGuard implements CanActivate {
      constructor(private reflector: Reflector) {}
      
      canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
          context.getHandler(),
          context.getClass(),
        ]);
        
        if (!requiredRoles) return true;
        
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.roles?.includes(role));
      }
    }
    ```

## Database Integration

31. **How to work with TypeORM in NestJS?**
    ```typescript
    @Entity()
    export class User {
      @PrimaryGeneratedColumn()
      id: number;
      
      @Column()
      name: string;
      
      @Column()
      email: string;
    }
    
    @Injectable()
    export class UsersService {
      constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}
      
      async findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    }
    ```

32. **How to work with Mongoose in NestJS?**
    ```typescript
    @Schema()
    export class User {
      @Prop({ required: true })
      name: string;
      
      @Prop({ required: true, unique: true })
      email: string;
    }
    
    export const UserSchema = SchemaFactory.createForClass(User);
    ```

## Caching

33. **Caching with CacheModule and interceptors**
    ```typescript
    @Injectable()
    export class CacheInterceptor implements NestInterceptor {
      constructor(private cacheManager: Cache) {}
      
      async intercept(context: ExecutionContext, next: CallHandler) {
        const key = context.getArgs().join('_');
        const cached = await this.cacheManager.get(key);
        
        if (cached) return cached;
        
        const result = await next.handle().toPromise();
        await this.cacheManager.set(key, result, 300);
        return result;
      }
    }
    ```

## File Handling

34. **File uploads handling (Multer) in NestJS**
    ```typescript
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      return {
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
      };
    }
    ```

## WebSockets

35. **WebSockets with @WebSocketGateway and @SubscribeMessage**
    ```typescript
    @WebSocketGateway()
    export class ChatGateway {
      @SubscribeMessage('message')
      handleMessage(client: Socket, payload: string): string {
        return `Echo: ${payload}`;
      }
      
      @SubscribeMessage('join')
      handleJoin(client: Socket, room: string) {
        client.join(room);
        return `Joined room: ${room}`;
      }
    }
    ```

## GraphQL

36. **GraphQL with @Resolver, @Query, @Mutation**
    ```typescript
    @Resolver(of => User)
    export class UsersResolver {
      constructor(private usersService: UsersService) {}
      
      @Query(returns => [User])
      async users(): Promise<User[]> {
        return this.usersService.findAll();
      }
      
      @Mutation(returns => User)
      async createUser(@Args('input') createUserInput: CreateUserInput): Promise<User> {
        return this.usersService.create(createUserInput);
      }
    }
    ```

## Microservices

37. **Microservices in NestJS: patterns and transport layers**
    ```typescript
    @MessagePattern('get_users')
    getUsers(@Payload() data: any): string {
      return 'Users data';
    }
    
    @EventPattern('user_created')
    handleUserCreated(@Payload() data: any) {
      console.log('User created:', data);
    }
    ```

38. **Using Redis/NATS/Kafka as transport in microservices**
    ```typescript
    // main.ts
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
    ```

## Testing

39. **Testing controllers/services with Jest and testing module**
    ```typescript
    describe('UsersController', () => {
      let controller: UsersController;
      let service: UsersService;
      
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [UsersController],
          providers: [UsersService],
        }).compile();
        
        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
      });
      
      it('should return an array of users', () => {
        expect(controller.findAll()).toBeDefined();
      });
    });
    ```

40. **E2E testing with Supertest**
    ```typescript
    describe('Users (e2e)', () => {
      let app: INestApplication;
      
      beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
        
        app = moduleFixture.createNestApplication();
        await app.init();
      });
      
      it('/users (GET)', () => {
        return request(app.getHttpServer())
          .get('/users')
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeInstanceOf(Array);
          });
      });
    });
    ```

## Performance and Optimization

41. **Performance optimization in NestJS**
    - Use caching strategies
    - Implement pagination
    - Optimize database queries
    - Use compression middleware
    - Implement connection pooling

42. **Caching strategies and cache invalidation**
    - Redis for distributed caching
    - In-memory caching for single instances
    - Cache invalidation patterns
    - TTL (Time To Live) strategies

## Security

43. **Security best practices: Helmet, CORS, CSRF mitigation**
    ```typescript
    app.use(helmet());
    app.enableCors({
      origin: ['http://localhost:3000'],
      credentials: true,
    });
    ```

44. **Validation and sanitization strategies**
    - Input validation with class-validator
    - SQL injection prevention
    - XSS protection
    - Rate limiting

## API Documentation

45. **API documentation with Swagger**
    ```typescript
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('users')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    ```

## Deployment

46. **Containerizing a NestJS app (Docker basics)**
    ```dockerfile
    FROM node:18-alpine
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci --only=production
    COPY . .
    RUN npm run build
    EXPOSE 3000
    CMD ["node", "dist/main"]
    ```

47. **Health checks with TerminusModule**
    ```typescript
    @Controller('health')
    export class HealthController {
      constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
      ) {}
      
      @Get()
      @HealthCheck()
      check() {
        return this.health.check([
          () => this.db.pingCheck('database'),
        ]);
      }
    }
    ```

## Advanced Concepts

48. **CQRS pattern with @nestjs/cqrs**
    CQRS (Command Query Responsibility Segregation) separates read and write operations for better scalability and maintainability.

49. **Event sourcing basics in NestJS**
    Event sourcing stores changes as a sequence of events, allowing you to reconstruct the current state and maintain a complete audit trail.

50. **Graceful shutdown and signal handling**
    ```typescript
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      
      process.on('SIGTERM', async () => {
        await app.close();
        process.exit(0);
      });
      
      await app.listen(3000);
    }
    ```