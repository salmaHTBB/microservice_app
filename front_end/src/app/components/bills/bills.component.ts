import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill.model';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  loading = false;
  errorMessage = '';
  showCreateForm = false;

  constructor(
    private billService: BillService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.loading = true;
    this.errorMessage = '';
    this.billService.getAllBills().subscribe({
      next: (extractedBills) => {
        this.bills = extractedBills; // Plus besoin de vérifier Array.isArray ici
        this.loading = false;
        console.log('Bills loaded:', this.bills.length);
      },
      error: (error) => {
        console.error('Error loading bills:', error);
        this.errorMessage = 'Failed to load bills. Please check if the billing service is running.';
        this.loading = false;
      }
    });
  }

  viewBill(bill: Bill): void {
    this.router.navigate(['/bills', bill.id]);
  }

  calculateTotal(bill: Bill): number {
    return bill.productItems?.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0) || 0;
  }

  formatDate(date: any): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  onBillCreated(): void {
    this.showCreateForm = false;
    this.loadBills();
  }
}
