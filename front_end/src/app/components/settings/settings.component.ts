import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings = {
    companyName: 'MicroCommerce Suite',
    companyEmail: 'contact@microcommerce.com',
    companyPhone: '(555) 123-4567',
    companyAddress: '123 Business Street, Commerce City',
    taxRate: 20,
    currency: 'DH',
    language: 'fr',
    theme: 'dark',
    notifications: true,
    emailNotifications: true,
    autoBackup: true
  };

  activeTab: string = 'company';

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
  }

  saveSettings(): void {
    localStorage.setItem('appSettings', JSON.stringify(this.settings));
    alert('Settings saved successfully! ✓');
  }

  resetSettings(): void {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      localStorage.removeItem('appSettings');
      this.settings = {
        companyName: 'MicroCommerce Suite',
        companyEmail: 'contact@microcommerce.com',
        companyPhone: '(555) 123-4567',
        companyAddress: '123 Business Street, Commerce City',
        taxRate: 20,
        currency: 'DH',
        language: 'fr',
        theme: 'dark',
        notifications: true,
        emailNotifications: true,
        autoBackup: true
      };
      alert('Settings reset successfully! ✓');
    }
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  exportSettings(): void {
    const dataStr = JSON.stringify(this.settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'settings.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  importSettings(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const imported = JSON.parse(e.target.result);
          this.settings = { ...this.settings, ...imported };
          this.saveSettings();
          alert('Settings imported successfully! ✓');
        } catch (error) {
          alert('Error importing settings. Invalid file format.');
        }
      };
      reader.readAsText(file);
    }
  }
}
