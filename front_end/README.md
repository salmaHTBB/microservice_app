# MicroCommerce Suite - Angular Front-End

A beautiful, modern Angular front-end application for the MicroCommerce Suite microservices platform.

## 🚀 Features

### ✨ Dashboard
- Real-time statistics and metrics
- Revenue tracking
- Customer and product overview
- Low stock alerts
- Recent bills display

### 👥 Customer Management
- Full CRUD operations
- Customer search functionality
- Real-time data updates
- Responsive data tables

### 📦 Product/Inventory Management
- Product catalog management
- Stock level monitoring
- Price management
- Low stock warnings
- Search and filter capabilities

### 🧾 Billing System
- Create bills with multiple products
- Customer assignment
- Automatic price calculation
- Bill details with printable invoice
- Professional invoice layout

### 🎨 Modern UI/UX
- Dark theme with gradient accents
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Clean and intuitive interface
- Beautiful card-based layouts

## 🛠️ Technology Stack

- **Framework**: Angular 17
- **Language**: TypeScript 5.2
- **Styling**: Custom CSS with CSS Variables
- **HTTP Client**: Angular HttpClient
- **Forms**: Reactive Forms
- **Routing**: Angular Router
- **Icons**: Custom SVG icons

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

## 🔧 Installation

1. **Navigate to the front_end directory**:
```bash
cd front_end
```

2. **Install dependencies**:
```bash
npm install
```

3. **Install Angular CLI globally** (if not already installed):
```bash
npm install -g @angular/cli
```

## ⚙️ Configuration

The application connects to your microservices through the Spring Cloud Gateway.

**Default Gateway URL**: `http://localhost:8888`

To change the gateway URL, edit the environment files:
- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: false,
  gatewayUrl: 'http://localhost:8888'  // Change this to your gateway URL
};
```

## 🚀 Running the Application

### Development Server
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

### Production Build
```bash
npm run build
# or
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📡 API Integration

The front-end connects to the following microservices through the gateway:

### Customer Service
- **Base URL**: `{gatewayUrl}/customer-service/customers`
- **Endpoints**:
  - GET `/` - Get all customers
  - GET `/{id}` - Get customer by ID
  - POST `/` - Create customer
  - PUT `/{id}` - Update customer
  - DELETE `/{id}` - Delete customer
  - GET `/search/byName?name={name}` - Search customers

### Inventory Service
- **Base URL**: `{gatewayUrl}/inventory-service/products`
- **Endpoints**:
  - GET `/` - Get all products
  - GET `/{id}` - Get product by ID
  - POST `/` - Create product
  - PUT `/{id}` - Update product
  - DELETE `/{id}` - Delete product
  - GET `/search/byName?name={name}` - Search products

### Billing Service
- **Base URL**: `{gatewayUrl}/billing-service`
- **Endpoints**:
  - GET `/bills` - Get all bills
  - GET `/bills/{id}` - Get bill by ID
  - POST `/bills` - Create bill
  - DELETE `/bills/{id}` - Delete bill
  - GET `/bills/customer/{customerId}` - Get bills by customer

## 🏗️ Project Structure

```
front_end/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/           # Top navigation bar
│   │   │   ├── sidebar/          # Side navigation menu
│   │   │   ├── dashboard/        # Dashboard with statistics
│   │   │   ├── customers/        # Customer management
│   │   │   │   └── customer-form/
│   │   │   ├── products/         # Product management
│   │   │   │   └── product-form/
│   │   │   └── bills/            # Billing module
│   │   │       ├── bill-form/
│   │   │       └── bill-details/
│   │   ├── models/               # TypeScript interfaces
│   │   ├── services/             # API services
│   │   ├── app.component.ts      # Root component
│   │   ├── app.module.ts         # Main module
│   │   └── app-routing.module.ts # Routing configuration
│   ├── environments/             # Environment configurations
│   ├── assets/                   # Static assets
│   ├── styles.css               # Global styles
│   └── index.html               # HTML entry point
├── angular.json                 # Angular configuration
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Indigo (#6366f1)
- **Secondary**: Emerald (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Amber (#f59e0b)
- **Dark Background**: Slate (#0f172a, #1e293b)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Key Components

1. **Dashboard**
   - 4 stat cards with real-time metrics
   - Recent bills list
   - Low stock alerts

2. **Customer Management**
   - Searchable table
   - Modal form for add/edit
   - Avatar generation
   - Delete confirmation

3. **Product Management**
   - Stock status indicators
   - Price display
   - Quantity tracking
   - Product icons

4. **Billing System**
   - Multi-product selection
   - Dynamic price calculation
   - Customer selection
   - Printable invoice

## 🔍 Features in Detail

### Dashboard Analytics
- Total customers count
- Total products count
- Total revenue calculation
- Total bills count
- Recent 5 bills
- Products with quantity < 10

### Customer Module
- Real-time search
- Email validation
- Duplicate prevention
- Inline editing

### Product Module
- Stock level warnings (Out of Stock, Low Stock, In Stock)
- Price formatting
- Quantity management
- Product ID system

### Billing Module
- Multiple product items per bill
- Automatic total calculation
- Customer association via Open Feign
- Product association via Open Feign
- Professional invoice generation
- Print functionality

## 🚦 Running with Backend

1. **Start the backend services** in this order:
   ```bash
   # 1. Config Service (port 8888)
   # 2. Discovery Service (port 8761)
   # 3. Gateway Service (port 8888)
   # 4. Customer Service
   # 5. Inventory Service
   # 6. Billing Service
   ```

2. **Start the front-end**:
   ```bash
   cd front_end
   npm start
   ```

3. **Access the application**:
   - Front-end: http://localhost:4200
   - Gateway: http://localhost:8888
   - Eureka Dashboard: http://localhost:8761

## 🐛 Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your Spring Cloud Gateway is configured to allow requests from `http://localhost:4200`.

### API Connection Issues
- Verify the gateway is running on port 8888
- Check that all microservices are registered with Eureka
- Verify the environment configuration matches your setup

### Port Already in Use
```bash
# Kill process on port 4200
# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:4200 | xargs kill -9
```

## 📝 Development Tips

### Adding New Components
```bash
ng generate component components/new-component
```

### Adding New Services
```bash
ng generate service services/new-service
```

### Running Tests
```bash
ng test
```

### Code Formatting
The project uses Angular's built-in formatting. No additional linters configured.

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Advanced search and filtering
- [ ] Export to PDF/Excel
- [ ] Email notifications
- [ ] Charts and graphs (Chart.js integration)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Offline mode with service workers
- [ ] Real-time updates with WebSockets

## 📄 License

This project is part of the MicroCommerce Suite educational project.

## 👨‍💻 Author

Built with ❤️ for learning microservices architecture with Angular

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Spring Cloud for the microservices infrastructure
- The open-source community

---

**Happy Coding! 🚀**
