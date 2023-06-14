import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  @ViewChild('addressInput') addressInputRef!: ElementRef
  //@ViewChild('map') mapElement!: ElementRef

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.profileForm = new FormGroup({
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{8}$')
      ]),
      address: new FormControl('', Validators.required),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{6}$') 
      ]),
      unitNumber: new FormControl(''), 
      comments: new FormControl('')
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
          phoneNumber: userData ? userData['phoneNumber'] : '',
          address: userData ? userData['address'] : '',
          postalCode: userData ? userData['postalCode'] : '',
          unitNumber: userData ? userData['unitNumber'] : '',
          comments: userData ? userData['comments'] : ''
        };
  
        // Fill in the form with existing user data
        this.profileForm.patchValue({
          phoneNumber: this.user['phoneNumber'],
          address: this.user['address'],
          postalCode: this.user['postalCode'],
          unitNumber: this.user['unitNumber'],
          comments: this.user['comments']
        });
  
        setTimeout(() => {
          this.initializeAutocomplete();
        }, 1000);
      }
    });
  }
  
  // initializeMap() {
  //   const mapProperties = {
  //     center: new google.maps.LatLng(1.3521, 103.8198), // Coordinates for Singapore
  //     zoom: 10,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
    
  //   const map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  // }
  

  initializeAutocomplete() {
    const options: google.maps.places.AutocompleteOptions = {
      componentRestrictions: { country: 'sg' },
      fields: ['formatted_address']
    };

    // Initialize Google Places Autocomplete
    const autocomplete = new google.maps.places.Autocomplete(this.addressInputRef.nativeElement, options);

    // Listen to the 'place_changed' event
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          this.profileForm.controls['address'].setValue(place.formatted_address);
        }
      });
    });
  }



  saveProfile(): void {
    const phoneNumberControl = this.profileForm.get('phoneNumber');
    const addressControl = this.profileForm.get('address');
    const postalCodeControl = this.profileForm.get('postalCode');
    const unitNumberControl = this.profileForm.get('unitNumber');
    const commentsControl = this.profileForm.get('comments');

    if (phoneNumberControl && addressControl && postalCodeControl && unitNumberControl && commentsControl) {
      this.user.phoneNumber = phoneNumberControl.value || '';
      this.user.address = addressControl.value || '';
      this.user.postalCode = postalCodeControl.value || '';
      this.user.unitNumber = unitNumberControl.value || '';
      this.user.comments = commentsControl.value || '';

      this.firebaseService.saveUserData(this.user).then(() => {
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.log('Failed to save user data:', error);
      });
    }
  }

}
