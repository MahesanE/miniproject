import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VapeService } from '../services/vape.service';
import { Vape } from '../models';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { AgeverifyComponent } from './ageverify.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-view0',
  templateUrl: './view0.component.html',
  styleUrls: ['./view0.component.css']
})
export class View0Component implements OnInit {
  vapes: Vape[] = [];
  searchForm: FormGroup;
  user: User | null = null;

  flavors = [
    { name: 'mango', image: '/assets/mangovape.png' },
    { name: 'grape', image: '/assets/grapevape1.png' },
    {name : 'banana', image: '/assets/bananavape.png'}
    // ... add more flavors
  ];

  constructor(private vapeService: VapeService, private router : Router, private firebaseService : FirebaseService,
    private matDialog: MatDialog) {
    this.searchForm = new FormGroup({
      searchString: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('ageVerified') === 'true') {
      // Age has been verified, continue with the normal flow
      this.initializeComponent();
    } else {
      // Open age verification modal
      const dialogRef = this.matDialog.open(AgeverifyComponent,{
        disableClose : true
      });
      dialogRef.componentInstance.ageVerified.subscribe((isVerified: boolean) => {
        if (isVerified) {
          dialogRef.close();
          this.initializeComponent();
        } else {
          window.location.href = 'https://www.moh.gov.sg/news-highlights/details/minimum-legal-age-for-tobacco-raised-to-21-years-old-from-1-january-2021';
        }
      });
    }
  }
  
  initializeComponent() {
    this.getVapes();
  
    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser) => {
      this.user = firebaseUser;
      if (firebaseUser) {
        const userData = await this.firebaseService.getUserData(firebaseUser.uid);
        if (!userData) {
          this.router.navigate(['/profile']);
        }
      }
    });
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

  searchFlavor(flavor: string) {
    this.searchForm.get('searchString')?.setValue(flavor);
    this.search();
  }

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

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('User signed out');
      this.user = null; 
    });
  }

  editProfile() {
    this.router.navigate(['/profile']); // Navigate to the profile editing page
  }
}
//'https://www.moh.gov.sg/news-highlights/details/minimum-legal-age-for-tobacco-raised-to-21-years-old-from-1-january-2021'