import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BillService } from '../../../services/bill.service';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { Customer } from '../../../models/customer.model';
import { Product } from '../../../models/product.model';
import { Bill, ProductItem } from '../../../models/bill.model';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  billForm!: FormGroup;
  loading = false;
  errorMessage = '';
  customers: Customer[] = [];
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private billService: BillService,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCustomers();
    this.loadProducts();
  }

  initForm(): void {
    this.billForm = this.fb.group({
      customerId: ['', Validators.required],
      productItems: this.fb.array([])
    });
    this.addProductItem();
  }

  get productItems(): FormArray {
    return this.billForm.get('productItems') as FormArray;
  }

  createProductItem(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addProductItem(): void {
    this.productItems.push(this.createProductItem());
  }

  removeProductItem(index: number): void {
    if (this.productItems.length > 1) {
      this.productItems.removeAt(index);
    }
  }

  onProductChange(index: number): void {
    const productId = this.productItems.at(index).get('productId')?.value;
    const product = this.products.find(p => p.id == productId);
    console.log('Product selected:', productId, 'Found:', product);
    if (product && product.price) {
      this.productItems.at(index).patchValue({ unitPrice: product.price });
      console.log('Updated unit price to:', product.price);
    }
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.customers = response || [];
      },
      error: (error) => console.error('Error loading customers:', error)
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response || [];
        console.log('Products loaded:', this.products);
      },
      error: (error) => console.error('Error loading products:', error)
    });
  }

  calculateItemTotal(index: number): number {
    const item = this.productItems.at(index).value;
    return item.quantity * item.unitPrice;
  }

  calculateGrandTotal(): number {
    return this.productItems.controls.reduce((total, control) => {
      const item = control.value;
      return total + (item.quantity * item.unitPrice);
    }, 0);
  }

  onSubmit(): void {
    if (this.billForm.valid) {
      this.loading = true;
      
      // Format the bill data properly
      const billData: Bill = {
        customerId: Number(this.billForm.value.customerId),
        billingDate: new Date().toISOString(),
        productItems: this.billForm.value.productItems.map((item: any) => ({
          productId: String(item.productId),
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice)
        }))
      };

      console.log('Creating bill with data:', billData);

      this.billService.createBill(billData).subscribe({
        next: (response) => {
          console.log('Bill created successfully:', response);
          this.loading = false;
          this.saved.emit();
        },
        error: (error) => {
          console.error('Error creating bill:', error);
          this.errorMessage = 'Failed to create bill. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
