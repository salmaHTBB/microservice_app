import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  showModal = false;
  selectedCustomer: Customer | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.customers = response || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.errorMessage = 'Failed to load customers';
        this.loading = false;
      }
    });
  }

  openModal(customer?: Customer): void {
    this.selectedCustomer = customer || null;
    this.showModal = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCustomer = null;
  }

  onCustomerSaved(): void {
    this.closeModal();
    this.loadCustomers();
    this.successMessage = 'Customer saved successfully!';
    setTimeout(() => this.successMessage = '', 3000);
  }

  deleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      this.customerService.deleteCustomer(customer.id!).subscribe({
        next: () => {
          this.successMessage = 'Customer deleted successfully!';
          this.loadCustomers();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
          this.errorMessage = 'Failed to delete customer';
        }
      });
    }
  }
}
