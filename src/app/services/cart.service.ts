import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private placeOrderUrl = 'http://localhost:8080/orders';
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) { }

  addToCart(product: CartItem, quantity: number) {
    const currentCart = this.cartItems.getValue();
    const existingItem = currentCart.find(item => item.prId === product.prId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ ...product, quantity });
    }
    this.cartItems.next(currentCart);
  }

  getCartItems(): CartItem[] {
    return this.cartItems.getValue();
  }

  getCartTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.prPrice * item.quantity, 0);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.placeOrderUrl, orderData);
  }

  updateProductQuantities(): Observable<any> {
    const updateRequests = this.getCartItems().map(item => ({
      productId: item.prId,
      quantity: item.quantity,
    }));

    return this.http.put('http://localhost:8080/product/updateQuantity', updateRequests, {
      responseType: 'json',
    });
  }

}