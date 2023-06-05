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
    tempCart.push(vape);
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
