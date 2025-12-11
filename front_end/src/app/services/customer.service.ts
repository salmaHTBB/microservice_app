import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.gatewayUrl}/customer-service/customers`;

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response._embedded ? response._embedded.customers : [])
    );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCustomers(name: string): Observable<any> {
    if (!name || name.trim() === '') {
      return this.getAllCustomers();
    }
    // Spring Data REST search by name (contains)
    return this.http.get<any>(`${this.apiUrl}/search/findByNameContaining?name=${name}`).pipe(
      map(response => response._embedded ? response._embedded.customers : [])
    );
  }
}
