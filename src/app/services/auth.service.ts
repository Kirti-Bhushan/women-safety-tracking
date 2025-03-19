import { Injectable } from '@angular/core';
import { getAuth,Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { getFirestore, doc, setDoc } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth : Auth;
  private db :Firestore;

  constructor() {
    const app = initializeApp(environment.firebaseConfig); // ✅ Initialize Firebase first
    this.auth = getAuth(app); // ✅ Use the app instance
    this.db = getFirestore(app);
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  
  async signUp(email: string, password: string, userData: any): Promise<void> {
    try {
      console.log('Starting Firebase Registration');
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(this.db, 'users', user.uid), {
        uid: user.uid,
        name: userData.name,
        email: userData.email,
        age: userData.age || '',
        address: userData.address || '',
        emergencyContact1: userData.emergencyContact1 || '',
        emergencyContact2: userData.emergencyContact2 || '',
        emergencyCall: userData.emergencyCall || '',
      });
      
    } catch (error) {
      throw error;
    }
  }
}
