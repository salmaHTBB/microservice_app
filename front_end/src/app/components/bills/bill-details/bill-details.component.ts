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
    return item.quantity * item.unitPrice;
  }

  calculateSubtotal(): number {
    return this.bill?.productItems?.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0) || 0;
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
