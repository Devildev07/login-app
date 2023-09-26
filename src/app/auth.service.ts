import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLogin: boolean = false;
  userEmail: any = '';
  constructor(private ngFireAuth: AngularFireAuth, private http: HttpClient) {
    const item = localStorage.getItem('userData');
    if (item != undefined && item != '') {
      let data = JSON.parse(item);
      if (data.isUserLogin) {
        console.log('data === ', data);
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
    const user = await this.getProfile();
  }

  // async deleteUser1(uid: string) {
  //   return this.ngFireAuth.currentUser.then((user) => {
  //     if (user) {
  //       return user.getIdToken(/* forceRefresh */ true).then((token) => {
  //         const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=YOUR_API_KEY`;

  //         return this.http
  //           .post(
  //             apiUrl,
  //             { localId: uid },
  //             {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //                 Authorization: 'Bearer ${token}',
  //               },
  //             }
  //           )
  //           .toPromise()
  //           .then(() => {
  //             console.log('User deleted successfully');
  //           })
  //           .catch((error) => {
  //             console.error('Error deleting user:', error);
  //           });
  //       });
  //     }
  //   });
  // }

  deleteUserByEmail(email: string): Promise<void> {
    return this.ngFireAuth
      .fetchSignInMethodsForEmail(email)
      .then((providers) => {
        if (providers && providers.length > 0) {
          const uid = providers[0].split(':')[1]; // Extract UID from provider string
          return this.ngFireAuth.currentUser.then((user:any) => {
            if (user) {
              // console.log("user",user);
              
              return user.getIdToken(/* forceRefresh */ true).then((token:any) => {
                const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBC14SFxRIbUsJdCVEdYWY9SFKp4knwBDk`;

                return this.http
                  .post(
                    apiUrl,
                    { localId: uid },
                    {
                      headers: {  
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,

                      },
                    }
                  )
                  .toPromise()
                  .then(() => {
                    console.log(
                      `User with email ${email} deleted successfully`
                    );
                  })
                  .catch((error) => {
                    console.error('Error deleting user:', error);
                  });
              });
            }
          });
        } else {
          console.log(`No user found with email ${email}`);
          return;
        }
      })
      .catch((error) => {
        console.error('Error getting UID by email:', error);
      });
  }
}
