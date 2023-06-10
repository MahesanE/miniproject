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
  itemsPurchased: any[] = [];
  deliveryNumber: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private firebaseService: FirebaseService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (this.sessionId) {
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

        this.deliveryNumber = this.generateDeliveryNumber();

        this.itemsPurchased = JSON.parse(localStorage.getItem('cartItems') || '[]');

        this.sendDeliveryDetailsToBackend();
      }
    });
  }

  generateDeliveryNumber(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  sendDeliveryDetailsToBackend(): void {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    const itemsPurchased = cartItems.map((item: any) => ({
        vape: {
            type: item.type,
            flavor: item.flavor,
            quantity: item.quantity,
            price: item.price
        }
    }));

    const deliveryDetails = {
        userName: this.userName,
        phoneNumber: this.phoneNumber,
        address: this.address,
        deliveryNumber: this.deliveryNumber,
        itemsPurchased: itemsPurchased
    };

    this.http.post('http://localhost:8080/api/deliverydetails', deliveryDetails)
        .subscribe(response => {
            console.log('Delivery details saved successfully', response);
            localStorage.removeItem('cartItems');
        }, error => {
            console.error('Error saving delivery details', error);
        });
}



}
