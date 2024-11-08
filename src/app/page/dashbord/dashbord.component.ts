import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CartService } from '../../cart.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {

  checkoutData = {
    name: '',
    address: '',
    paymentMethod: 'creditCard' // Default to 'creditCard'
  };

  public productList: any = [];

  cartItems: any[] = [];
  cartTotal: number = 0;

  selectedProduct: any = "";
  selectedQuantity: number = 1;

  constructor(private http: HttpClient, private router: Router, private cartService: CartService, private authService: AuthService, private fb: FormBuilder) {
    this.loadTable();
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.getCartTotal();
    });
  }

  loadTable() {
    this.http.get("http://localhost:8080/product/getAll-product").subscribe(data => {
      console.log(data);
      this.productList = data;

    })
  }

  viewProduct(product: any) {
    this.selectedProduct = product;
    this.selectedQuantity = 1;
  }

  addToCart(product: any, quantity: number) {
    if (this.authService.isLoggedIn()) {
      this.cartService.addToCart(product, quantity);
      alert(`${quantity} x ${product.prName} has been added to your cart.`);
    }else{
    this.router.navigate(['']);
    alert("Please login or register...after perchese product..")
    }
  }

  checkout() {
    alert("Proceeding to checkout...");
    // Additional checkout logic can go here
  }

  clearCart() {
    this.cartService.clearCart();  // Reset the cart items to an empty array
  }


  onSubmitCheckout(form: any) {
    if (form.valid) {
      this.cartService.checkout(this.checkoutData);
      alert("Order placed successfully!");
      form.reset();  // Reset the form after submission
    }
  }
}
