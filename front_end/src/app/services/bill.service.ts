import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { Bill } from '../models/bill.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BillService {
    private readonly apiUrl = `${environment.gatewayUrl}/billing-service/api/bills`;
  private readonly REQUEST_TIMEOUT = 30000; // 30 seconds
  private readonly RETRY_ATTEMPTS = 2;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => error);
  }

  // Modifie la méthode getAllBills pour extraire les données de _embedded
  getAllBills(): Observable<Bill[]> {
    return this.http.get<any>(this.apiUrl).pipe(
        map(response => response._embedded ? response._embedded.bills : []),
        timeout(this.REQUEST_TIMEOUT),
        retry(this.RETRY_ATTEMPTS),
        catchError(this.handleError)
    );
  }

  getBill(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError(this.handleError)
    );
  }

  getBillsByCustomer(customerId: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}?customerId=${customerId}`).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError(this.handleError)
    );
  }

  createBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, bill).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError(this.handleError)
    );
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError(this.handleError)
    );
  }
}
