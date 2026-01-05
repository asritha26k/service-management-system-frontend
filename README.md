# Service Management System - Frontend

> A comprehensive Angular-based frontend application for managing service requests, technician assignments, and customer interactions.



## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building](#building)
- [Testing](#testing)
- [API Integration](#api-integration)
- [User Roles](#user-roles)
- [Contributing](#contributing)

---

## Overview

The Service Management System Frontend is a modern, responsive web application built with Angular 20, designed to streamline service operations for customers, technicians, managers, and administrators. The application provides role-based access control, real-time notifications, and comprehensive service request management.

### Key Highlights

- **Modern UI/UX** - Built with Bootstrap 5 and custom components
- **Secure Authentication** - JWT-based auth with role-based guards
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Performance Optimized** - Lazy loading and code splitting
- **Well Tested** - Comprehensive unit tests with Jasmine/Karma
- **Rich Features** - Dashboards, reports, and analytics

---

## Features

### For Customers
- Browse service catalog
- Create and track service requests
- View and manage invoices
- Personal dashboard with service history
- Real-time notifications for request updates

### For Technicians
- View assigned tasks and service requests
- Update task status and completion
- Mobile-friendly task management
- Performance dashboard
- Apply for technician roles

### For Managers
- Manage service request assignments
- Assign technicians to service requests
- Approve/reject technician applications
- Monitor team performance
- Smart technician suggestions based on workload and location

### For Administrators
- User management (create managers, view all users)
- Category and service catalog management
- Revenue reports and analytics
- Comprehensive system dashboard
- System configuration

---

## Tech Stack

### Core Framework
- **Angular** 20.3.0 - Progressive web framework
- **TypeScript** 5.9.2 - Typed superset of JavaScript
- **RxJS** 7.8.0 - Reactive programming library

### UI/Styling
- **Bootstrap** 5.3.8 - CSS framework
- **Bootstrap Icons** 1.11.3 - Icon library
- **Custom CSS** - Component-scoped styling

### Development Tools
- **Angular CLI** 20.3.5 - Command line interface
- **Jasmine** 5.9.0 - Testing framework
- **Karma** 6.4.0 - Test runner
- **TypeScript ESLint** - Linting and code quality

### State Management & Architecture
- **BehaviorSubject** - Reactive state management
- **Standalone Components** - Modern Angular architecture
- **Dependency Injection** - Service-based architecture

---

## Project Structure

```
service-management-system-frontend/
├── src/
│   ├── app/
│   │   ├── core/                    # Core functionality
│   │   │   ├── guards/              # Route guards (auth, role)
│   │   │   ├── interceptors/        # HTTP interceptors
│   │   │   ├── services/            # Core services
│   │   │   └── layouts/             # App layouts
│   │   │
│   │   ├── shared/                  # Shared components
│   │   │   ├── components/          # Reusable components
│   │   │   └── models/              # Shared interfaces/types
│   │   │
│   │   ├── features/                # Feature modules
│   │   │   ├── authentication/      # Auth (login, register)
│   │   │   ├── customer/            # Customer features
│   │   │   ├── technician/          # Technician features
│   │   │   ├── manager/             # Manager features
│   │   │   ├── admin/               # Admin features
│   │   │   ├── profile/             # User profile
│   │   │   ├── catalog/             # Service catalog
│   │   │   ├── billing/             # Invoices & reports
│   │   │   └── home/                # Home/landing page
│   │   │
│   │   ├── app.component.*          # Root component (4 files)
│   │   ├── app.config.ts            # App configuration
│   │   └── app.routes.ts            # Routing configuration
│   │
│   ├── environments/                # Environment configs
│   ├── index.html                   # Entry HTML
│   ├── main.ts                      # Application bootstrap
│   └── styles.css                   # Global styles
│
├── public/                          # Static assets
├── angular.json                     # Angular workspace config
├── tsconfig.json                    # TypeScript config
└── package.json                     # Dependencies
```

### Component Structure

Each component follows Angular CLI best practices with 4 files:
```
component-name/
├── component-name.component.ts      # Component logic
├── component-name.component.html    # Template
├── component-name.component.css     # Styles
└── component-name.component.spec.ts # Tests
```

Each service has 2 files:
```
service-name/
├── service-name.service.ts          # Service logic
└── service-name.service.spec.ts     # Tests
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Angular CLI** 20.x (optional, but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/asritha26k/service-management-system-frontend.git
   cd service-management-system-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Update `src/environments/environment.ts` with your backend API URL:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api'  // Update this
   };
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open browser**
   
   Navigate to `http://localhost:4200/`

---

## Development

### Development Server

Run `npm start` or `ng serve` for a dev server. The application will automatically reload if you change any source files.

```bash
npm start
# or
ng serve
```

**Default port**: `http://localhost:4200`

### Code Scaffolding

Generate new components, services, etc.:

```bash
# Generate a new component
ng generate component features/feature-name/component-name

# Generate a new service
ng generate service features/feature-name/services/service-name

# Generate a new guard
ng generate guard core/guards/guard-name
```

### Linting

```bash
ng lint
```

### Code Formatting

This project uses Prettier for code formatting:
```bash
npm run format
```

---

## Building

### Development Build

```bash
npm run build
# or
ng build
```

Build artifacts will be stored in the `dist/` directory.

### Production Build

```bash
ng build --configuration production
```

**Bundle Optimization**:
- Tree shaking
- Minification
- Dead code elimination
- Lazy loading
- Source maps (configurable)

---

## Testing

### Unit Tests

Run unit tests via [Karma](https://karma-runner.github.io):

```bash
npm test
# or
ng test
```

### Code Coverage

```bash
ng test --code-coverage
```

Coverage reports are generated in the `coverage/` directory.

### End-to-End Tests

```bash
ng e2e
```

---

## API Integration

### Backend Configuration

The frontend connects to a Spring Boot microservices backend. Configure the API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### API Services

Each feature module has its own service for API communication:

- **AuthService** - Authentication and authorization
- **ServiceRequestService** - Customer service requests
- **TechnicianService** - Technician operations
- **CatalogService** - Service catalog management
- **BillingService** - Invoice and payment operations
- **DashboardService** - Dashboard metrics
- **UserProfileService** - User profile management

### HTTP Interceptors

- **AuthInterceptor** - Automatically adds JWT token to requests
- **ErrorInterceptor** - Centralized error handling with notifications

---

## User Roles

### Customer
- **Access**: Service catalog, create requests, view invoices
- **Dashboard**: Service history and active requests
- **Features**: Request tracking, invoice management

### Technician
- **Access**: Assigned tasks, profile management
- **Dashboard**: Task overview and performance metrics
- **Features**: Task completion, status updates

### Manager
- **Access**: Request management, technician approvals
- **Dashboard**: Team performance and request overview
- **Features**: Assign technicians, approve applications, monitor operations

### Admin
- **Access**: Full system access
- **Dashboard**: System-wide metrics and analytics
- **Features**: User management, catalog management, revenue reports

---

## Authentication Flow

1. **Login** - User enters credentials
2. **Token Generation** - Backend validates and returns JWT token
3. **Token Storage** - Token stored in localStorage
4. **Automatic Injection** - Auth interceptor adds token to all API requests
5. **Route Protection** - Guards check authentication and role before route activation
6. **Token Expiry** - Backend handles token expiration, frontend redirects to login

### Guards

- **authGuard** - Checks if user is authenticated
- **roleGuard** - Checks if user has required role for route

---

## Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

---

## Styling Guidelines

### CSS Architecture
- Global styles in `src/styles.css`
- Component-scoped styles in `.component.css` files
- Bootstrap utilities for layout and spacing
- Custom CSS for specific styling needs

### Color Scheme
- Primary: Bootstrap primary blue
- Success: Bootstrap success green
- Danger: Bootstrap danger red
- Warning: Bootstrap warning yellow

---

## Deployment

### Build for Production

```bash
ng build --configuration production
```

### Deploy to Server

1. Copy contents of `dist/service-management-system-frontend/` to web server
2. Configure server to serve `index.html` for all routes (for Angular routing)
3. Update environment.ts with production API URL

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist/service-management-system-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- Follow Angular style guide
- Write unit tests for new features
- Maintain component structure (4 files per component)
- Use meaningful commit messages
- Update documentation as needed

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Authors

- **Your Name** - Initial work - [asritha26k](https://github.com/asritha26k)

---

## Acknowledgments

- Angular team for the amazing framework
- Bootstrap team for the UI components
- All contributors who have helped this project

---

## Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

## Roadmap

- [ ] Implement PWA features
- [ ] Add dark mode support
- [ ] Implement real-time updates with WebSockets
- [ ] Add multi-language support (i18n)
- [ ] Enhance accessibility (WCAG compliance)
- [ ] Add advanced analytics dashboard

---

**Built with Angular**
