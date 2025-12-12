import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../../../services/bill.service';
import { Bill } from '../../../models/bill.model';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  bill: Bill | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadBill(id);
  }

  loadBill(id: number): void {
    this.loading = true;
    this.billService.getBill(id).subscribe({
      next: (bill) => {
        console.log('Bill loaded:', bill);
        console.log('Product items:', bill.productItems);
        this.bill = bill;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bill:', error);
        this.errorMessage = 'Failed to load bill details';
        this.loading = false;
      }
    });
  }

  calculateItemTotal(item: any): number {
    const quantity = Number(item.quantity) || 0;
    const unitPrice = Number(item.unitPrice) || 0;
    const total = quantity * unitPrice;
    console.log(`Item: quantity=${quantity}, unitPrice=${unitPrice}, total=${total}`);
    return total;
  }

  calculateSubtotal(): number {
    if (!this.bill?.productItems || this.bill.productItems.length === 0) {
      console.log('No product items found');
      return 0;
    }
    const subtotal = this.bill.productItems.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      return sum + (quantity * unitPrice);
    }, 0);
    console.log('Subtotal:', subtotal);
    return subtotal;
  }

  calculateTax(): number {
    return this.calculateSubtotal() * 0.1; // 10% tax
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax();
  }

  goBack(): void {
    this.router.navigate(['/bills']);
  }

  printBill(): void {
    window.print();
  }

  formatDate(date: any): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
