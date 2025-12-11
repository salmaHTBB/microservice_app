import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <div class="content-area">
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
    }

    .main-content {
      display: flex;
      flex: 1;
      padding-top: 64px;
    }

    .content-area {
      flex: 1;
      padding: 32px;
      margin-left: 260px;
      transition: margin-left 0.3s ease;
    }

    @media (max-width: 768px) {
      .content-area {
        margin-left: 0;
        padding: 16px;
      }
    }
  `]
})
export class AppComponent {
  title = 'MicroCommerce Suite';
}
