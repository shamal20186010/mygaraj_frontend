import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css'
})
export class AddProductPageComponent {

  prName: string = '';
  prDescription: string = '';
  prQty: number = 0;
  prCategory: string = '';
  prPrice: number = 0;
  image: File | null = null;

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private productService: ProductService) { }

  onImageSelected(event: any) {
    this.image = event.target.files[0];
  }


  addProduct() {
    if (this.image) {
      this.productService.addProduct(
        this.prName,
        this.prDescription,
        this.prQty,
        this.prCategory,
        this.prPrice,
        this.image
      ).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          alert("Product added successfully")
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.log('No image selected');
    }
  }

}
