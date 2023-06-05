import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VapeService } from '../services/vape.service';
import { Vape } from '../models';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';

@Component({
  selector: 'app-view0',
  templateUrl: './view0.component.html',
  styleUrls: ['./view0.component.css']
})
export class View0Component implements OnInit {
  vapes: Vape[] = [];
  searchForm: FormGroup;
  user: User | null = null;

  constructor(private vapeService: VapeService, private router : Router, private firebaseService : FirebaseService) {
    this.searchForm = new FormGroup({
      searchString: new FormControl('')
    });

    // Listen to auth state changes
    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        this.user = firebaseUser;
        const userData = await this.firebaseService.getUserData(this.user.uid);
        if (!userData) {
          this.router.navigate(['/profile']); // Redirect to profile page if user data doesn't exist
        }
      } else {
        this.user = null;
      }
    });
  }

  ngOnInit(): void {
    this.getVapes();
  }

  getVapes(): void {
    this.vapeService.getVapes().subscribe(vapes => this.vapes = vapes);
  }

  search(): void {
    const flavor = this.searchForm.get('searchString')?.value;
    if (flavor) {
      this.router.navigate(['/search', flavor]);
    }
  }

  // Google Login Function
  loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          console.log('User signed in with Google:', result.user);
        } else {
          console.log('No user signed in');
        }
      })
      .catch((error) => {
        console.log('Failed to sign in with Google:', error);
      });
  }
  
  // Logout Function
  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('User signed out');
      this.user = null; // update the user state
    });
  }
}
