import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="brand-text">MicroCommerce Suite</span>
      </div>
      
      <div class="navbar-actions">
        <button class="nav-btn" title="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="badge-notification">3</span>
        </button>
        
        <div class="user-menu">
          <div class="user-avatar">
            <span>AD</span>
          </div>
          <span class="user-name">Admin</span>
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
      height: 64px;
      background: var(--dark-bg-light);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: 100;
      box-shadow: var(--shadow);
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      color: var(--primary-color);
    }

    .brand-text {
      font-size: 20px;
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .nav-btn {
      position: relative;
      background: transparent;
      border: none;
      color: var(--text-muted);
      width: 40px;
      height: 40px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-btn:hover {
      background: var(--dark-bg);
      color: var(--text-light);
    }

    .nav-btn svg {
      width: 20px;
      height: 20px;
    }

    .badge-notification {
      position: absolute;
      top: 4px;
      right: 4px;
      background: var(--danger-color);
      color: white;
      font-size: 10px;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .user-menu:hover {
      background: var(--dark-bg);
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 14px;
    }

    .user-name {
      font-weight: 600;
      color: var(--text-light);
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 0 16px;
      }

      .brand-text {
        display: none;
      }

      .user-name {
        display: none;
      }
    }
  `]
})
export class NavbarComponent { }
