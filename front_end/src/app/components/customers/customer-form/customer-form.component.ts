import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: Customer | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  customerForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.customerForm = this.fb.group({
      name: [this.customer?.name || '', [Validators.required, Validators.minLength(2)]],
      email: [this.customer?.email || '', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.loading = true;
      const customerData: Customer = this.customerForm.value;

      const operation = this.customer
        ? this.customerService.updateCustomer(this.customer.id!, customerData)
        : this.customerService.createCustomer(customerData);

      operation.subscribe({
        next: () => {
          this.loading = false;
          this.saved.emit();
        },
        error: (error) => {
          console.error('Error saving customer:', error);
          this.errorMessage = 'Failed to save customer. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  get name() { return this.customerForm.get('name'); }
  get email() { return this.customerForm.get('email'); }
}
