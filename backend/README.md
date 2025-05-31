# Property Management Backend

Backend API for the Property Management System built with NestJS, TypeORM, and Supabase.

## Setup

```bash
yarn install
```

## Migration

```bash
yarn migration:generate src/db/migrations/MigrationName
yarn migration:run
yarn migration:revert
```

## Run

```bash
yarn start:local
```

## Testing

```bash
yarn test:e2e
``` Yarn package manager

## Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

The API will be available at `http://localhost:3001`

## Available Scripts

```bash
# Development
yarn dev                    # Start with watch mode
yarn start                  # Start normally
yarn start:debug          # Start in debug mode
yarn start:prod           # Production mode

# Database
yarn migration:run         # Run migrations
yarn migration:generate    # Generate new migration
yarn migration:revert     # Revert last migration

# Testing
yarn test:e2e             # Run E2E tests
yarn test:e2e:watch       # E2E tests in watch mode

# Code Quality
yarn lint                 # Lint code
yarn format              # Format code
yarn build               # Build project
```

## Testing

```bash
# Run all E2E tests
yarn test:e2e

# Run specific test file
yarn test:e2e src/auth/auth.service.spec.ts

# Watch mode for development
yarn test:e2e:watch
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Users
- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update user profile

### Properties
- `GET /properties` - List properties
- `POST /properties` - Create property
- `GET /properties/:id` - Get property details

### Tenants
- `GET /tenants` - List tenants
- `POST /tenants` - Create tenant

### Payments
- `GET /payments` - List payments
- `POST /payments` - Record payment

### Service Requests
- `GET /service-requests` - List service requests
- `POST /service-requests` - Create service request

## Project Structure

```
src/
├── auth/              # Authentication
├── users/             # User management
├── properties/        # Property management
├── tenants/           # Tenant management
├── payments/          # Payment system
├── service-requests/  # Service requests
├── shared/           # Shared utilities
└── main.ts           # Entry point
```

## Development

The application uses Supabase for database hosting and includes:
- JWT-based authentication
- Role-based access control
- Input validation
- Comprehensive E2E testing

## License

MIT License