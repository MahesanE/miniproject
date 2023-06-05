import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { User } from '../models';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore;

  constructor() { 
    const app = initializeApp(environment.firebaseConfig);
    this.firestore = getFirestore(app);
  }

  // Save user data to Firestore
  async saveUserData(user: User): Promise<void> {
    await setDoc(doc(this.firestore, 'users', user.uid), user);
  }

  // Get user data from Firestore
  async getUserData(uid: string): Promise<User | undefined> {
    const docSnap = await getDoc(doc(this.firestore, 'users', uid));
    if (docSnap.exists()) {
      return docSnap.data() as User;
    } else {
      console.log("No such document!");
      return undefined;
    }
  }
}
