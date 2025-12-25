import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  productForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      id: [this.product?.id || '', this.product ? [] : [Validators.required]],
      name: [this.product?.name || '', [Validators.required, Validators.minLength(2)]],
      price: [this.product?.price || '', [Validators.required, Validators.min(0)]],
      quantity: [this.product?.quantity || 0, [Validators.required, Validators.min(0)]]
    });

    // Disable ID field when editing
    if (this.product) {
      this.productForm.get('id')?.disable();
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      const productData: Product = this.productForm.getRawValue();

      const operation = this.product
        ? this.productService.updateProduct(this.product.id!, productData)
        : this.productService.createProduct(productData);

      operation.subscribe({
        next: () => {
          this.loading = false;
          this.saved.emit();
        },
        error: (error) => {
          console.error('Error saving product:', error);
          this.errorMessage = 'Failed to save product. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  get id() { return this.productForm.get('id'); }
  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get quantity() { return this.productForm.get('quantity'); }
}
