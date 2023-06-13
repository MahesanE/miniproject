import { Injectable } from '@angular/core';
import { Vape } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Vape[]>([]);
  currentCart = this.cart.asObservable();

  constructor() { }
  
  addToCart(vape: Vape): void {
    const tempCart = this.cart.getValue();
  
    // Check if the item is already in the cart
    const existingItem = tempCart.find(item => item.type === vape.type && item.flavor === vape.flavor);
  
    if (existingItem) {
      // If the item already exists, update its selected quantity
      existingItem.selectedQuantity = (Number(existingItem.selectedQuantity) || 0) + (Number(vape.selectedQuantity) || 0);
    } else {
      // Otherwise, add the new item to the cart
      tempCart.push(vape);
    }
  
    this.cart.next(tempCart);
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
  }

  clearCart() {
    this.cart.next([]);
  }
 
}
