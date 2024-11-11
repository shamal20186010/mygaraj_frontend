import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/product/getAll-product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  filterProductsByName(products: any[], query: string): any[] {
    if (!query) {
      return products;
    }
    return products.filter(product =>
      product.prName && product.prName.toLowerCase().includes(query.toLowerCase())
    );
  }
}
