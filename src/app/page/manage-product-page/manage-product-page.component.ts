import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-product-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './manage-product-page.component.html',
  styleUrl: './manage-product-page.component.css'
})
export class ManageProductPageComponent {

  public productList: any = [];

  constructor(private http: HttpClient) {
    this.loadTable();
  }
  loadTable() {
    this.http.get("http://localhost:8080/product/getAll-product").subscribe(data => {
      console.log(data);
      this.productList=data;
    })
  }

  deleteProductById(prId: any) {
    console.log(prId);
    this.http.delete(`http://localhost:8080/product/delete-product-by-id/${prId}`).subscribe(data => {
      alert("product deleted !!!!");
      this.loadTable();
    })

  }
  public productTemp: any = {}
  updateProduct(product: any) {
    console.log(product);
    this.productTemp = product;

  }
  saveProduct() {
    this.http.put("http://localhost:8080/product/update-product", this.productTemp).subscribe(data => {
      alert("product Updated!!!!!")
    })
  }

}
