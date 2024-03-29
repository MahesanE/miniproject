import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Vape } from '../models';
import { CartService } from '../services/cart-service.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { User } from '../models';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

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
  private apiUrl = environment.apiUrl;
  private stripeApiKey = environment.stripeApiKey;

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

    loadStripe(this.stripeApiKey).then((stripe) => {
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
    const lineItems = this.cart.map(item => {
      return {
        price_data: {
          currency: 'sgd',
          product_data: {
            name: item.flavor,
          },
          unit_amount: Number(item.price) * 100,
        },
        quantity: Number(item.selectedQuantity),
      };
    });

    localStorage.setItem('cartItems', JSON.stringify(this.cart));

    const body = { line_items: lineItems };

    this.http.post(`${this.apiUrl}/stripe/create-checkout-session`, body)
      .subscribe((session: any) => {
        this.stripe.redirectToCheckout({
          sessionId: session.id,
        }).then((result: { error: { message: string; }; }) => {
          if (result.error) {
            alert(result.error.message);
          }
        });
      });
  }

  editDeliveryDetails(): void {
    this.router.navigate(['/profile']);
  }
}
