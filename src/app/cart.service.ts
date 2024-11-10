import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from './models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private placeOrderUrl = 'http://localhost:8080/orders';
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) {}

  // Method to add items to the cart
  addToCart(product: CartItem, quantity: number) {
    const currentCart = this.cartItems.getValue();
    const existingItem = currentCart.find(item => item.prId === product.prId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // Ensure you include prPrice in the added item
      currentCart.push({ ...product, quantity });
    }

    this.cartItems.next(currentCart);
  }

  // Method to retrieve all cart items
  getCartItems(): CartItem[] {
    return this.cartItems.getValue();
  }

  // Method to calculate the total of the cart
  getCartTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.prPrice * item.quantity, 0);
  }

  // Method to clear the cart
  clearCart() {
    this.cartItems.next([]);
  }
  

  // Method to place the order (send to backend)
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.placeOrderUrl, orderData);
  }
}
