import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Vape } from '../models';
import { CartService } from '../services/cart-service.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { User } from '../models';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Vape[] = [];
  user: User | null = null;
  totalCost: number = 0;
  stripe: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private firebaseService: FirebaseService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(
      cart => {
        this.cart = cart;
        this.calculateTotalCost();
      }
    );

    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        this.firebaseService.getUserData(firebaseUser.uid).then(user => {
          if (user) {
            this.user = user;
          }
        });
      }
    });

    loadStripe('pk_test_51NGDu9LU50nLoMrUpxEfzq0Lpb82kvvg82kdWMOqxrwY52GhEb3SppgJcTohGi1heMRkXOIK6vY3stfedeeiIA7900JfrqZiyi').then((stripe) => { // Replace with your Stripe Publishable Key
      this.stripe = stripe;
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  removeFromCart(vape: Vape): void {
    this.cartService.removeFromCart(vape);
    this.calculateTotalCost();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  calculateTotalCost(): void {
    this.totalCost = this.cart.reduce((acc, item) => acc + (item.price * (item.selectedQuantity || 0)), 0);
  }
  

  confirmOrder(): void {
    // Here you need to define your line items.
    // You should use the data from the cart.
    const lineItems = this.cart.map(item => {
      console.log("item.price:", item.price);
      console.log("item.quantity:", item.quantity);
    
      return {
        price_data: {
          currency: 'sgd',
          product_data: {
            name: item.flavor,
          },
          unit_amount: Number(item.price) * 100, // Stripe expects amount in cents
        },
        quantity: Number(item.quantity),
      };
    });
    
    
    
    

    const body = { line_items: lineItems };

    // Make the HTTP request
    console.log("body: ", body); // log the data you're sending
    this.http.post('http://localhost:8080/api/stripe/create-checkout-session', body)
  .subscribe((session: any) => {
    console.log("session: ", session); // log the response
        this.stripe.redirectToCheckout({
          sessionId: session.id,
        }).then((result: { error: { message: string; }; }) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          if (result.error) {
            alert(result.error.message);
          }
        });
      });
  }


}
