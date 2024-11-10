import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
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

  isCheckOutVisible: boolean = false;
  isPlaceOrderVisible: boolean = true;

  userdata: any;

  checkoutData = {
    name: '',
    address: '',
    paymentMethod: 'creditCard'
  };

  totalAmount = 0;

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
    this.authService.user$.subscribe(userData => {
      this.userdata = userData;
    });
    if (this.authService.isLoggedIn()) {
      this.isCheckOutVisible = true;
    }
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
      this.isPlaceOrderVisible = true;
    } else {
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


  Checkout() {
    // Ensure that checkoutData has the required fields
    if (!this.userdata.name || !this.userdata.address) {
      alert('Please provide all necessary details (Name and Address).');
      return;
    }

    const orderData = {
      customerName: this.userdata.name,
      address: this.userdata.address,
      totalAmount: this.cartService.getCartTotal(),
      items: this.cartService.getCartItems().map(item => ({
        productName: item.prName,
        price: item.prPrice,  // Ensure 'prPrice' is passed if it's the correct price field
        quantity: item.quantity
      }))
    };

    console.log('Order Data:', orderData);  // For debugging purposes

    // Place the order by calling the backend API
    this.cartService.placeOrder(orderData).subscribe({
      next: (response) => {
        alert('Order placed successfully!');
        this.cartService.clearCart();

        this.isPlaceOrderVisible = false;
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('There was an issue placing your order. Please try again later.');
      }
    });
  }


}
