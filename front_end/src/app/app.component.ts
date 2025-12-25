import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <div class="content-area fade-in">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .app-container::before {
      content: '';
      position: fixed;
      inset: 0;
      background: 
        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent),
        radial-gradient(ellipse 60% 40% at 80% 60%, rgba(168, 85, 247, 0.1), transparent),
        radial-gradient(ellipse 50% 50% at 20% 80%, rgba(16, 185, 129, 0.1), transparent);
      pointer-events: none;
      z-index: 0;
    }

    .main-content {
      display: flex;
      flex: 1;
      padding-top: 72px;
      position: relative;
      z-index: 1;
    }

    .content-area {
      flex: 1;
      padding: 2rem;
      margin-left: 280px;
      transition: all var(--transition);
      min-height: calc(100vh - 72px);
    }

    @media (max-width: 1024px) {
      .content-area {
        margin-left: 240px;
      }
    }

    @media (max-width: 768px) {
      .content-area {
        margin-left: 0;
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'Microservices Management Platform';
}
