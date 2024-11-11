import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css'
})
export class AddProductPageComponent {
  public product: any = {
    prName: "",
    prDescription: "",
    prQty: "",
    prCategory: "",
    prPrice: ""
  };

  constructor(private http: HttpClient) { }

  public addProduct() {
    this.http.post("http://localhost:8080/product/add-product", this.product).subscribe((data) => {
      alert("Product Added!!!!");
    })
  }

}
