import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { BillService } from '../../services/bill.service';

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: StatCard[] = [];
  loading = true;
  recentBills: any[] = [];
  lowStockProducts: any[] = [];

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    Promise.all([
      this.customerService.getAllCustomers().toPromise(),
      this.productService.getAllProducts().toPromise(),
      this.billService.getAllBills().toPromise()
    ]).then(([customers, products, bills]) => {
      const customerCount = customers?._embedded?.customers?.length || 0;
      const productList = products?._embedded?.products || [];
      const billList = bills?._embedded?.bills || [];
      
      const totalRevenue = billList.reduce((sum: number, bill: any) => {
        const billTotal = bill.productItems?.reduce((itemSum: number, item: any) => 
          itemSum + (item.quantity * item.unitPrice), 0) || 0;
        return sum + billTotal;
      }, 0);

      this.stats = [
        {
          title: 'Total Customers',
          value: customerCount,
          change: '+12.5%',
          trend: 'up',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke-width="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-width="2"/></svg>',
          color: '#6366f1'
        },
        {
          title: 'Total Products',
          value: productList.length,
          change: '+8.2%',
          trend: 'up',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke-width="2"/></svg>',
          color: '#10b981'
        },
        {
          title: 'Total Revenue',
          value: `$${totalRevenue.toFixed(2)}`,
          change: '+23.1%',
          trend: 'up',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23" stroke-width="2"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-width="2"/></svg>',
          color: '#f59e0b'
        },
        {
          title: 'Total Bills',
          value: billList.length,
          change: '+15.3%',
          trend: 'up',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2"/><polyline points="14 2 14 8 20 8" stroke-width="2"/></svg>',
          color: '#3b82f6'
        }
      ];

      this.recentBills = billList.slice(0, 5);
      this.lowStockProducts = productList.filter((p: any) => p.quantity < 10).slice(0, 5);
      this.loading = false;
    }).catch(error => {
      console.error('Error loading dashboard data:', error);
      this.loading = false;
    });
  }

  formatDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }
}
