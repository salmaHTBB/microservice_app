# 🚀 Quick Start - MicroCommerce Suite Frontend

## Installation (One-Time Setup)

```bash
cd front_end
npm install
```

## Start Development Server

```bash
npm start
```
**URL**: http://localhost:4200

## Build for Production

```bash
npm run build
```

## Project Structure at a Glance

```
src/app/
├── components/          # UI Components
│   ├── navbar/         # Top navigation
│   ├── sidebar/        # Side menu
│   ├── dashboard/      # Main dashboard
│   ├── customers/      # Customer CRUD
│   ├── products/       # Product CRUD
│   └── bills/          # Billing + Invoice
├── services/           # API Services
│   ├── customer.service.ts
│   ├── product.service.ts
│   └── bill.service.ts
└── models/            # TypeScript Interfaces
    ├── customer.model.ts
    ├── product.model.ts
    └── bill.model.ts
```

## Key Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Dashboard | Statistics & Overview |
| `/dashboard` | Dashboard | Statistics & Overview |
| `/customers` | Customers | Customer Management |
| `/products` | Products | Inventory Management |
| `/bills` | Bills | Bill Listing |
| `/bills/:id` | Bill Details | Invoice View |

## API Configuration

**File**: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  gatewayUrl: 'http://localhost:8888'  // ← Change this
};
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run tests |
| `ng generate component <name>` | Create component |
| `ng generate service <name>` | Create service |

## Tech Stack

- **Framework**: Angular 17
- **Language**: TypeScript 5.2
- **Styling**: Custom CSS
- **Forms**: Reactive Forms
- **HTTP**: Angular HttpClient
- **Routing**: Angular Router

## Features Checklist

### ✅ Implemented
- [x] Dashboard with statistics
- [x] Customer CRUD operations
- [x] Product CRUD operations
- [x] Bill creation with multiple products
- [x] Bill details & invoice
- [x] Search functionality
- [x] Responsive design
- [x] Modern UI with animations
- [x] Form validation
- [x] Error handling

### 🔄 Can Be Added
- [ ] User authentication
- [ ] Charts and graphs
- [ ] Export to PDF
- [ ] Email notifications
- [ ] Dark/Light theme toggle
- [ ] Advanced filtering
- [ ] Pagination

## Backend Requirements

Your backend should provide these endpoints:

**Customers**: `/customer-service/customers`
- GET, POST, PUT, DELETE, Search

**Products**: `/inventory-service/products`
- GET, POST, PUT, DELETE, Search

**Bills**: `/billing-service/bills`
- GET, POST, DELETE

All accessed through Gateway: `http://localhost:8888`

## Color Reference

```css
--primary-color: #6366f1;    /* Indigo */
--secondary-color: #10b981;  /* Emerald */
--danger-color: #ef4444;     /* Red */
--warning-color: #f59e0b;    /* Amber */
--info-color: #3b82f6;       /* Blue */
```

## Troubleshooting Quick Fixes

**Problem**: Dependencies not installing
```bash
npm cache clean --force
npm install
```

**Problem**: Port 4200 in use
```bash
npx kill-port 4200
# or
ng serve --port 4201
```

**Problem**: CORS errors
→ Configure CORS in Spring Gateway

**Problem**: No data showing
1. Check backend is running
2. Check gateway URL in environment.ts
3. Open browser console for errors

## File Locations

| What | Where |
|------|-------|
| API URLs | `src/environments/environment.ts` |
| Global Styles | `src/styles.css` |
| Routing | `src/app/app-routing.module.ts` |
| Module Config | `src/app/app.module.ts` |
| Models | `src/app/models/` |
| Services | `src/app/services/` |
| Components | `src/app/components/` |

## Component Communication

```
User Action → Component → Service → HTTP Client → Gateway → Microservice
                  ↑                                              ↓
                  └──────────── Response Observable ←────────────┘
```

## Need Help?

1. Check `README.md` for detailed docs
2. Check `SETUP_GUIDE.md` for complete setup
3. Check `UI_GUIDE.md` for design system
4. Check browser console for errors
5. Verify backend services are running

## Success Checklist

Before running the app, ensure:
- [ ] Node.js installed (v18+)
- [ ] npm dependencies installed
- [ ] Backend gateway running on port 8888
- [ ] All microservices registered with Eureka
- [ ] CORS configured in gateway
- [ ] Environment variables set correctly

## That's It! 🎉

Run `npm start` and visit http://localhost:4200

**Happy Coding!**
