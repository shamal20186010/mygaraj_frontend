import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/product/getAll-product';

  private addProductUrl = 'http://localhost:8080/product/add-product';

  constructor(private http: HttpClient) { }

  addProduct(prName: string, prDescription: string, prQty: number, prCategory: string, prPrice: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('prName', prName);
    formData.append('prDescription', prDescription);
    formData.append('prQty', prQty.toString());
    formData.append('prCategory', prCategory);
    formData.append('prPrice', prPrice.toString());
    formData.append('image', image); // Add the file (image)

    return this.http.post(this.addProductUrl, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    });
  }

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
