import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLogin: boolean = false
  userEmail: any = '';
  constructor(private ngFireAuth: AngularFireAuth) {
    const item = localStorage.getItem('userData');
    if (item != undefined && item != '') {
      let data = JSON.parse(item);
      if (data.isUserLogin) {
        console.log("data === ", data);
        this.isUserLogin = true;
        this.userEmail = data.user.user.email;
      }
    }
  }
  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  async resetPass(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signOut() {
    return await this.ngFireAuth.signOut();
  }

  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }

  async userLogin() {
    const user = await this.getProfile()
  }
}
