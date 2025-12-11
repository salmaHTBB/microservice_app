import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bill } from '../models/bill.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = `${environment.gatewayUrl}/billing-service`;
  private billsApiUrl = `${this.apiUrl}/bills`;

  constructor(private http: HttpClient) { }

  getAllBills(): Observable<any> {
    // Use custom REST endpoint that returns bills with full details
    return this.http.get<any>(this.billsApiUrl).pipe(
      map(response => {
        // Handle both Spring Data REST format and custom endpoint format
        if (response._embedded && response._embedded.bills) {
          return response._embedded.bills;
        } else if (Array.isArray(response)) {
          return response;
        }
        return [];
      })
    );
  }

  getBill(id: number): Observable<Bill> {
    // This uses the custom BillRestController endpoint with full customer and product details
    return this.http.get<Bill>(`${this.billsApiUrl}/${id}`);
  }

  getBillsByCustomer(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.billsApiUrl}/search/findByCustomerId?customerId=${customerId}`).pipe(
      map(response => response._embedded ? response._embedded.bills : [])
    );
  }

  createBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.billsApiUrl, bill);
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.billsApiUrl}/${id}`);
  }
}
