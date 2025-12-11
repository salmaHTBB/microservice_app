import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.gatewayUrl}/inventory-service/products`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response._embedded ? response._embedded.products : [])
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchProducts(name: string): Observable<any> {
    if (!name || name.trim() === '') {
      return this.getAllProducts();
    }
    // Spring Data REST search by name (contains)
    return this.http.get<any>(`${this.apiUrl}/search/findByNameContaining?name=${name}`).pipe(
      map(response => response._embedded ? response._embedded.products : [])
    );
  }
}
