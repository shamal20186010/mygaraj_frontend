import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: any, quantity: number) {
    const currentCart = this.cartItems.getValue();
    const existingItem = currentCart.find(item => item.prId === product.prId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ ...product, quantity });
    }

    this.cartItems.next(currentCart);
  }

  getCartTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => total + item.prPrice * item.quantity, 0);
  }

  clearCart() {
    this.cartItems.next([]);  // Reset the cart items to an empty array
  }

  checkout(checkoutData: any) {
    console.log("Processing checkout with data:", {
      items: this.cartItems.getValue(),
      customerDetails: checkoutData
    });
    this.clearCart(); // Clear the cart after checkout
  }
}
