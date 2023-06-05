import { Component, OnInit } from '@angular/core';
import { Vape } from '../models';
import { CartService } from '../services/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Vape[] = [];

  constructor(private cartService: CartService, private router : Router) { }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(
      cart => {
        this.cart = cart;
      }
    );
  }  goBack(){
    this.router.navigate(['/home']);
  }

  removeFromCart(vape: Vape): void {
    this.cartService.removeFromCart(vape);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
