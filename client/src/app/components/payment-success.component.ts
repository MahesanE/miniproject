import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { CartService } from '../services/cart-service.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  sessionDetails: any = null;
  userName: string = '';
  phoneNumber: string = '';
  address: string = '';
  itemsPurchased: any[] = []; // Assuming this will be an array
  deliveryNumber: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private firebaseService: FirebaseService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (this.sessionId) {
      // Call your API to retrieve session details
      this.http.get(`http://localhost:8080/api/stripe/checkout-session?sessionId=${this.sessionId}`)
        .subscribe(details => {
          this.sessionDetails = details;
        });
    }

    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData = await this.firebaseService.getUserData(firebaseUser.uid);
        if (userData) {
          this.userName = firebaseUser.displayName || 'Anonymous';
          this.phoneNumber = userData.phoneNumber || '';
          this.address = userData.address || '';
        }
      }
    });

    // Generate a random delivery number
    this.deliveryNumber = this.generateDeliveryNumber();
     // Get items from the cart
     this.itemsPurchased = this.cartService.getCart();

     // Now that payment was successful, you can clear the cart.
     this.cartService.clearCart();
  }

  generateDeliveryNumber(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

}
