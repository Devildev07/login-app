import { Component, OnInit } from '@angular/core';
// import { AdminServiceService } from 'src/app/otherServices/admin-service.service';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  collectionData,
  DocumentData,
} from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/pages/modal/modal.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  getAdminData$!: Observable<any[] | DocumentData[]>;

  constructor(
    private firestore: Firestore,
    private modalCntrl: ModalController
  ) {}

  ngOnInit() {
    this.getAdmin();
  }

  // get-query
  getAdmin() {
    const collectionInstance = collection(this.firestore, 'admins');
    this.getAdminData$ = collectionData(collectionInstance, { idField: 'id' });

    this.getAdminData$.subscribe((val) => {
      console.log('val', val);

      // this.adminData = val
      // console.log("adminData",this.adminData )
    });
    this.getAdminData$ = collectionData(collectionInstance, { idField: 'id' });
  }

  // update-query
  updateAdmin(id: string) {
    const docInstance = doc(this.firestore, 'admins', id);
    const updateData = {
      uname: 'updateName',
      email: 'updateEmail',
      mobile: 'updateMobile',
      address: 'updateAddress',
      region: 'updateRegion',
    };

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('updated');
      })
      .catch((err) => {
        console.error(`Error updating document: ${err}`);
      });
  }

  // delete-query
  deleteAdmin(id: string) {
    const docInstance = doc(this.firestore, 'admins', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('deleted');
      })
      .catch((err) => {
        console.log('not deleted', err);
      });
  }

  // openModel
  openModel(adminData: any) {
    this.modalCntrl
      .create({
        component: ModalPage,
        componentProps: adminData,
      })
      .then((modalRes) => {
        modalRes.present();

        modalRes.onDidDismiss().then((res) => {
          console.log('dismissed', res);

          if (res.data != null) {
            this.updateAdmin = res.data;
            console.log('updateAdmin', this.updateAdmin);
          }
        });
      });
  }
}
