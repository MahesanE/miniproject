import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { CartService } from '../services/cart-service.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  sessionDetails: any = null;
  userName: string = '';
  email: string = '';
  phoneNumber: string = '';
  address: string = '';
  postalCode: string = '';
  unitNumber: string = '';
  comments: string = '';
  itemsPurchased: any[] = [];
  deliveryNumber: string = '';


  constructor(private route: ActivatedRoute, private http: HttpClient, private firebaseService: FirebaseService,
    private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (this.sessionId) {
      this.http.get(`${environment.apiUrl}/stripe/checkout-session?sessionId=${this.sessionId}`)
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
          this.email = firebaseUser.email || '';
          this.phoneNumber = userData.phoneNumber || '';
          this.address = userData.address || '';
          this.postalCode = userData.postalCode || '';
          this.unitNumber = userData.unitNumber || '';
          this.comments = userData.comments || '';

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
      },
      selectedQuantity: item.selectedQuantity
    }));

    const deliveryDetails = {
      userName: this.userName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      postalCode: this.postalCode,
      unitNumber: this.unitNumber,
      comments: this.comments,
      deliveryNumber: this.deliveryNumber,
      itemsPurchased: itemsPurchased
    };

    this.http.post(`${environment.apiUrl}/deliverydetails`, deliveryDetails)
      .subscribe(response => {
        console.log('Delivery details saved successfully', response);
        console.log('Before clearing local storage...');
        this.cartService.clearCart();
        localStorage.removeItem('cartItems');
        console.log('After clearing local storage....');
        this.sendEmailConfirmation(deliveryDetails);
      }, error => {
        console.error('Error saving delivery details', error);
      });
  }
  sendEmailConfirmation(deliveryDetails: any): void {
    // Send the email confirmation
    this.http.post(`${environment.apiUrl}/email/send`, deliveryDetails)
      .subscribe(response => {
        console.log('Email sent successfully', response);
      }, error => {
        console.error('Error sending email', error);
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
