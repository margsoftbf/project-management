# Property Management System

A comprehensive property management application that enables property owners to efficiently manage tenants, rentals, and payment schedules, while allowing tenants to conveniently track their contracts and report issues.

## Tech Stack

**Frontend:**
- Next.js (Page Router) - React framework with server-side rendering
- React - UI library
- TypeScript - Strongly typed JavaScript
- Tailwind CSS - Utility-first CSS framework

**Backend:**
- NestJS - Progressive Node.js framework
- TypeORM - ORM for TypeScript and JavaScript
- PostgreSQL - Relational database

**Other:**
- Jest - Unit and E2E testing
- GitHub Actions - CI/CD

## Core Features

**Property Management:**
- Add, edit, and delete properties
- Manage property data (location, area, rooms, utilities)
- Upload and manage property photos
- Set rental terms (price, deposit, lease duration)
- Monitor property status

**Tenant Management:**
- Add tenants (manually or via invitations)
- Assign tenants to properties
- Manage lease agreements
- View tenant profiles

**Payment System:**
- Generate invoices and payment notices
- Track rental payments
- Payment deadline notifications
- Late payment reporting
- Transaction history

**Service Request System:**
- Tenant technical issue reporting
- Request status tracking
- Owner-tenant communication
- Request history and resolutions

**Reporting & Analytics:**
- Revenue reports generation
- Property rental statistics
- Late payment analysis
- Tenant activity overview

**Security & Authorization:**
- JWT authentication system
- User roles (Admin, Landlord, Tenant)
- API endpoint protection
- Two-factor authentication for sensitive operations
- Personal data encryption

## User Roles

**Landlord:**
- Manage property portfolio
- Add and manage tenants
- Generate invoices and track payments
- Handle service requests
- Access reports and analytics

**Tenant:**
- View rented property details
- Track payment schedule
- Report technical issues
- Communicate with landlord
- Access documents (contracts, invoices)

**Administrator:**
- Manage system users
- Moderate reports
- Access all system data
- System configuration

## User Flow

**For Landlords:**
1. Registration → Email verification → Profile completion
2. Add properties → Upload photos → Set rental terms
3. Manage tenants → Send invitations → Create contracts
4. Daily management → Invoices → Payments → Service requests

**For Tenants:**
1. Registration → Email verification → Profile completion
2. Wait for landlord invitation
3. Accept invitation → Access property data
4. Daily usage → Payments → Reports → Communication

## Installation & Setup

**Requirements:**
- Node.js (v18+)
- PostgreSQL (v14+)
- Docker (optional)

**Clone repository:**
```bash
git clone https://github.com/your-username/property-management.git
cd property-management
```

**Backend Setup:**
```bash
cd backend
yarn install

# Database configuration
cp .env.example .env
# Fill environment variables in .env

# Run database migrations
yarn migration:run

# Start development server
yarn dev
```

**Frontend Setup:**
```bash
cd frontend
yarn install

# Configuration
cp .env.local
# Fill environment variables

# Start application
yarn dev
```


## Testing

**Backend Tests:**
```bash
cd backend

# E2E tests
yarn test:e2e

# Watch mode
yarn test:e2e:watch

# Specific test file
yarn test:e2e src/auth/auth.service.spec.ts
```


## Environment Variables

**Backend (.env):**
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=property_management
JWT_SECRET=your-jwt-secret
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Mobile application (React Native)
- [ ] Payment gateway integration
- [ ] Document management system
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Email/SMS notifications
- [ ] Property maintenance scheduling
- [ ] Tenant screening integration

## Support

For support, email support@propertymanagement.com or join our Slack channel.