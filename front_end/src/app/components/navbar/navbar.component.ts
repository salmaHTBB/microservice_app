import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar glass fade-in-down">
      <div class="navbar-container">
        <!-- Brand Logo -->
        <div class="navbar-brand" routerLink="/customers">
          <div class="logo-wrapper pulse">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="brand-content">
            <span class="brand-text gradient-text">Microservices Platform</span>
            <span class="brand-subtitle">Management System</span>
          </div>
        </div>
        
        <!-- Search Bar -->
        <div class="navbar-search">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="m21 21-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input type="text" placeholder="Search anything..." class="search-input" />
          <kbd class="search-kbd">Ctrl K</kbd>
        </div>
        
        <!-- Actions -->
        <div class="navbar-actions">
          <!-- Quick Actions -->
          <div class="quick-actions">
            <button class="action-btn hover-lift" title="Dashboard" routerLink="/customers">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7" stroke-width="2" rx="1"/>
                <rect x="14" y="3" width="7" height="7" stroke-width="2" rx="1"/>
                <rect x="14" y="14" width="7" height="7" stroke-width="2" rx="1"/>
                <rect x="3" y="14" width="7" height="7" stroke-width="2" rx="1"/>
              </svg>
            </button>
            
            <button class="action-btn hover-lift" title="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke-width="2" stroke-linecap="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span class="notification-badge pulse" *ngIf="notificationCount > 0">{{ notificationCount }}</span>
            </button>
            
            <button class="action-btn hover-lift" title="Settings">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3" stroke-width="2"/>
                <path d="M12 1v6m0 6v6M3.93 3.93l4.24 4.24m5.66 5.66l4.24 4.24M1 12h6m6 0h6M3.93 20.07l4.24-4.24m5.66-5.66l4.24-4.24" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <!-- Divider -->
          <div class="navbar-divider"></div>
          
          <!-- User Profile -->
          <div class="user-profile hover-lift">
            <div class="user-avatar gradient-primary">
              <span>AD</span>
              <div class="status-indicator"></div>
            </div>
            <div class="user-info">
              <span class="user-name">Admin User</span>
              <span class="user-role">Administrator</span>
            </div>
            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 72px;
      background: rgba(26, 34, 52, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      z-index: 100;
      box-shadow: var(--shadow-lg);
    }

    .navbar-container {
      max-width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    .navbar-brand:hover .logo-wrapper {
      transform: rotate(180deg);
    }

    .logo-wrapper {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      border-radius: 0.75rem;
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
      transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .logo-icon {
      width: 1.75rem;
      height: 1.75rem;
      color: white;
      stroke-width: 2.5;
    }

    .brand-content {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .brand-text {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .brand-subtitle {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .navbar-search {
      position: relative;
      flex: 1;
      max-width: 500px;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 3rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      color: var(--text-primary);
      font-size: 0.938rem;
      transition: all 0.2s ease;
      outline: none;
    }

    .search-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .search-input::placeholder {
      color: var(--text-muted);
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.25rem;
      height: 1.25rem;
      color: var(--text-muted);
      stroke-width: 2;
    }

    .search-kbd {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      padding: 0.25rem 0.5rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-shrink: 0;
    }

    .quick-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .action-btn {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
    }

    .action-btn:hover {
      background: var(--bg-tertiary);
      border-color: var(--border-heavy);
      color: var(--text-primary);
    }

    .action-btn svg {
      width: 1.25rem;
      height: 1.25rem;
      stroke-width: 2;
    }

    .notification-badge {
      position: absolute;
      top: -0.25rem;
      right: -0.25rem;
      min-width: 1.25rem;
      height: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.375rem;
      background: var(--danger);
      color: white;
      font-size: 0.625rem;
      font-weight: 800;
      border-radius: 9999px;
      border: 2px solid var(--bg-card);
    }

    .navbar-divider {
      width: 1px;
      height: 2rem;
      background: var(--divider);
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 1rem 0.5rem 0.5rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .user-profile:hover {
      background: var(--bg-tertiary);
      border-color: var(--border-heavy);
    }

    .user-avatar {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      border-radius: 0.75rem;
      color: white;
      font-weight: 700;
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    .status-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0.75rem;
      height: 0.75rem;
      background: var(--success);
      border: 2px solid var(--bg-elevated);
      border-radius: 50%;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.2;
    }

    .user-role {
      font-size: 0.75rem;
      color: var(--text-muted);
      line-height: 1.2;
    }

    .dropdown-icon {
      width: 1rem;
      height: 1rem;
      color: var(--text-muted);
      stroke-width: 2;
      transition: transform 0.2s ease;
    }

    .user-profile:hover .dropdown-icon {
      transform: translateY(2px);
    }

    @media (max-width: 1024px) {
      .navbar-search {
        max-width: 300px;
      }
      
      .user-info {
        display: none;
      }
      
      .search-kbd {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .navbar-container {
        padding: 0 1rem;
        gap: 1rem;
      }
      
      .navbar-search {
        display: none;
      }
      
      .brand-content {
        display: none;
      }
      
      .quick-actions .action-btn:not(:first-child) {
        display: none;
      }
      
      .navbar-divider {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  notificationCount: number = 0;
  
  constructor(private router: Router) {}
}
