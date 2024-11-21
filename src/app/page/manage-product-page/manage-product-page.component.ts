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

  productList: any[] = [];
  productTemp: any = {};
  selectedFile: File | null = null;

  // public productList: any = [];

  constructor(private http: HttpClient) {
    this.loadTable();
  }
  loadTable() {
    this.http.get('http://localhost:8080/product/getAll-product').subscribe(
      (response: any) => {
        this.productList = response;
      },
      (error) => {
        console.error('Failed to load products:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  deleteProductById(prId: any) {
    console.log(prId);
    this.http.delete(`http://localhost:8080/product/delete-product-by-id/${prId}`).subscribe(data => {
      alert("product deleted !!!!");
      this.loadTable();
    })

  }
  
  updateProduct(product: any) {
    console.log("update product"+product);
    this.productTemp = { ...product };
    this.selectedFile = null;

  }
  saveProduct() {
    const formData = new FormData();
    formData.append('prName', this.productTemp.prName);
    formData.append('prDescription', this.productTemp.prDescription);
    formData.append('prQty', this.productTemp.prQty.toString());
    formData.append('prCategory', this.productTemp.prCategory);
    formData.append('prPrice', this.productTemp.prPrice.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    console.log(formData);
    

    this.http.put(`http://localhost:8080/product/update-product/${this.productTemp.prId}`, formData, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.loadTable(); // Refresh the product list
      },
      (error) => {
        console.error('Failed to update product:', error);
      }
    );
  }

}
