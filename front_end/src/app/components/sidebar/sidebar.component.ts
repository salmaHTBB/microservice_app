import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar glass slide-in-left">
      <!-- Quick Stats -->
      <div class="sidebar-stats fade-in">
        <div class="stat-mini hover-lift stagger-1">
          <div class="stat-mini-icon" style="background: rgba(99, 102, 241, 0.2); color: var(--primary);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
          </div>
          <div class="stat-mini-value gradient-text">{{ customerCount }}</div>
          <div class="stat-mini-label">Customers</div>
        </div>
        
        <div class="stat-mini hover-lift stagger-2">
          <div class="stat-mini-icon" style="background: rgba(16, 185, 129, 0.2); color: var(--success);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
          </div>
          <div class="stat-mini-value gradient-text">{{ productCount }}</div>
          <div class="stat-mini-label">Products</div>
        </div>
      </div>
      
      <!-- Navigation Menu -->
      <div class="sidebar-section">
        <div class="section-title">Navigation</div>
        <div class="sidebar-menu">
          <div 
            *ngFor="let item of menuItems; let i = index" 
            class="menu-item hover-lift" 
            [class.active]="isActive(item.route)"
            [class.stagger-{{i + 1}}]="true"
            (click)="navigate(item.route)">
            <div class="menu-icon" [innerHTML]="item.icon"></div>
            <span class="menu-label">{{ item.label }}</span>
            <span class="menu-badge pulse" *ngIf="item.badge">{{ item.badge }}</span>
            <div class="menu-indicator" *ngIf="isActive(item.route)"></div>
          </div>
        </div>
      </div>
      
    </aside>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      left: 0;
      top: 72px;
      width: 280px;
      height: calc(100vh - 72px);
      background: rgba(26, 34, 52, 0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-right: 1px solid var(--border);
      padding: 1.5rem;
      overflow-y: auto;
      z-index: var(--z-sticky);
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    /* Quick Stats */
    .sidebar-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .stat-mini {
      padding: 1rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      text-align: center;
      transition: all var(--transition);
    }

    .stat-mini-icon {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 auto 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
    }

    .stat-mini-icon svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .stat-mini-value {
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 0.25rem;
    }

    .stat-mini-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    /* Section */
    .sidebar-section {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      padding: 0 0.5rem;
    }

    .sidebar-menu {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .menu-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.875rem;
      padding: 0.875rem 1rem;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all var(--transition);
      color: var(--text-muted);
      font-weight: 500;
      overflow: hidden;
    }

    .menu-item::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      opacity: 0;
      transition: opacity var(--transition);
    }

    .menu-item > * {
      position: relative;
      z-index: 1;
    }

    .menu-item:hover {
      background: var(--bg-elevated);
      color: var(--text-secondary);
      transform: translateX(4px);
    }

    .menu-item.active {
      color: white;
      font-weight: 600;
    }

    .menu-item.active::before {
      opacity: 1;
    }

    .menu-item.active .menu-icon {
      animation: pulse-scale 2s ease-in-out infinite;
    }

    .menu-icon {
      width: 1.25rem;
      height: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .menu-icon svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
      stroke-width: 2;
    }

    .menu-label {
      flex: 1;
      font-size: 0.938rem;
    }

    .menu-badge {
      min-width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.5rem;
      background: var(--danger);
      color: white;
      font-size: 0.75rem;
      font-weight: 800;
      border-radius: var(--radius-full);
    }

    .menu-item.active .menu-badge {
      background: white;
      color: var(--primary);
    }

    .menu-indicator {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      background: white;
      border-radius: 2px 0 0 2px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }

    /* Upgrade Card */
    .sidebar-card {
      margin-top: auto;
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      text-align: center;
    }

    .card-icon {
      width: 3rem;
      height: 3rem;
      margin: 0 auto 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary) 0%, var(--purple) 100%);
      border-radius: var(--radius-lg);
      color: white;
    }

    .card-icon svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    .card-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .card-text {
      font-size: 0.813rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .card-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    @media (max-width: 1024px) {
      .sidebar {
        width: 240px;
      }
      
      .sidebar-stats {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }
    }
  `]
})
export class SidebarComponent implements OnInit {
  customerCount: number = 0;
  productCount: number = 0;
  loading: boolean = true;

  menuItems: MenuItem[] = [
    {
      label: 'Customers',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
      route: '/customers'
    },
    {
      label: 'Products',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
      route: '/products'
    },
    {
      label: 'Bills',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
      route: '/bills'
    }
  ];

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    // Load customer count
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customerCount = customers?.length || 0;
      },
      error: (error) => {
        console.error('Error loading customer count:', error);
        this.customerCount = 0;
      }
    });

    // Load product count
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.productCount = products?.length || 0;
      },
      error: (error) => {
        console.error('Error loading product count:', error);
        this.productCount = 0;
      }
    });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
