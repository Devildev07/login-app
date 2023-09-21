import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  DocumentData,
  collectionGroup,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { AuthService } from 'src/app/auth.service';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.page.html',
  styleUrls: ['./add-admin.page.scss'],
})
export class AddAdminPage implements OnInit {
  getAdminData$!: Observable<any[] | DocumentData[]>;
  adminData: any[] = [];

  constructor(private firestore: Firestore, public getData: GetDataService, public authService: AuthService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() { }

  async addAdmin(adminForm: any) {
    console.log('Add Admin', adminForm.value);
    var email = adminForm.value.email;
    var pass = adminForm.value.password;
    const collectionInstance = collection(this.firestore, 'admins');
    addDoc(collectionInstance, adminForm.value)
      .then(async () => {
        console.log("pass === ", pass);
        console.log("email === ", email);
        const user = await this.authService
          .registerUser(email, pass)
          .catch((error) => {
            console.log(error);
            // loading.dismiss();
          });
        if (user) {
          // loading.dismiss();
          // this.router.navigate(['/login']);
          console.log('user==', user);

        } else {
          console.log('provide correct value');
        }


        alert('Data Sent Secessfully');
        this.getData.myEventEmitter.emit(adminForm.value);
      })
      .catch((error) => {
        alert(error);
      });
  }
}
