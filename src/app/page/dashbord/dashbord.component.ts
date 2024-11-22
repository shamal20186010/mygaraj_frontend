import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';


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

  isLogin: boolean = false;

  public productList: any = [];

  cartItems: any[] = [];
  cartTotal: number = 0;

  selectedProduct: any = "";
  selectedQuantity: number = 1;

  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient, private router: Router, private cartService: CartService, private authService: AuthService, private fb: FormBuilder, private productService: ProductService,
    private searchService: SearchService) {
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
      this.isLogin = true;
    }
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    this.searchService.currentSearchQuery.subscribe(query => {
      this.searchQuery = query;
      this.applyFilter(query);
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
      this.isPlaceOrderVisible = true;
    } else {
      this.router.navigate(['']);
      alert("Please login or register...after perchese product..")
    }
  }

  buyNow(product: any, quantity: number) {
    if (this.authService.isLoggedIn()) {
      this.cartService.addToCart(product, quantity);
      this.isPlaceOrderVisible = true;
      this.checkout();
    }
    else {
      this.router.navigate(['']);
      alert("Please login or register...after perchese product..")
    }
  }

  checkout() {
    alert("Proceeding to checkout...");

  }

  clearCart() {
    this.cartService.clearCart();
  }

  Checkout() {
    if (!this.userdata.name || !this.userdata.address) {
      alert('Please provide all necessary details (Name and Address).');
      return;
    }

    const orderData = {
      userId: this.userdata.id,
      customerName: this.userdata.name,
      address: this.userdata.address,
      totalAmount: this.cartService.getCartTotal(),
      items: this.cartService.getCartItems().map(item => ({
        productName: item.prName,
        price: item.prPrice,
        quantity: item.quantity,
      })),
    };

    this.cartService.placeOrder(orderData).subscribe({
      next: () => {
        this.cartService.updateProductQuantities().subscribe({
          next: (response) => {
            console.log('Update Response:', response);
            alert('Order placed successfully and quantities updated!');
            this.cartService.clearCart();
            this.isPlaceOrderVisible = false;
          },
          error: (error) => {
            console.error('Error updating product quantities:', error);
            alert('Order placed, but there was an issue updating product quantities.');
          },
        });
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('There was an issue placing your order. Please try again later.');
      },
    });
  }

  applyFilter(query: string) {
    this.filteredProducts = this.productService.filterProductsByName(this.products, query);
    console.log(this.filteredProducts);

  }
}
