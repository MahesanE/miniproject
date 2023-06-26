import { Injectable } from '@angular/core';
import { Vape } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Vape[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  currentCart = this.cart.asObservable();

  constructor() { }

  addToCart(vapeCopy: Vape): void {
    const tempCart = this.cart.getValue();

    // Check if the item is already in the cart
    const existingItem = tempCart.find(item => item.type === vapeCopy.type && item.flavor === vapeCopy.flavor);

    if (existingItem) {
      // If the item is there, update its selected quantity
      existingItem.selectedQuantity = (Number(existingItem.selectedQuantity) || 0) + (Number(vapeCopy.selectedQuantity) || 0);
    } else {
      // else add new item to the cart
      tempCart.push(vapeCopy);
    }

    this.cart.next(tempCart);
    localStorage.setItem('cart', JSON.stringify(tempCart));
  }

  getCart(): Vape[] {
    return this.cart.getValue();
  }

  getCartObservable(): Observable<Vape[]> {
    return this.cart.asObservable();
  }

  removeFromCart(vape: Vape) {
    const tempCart = this.cart.getValue();
    const updatedCart = tempCart.filter(item => item !== vape);
    this.cart.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  clearCart() {
    this.cart.next([]);
    localStorage.removeItem('cart');
  }
}
