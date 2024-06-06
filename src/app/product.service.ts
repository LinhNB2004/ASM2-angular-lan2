import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private URL = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.URL);
  }

  getProductByID(id: string | number | undefined) {
    return this.http.get<Product>(`${this.URL}/${id}`);
  }
  createProduct(product: Product) {
    return this.http.post(`${this.URL}`, product);
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.URL}/${product.id}`, product);
  }

  deleteProduct(id: string | number | undefined) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
