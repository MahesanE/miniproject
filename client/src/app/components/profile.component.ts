import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user!: User;

  constructor(
    private firebaseService: FirebaseService, 
    private router: Router
  ) {
    this.profileForm = new FormGroup({
      phoneNumber: new FormControl(''),
      address: new FormControl('')
    });
  }

  async ngOnInit(): Promise<void> {
    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData = await this.firebaseService.getUserData(firebaseUser.uid);
        this.user = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || 'Anonymous',
          email: firebaseUser.email || '',
          phoneNumber: userData?.phoneNumber || '',
          address: userData?.address || ''
        };

        // Fill in the form with existing user data
        this.profileForm.setValue({
          phoneNumber: this.user.phoneNumber,
          address: this.user.address
        });
      }
    });
  }
  

  saveProfile(): void {
    const phoneNumberControl = this.profileForm.get('phoneNumber');
    const addressControl = this.profileForm.get('address');
  
    if (phoneNumberControl && addressControl) {
      this.user.phoneNumber = phoneNumberControl.value || '';
      this.user.address = addressControl.value || '';
  
      this.firebaseService.saveUserData(this.user).then(() => {
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.log('Failed to save user data:', error);
      });
    }
  }
  
}
