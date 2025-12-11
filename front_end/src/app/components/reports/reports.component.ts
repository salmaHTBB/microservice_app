import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  loading: boolean = true;
  dateRange: string = 'month';
  Math = Math;
  
  stats = {
    totalRevenue: 0,
    totalBills: 0,
    totalCustomers: 0,
    totalProducts: 0,
    averageBill: 0,
    topProducts: [] as any[],
    topCustomers: [] as any[],
    recentActivity: [] as any[]
  };

  revenueData: any[] = [];
  productCategories: any[] = [];

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;

    Promise.all([
      this.customerService.getAllCustomers().toPromise(),
      this.productService.getAllProducts().toPromise(),
      this.billService.getAllBills().toPromise()
    ]).then(([customers, products, bills]) => {
      this.stats.totalCustomers = customers?.length || 0;
      this.stats.totalProducts = products?.length || 0;
      this.stats.totalBills = bills?.length || 0;

      // Calculate revenue from actual bills
      if (bills && bills.length > 0) {
        this.stats.totalRevenue = bills.reduce((sum: number, bill: any) => {
          const billTotal = this.calculateBillTotal(bill);
          return sum + billTotal;
        }, 0);
        this.stats.averageBill = this.stats.totalRevenue / bills.length;

        // Calculate revenue by month from bills
        this.calculateRevenueByMonth(bills);

        // Get top products from bills
        this.calculateTopProducts(bills);

        // Get top customers from bills
        this.calculateTopCustomers(bills, customers);
      }

      // Calculate product categories distribution
      if (products && products.length > 0) {
        this.calculateProductCategories(products);
      }

      this.loading = false;
    }).catch(error => {
      console.error('Error loading reports:', error);
      this.loading = false;
    });
  }

  calculateRevenueByMonth(bills: any[]): void {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueByMonth: { [key: string]: number } = {};
    
    bills.forEach(bill => {
      const date = new Date(bill.billingDate || bill.createdAt || Date.now());
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      const revenue = this.calculateBillTotal(bill);
      
      if (!revenueByMonth[monthKey]) {
        revenueByMonth[monthKey] = 0;
      }
      revenueByMonth[monthKey] += revenue;
    });

    // Get last 6 months
    const now = new Date();
    this.revenueData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      this.revenueData.push({
        month: monthNames[date.getMonth()],
        revenue: revenueByMonth[monthKey] || 0
      });
    }
  }

  calculateTopProducts(bills: any[]): void {
    const productStats: { [key: string]: { name: string, quantity: number, revenue: number } } = {};
    
    bills.forEach(bill => {
      if (bill.productItems) {
        bill.productItems.forEach((item: any) => {
          const productId = item.productId || item.product?.id;
          const productName = item.product?.name || item.productName || 'Unknown Product';
          
          if (!productStats[productId]) {
            productStats[productId] = { name: productName, quantity: 0, revenue: 0 };
          }
          
          productStats[productId].quantity += item.quantity || 0;
          productStats[productId].revenue += (item.unitPrice || 0) * (item.quantity || 0);
        });
      }
    });

    this.stats.topProducts = Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }

  calculateTopCustomers(bills: any[], customers: any[]): void {
    const customerStats: { [key: number]: { name: string, email: string, orders: number, spent: number } } = {};
    
    bills.forEach(bill => {
      const customerId = bill.customerId || bill.customer?.id;
      const customer = customers.find(c => c.id === customerId);
      
      if (customerId) {
        if (!customerStats[customerId]) {
          customerStats[customerId] = {
            name: bill.customer?.name || customer?.name || 'Unknown',
            email: bill.customer?.email || customer?.email || '',
            orders: 0,
            spent: 0
          };
        }
        
        customerStats[customerId].orders += 1;
        customerStats[customerId].spent += this.calculateBillTotal(bill);
      }
    });

    this.stats.topCustomers = Object.entries(customerStats)
      .map(([id, stats]) => ({ id: parseInt(id), ...stats }))
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 5);
  }

  calculateProductCategories(products: any[]): void {
    // If products have category field, use it; otherwise create simple distribution
    const categories: { [key: string]: number } = {};
    
    products.forEach(product => {
      const category = product.category || 'Other';
      categories[category] = (categories[category] || 0) + 1;
    });

    const total = products.length;
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];
    
    this.productCategories = Object.entries(categories).map(([name, count], index) => ({
      name,
      value: Math.round((count / total) * 100),
      color: colors[index % colors.length]
    }));
  }

  calculateBillTotal(bill: any): number {
    if (!bill.productItems || bill.productItems.length === 0) return 0;
    
    const subtotal = bill.productItems.reduce((sum: number, item: any) => {
      return sum + (item.unitPrice * item.quantity);
    }, 0);
    
    const tax = subtotal * 0.20; // 20% tax
    return subtotal + tax;
  }

  changeDateRange(range: string): void {
    this.dateRange = range;
    // Would reload data with new date range
    this.loadReports();
  }

  exportReport(format: string): void {
    alert(`Exporting report as ${format.toUpperCase()}...`);
    // Would implement actual export functionality
  }

  printReport(): void {
    window.print();
  }
}
