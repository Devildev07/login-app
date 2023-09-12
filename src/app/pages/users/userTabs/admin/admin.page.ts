import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/otherServices/get-data.service';
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
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  // getAdminData$!: Observable<any[] | DocumentData[]>;
  getAdminData: any;

  constructor(
    private firestore: Firestore,
    private modalCntrl: ModalController,
    public getDatas: GetDataService
  ) {
    this.getDatas.myEventEmitter.subscribe(
      (data) => {
        this.getAdminData.push(data)
        console.log('Received event with data:', data);
      });
  }

  ngOnInit() {
    this.getAdmin();
  }

  // get-query
  async getAdmin() {
    this.getAdminData = await this.getDatas.getFromFirebase('admins');
    console.log("getAdminData === ", this.getAdminData);
  }

  // update-query
  updateAdmin(data: any) {
    console.log("id === ", data);
    const docInstance = doc(this.firestore, 'admins', data.id);

    const updateData = {
      uname: data.uname,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      region: data.region,
    };
    let updatedIndex = -1;
    this.getAdminData.forEach((element: any, index: any) => {
      if (element.id == data.id) {
        updatedIndex = index;
      }
    });

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('updated');
        // this.getAdmin();
        if (updatedIndex >= 0) {
          this.getAdminData[updatedIndex] = updateData;
        }
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
    this.getDatas.openModel(adminData).then((res) => {
      console.log("res === ", res);
      this.updateAdmin(res);
    }).catch((e) => {
      console.log("error---", e)
    })
    // this.modalCntrl
    //   .create({
    //     component: ModalPage,
    //     componentProps: adminData,
    //   })
    //   .then((modalRes) => {
    //     modalRes.present();

    //     modalRes.onDidDismiss().then((res) => {
    //       console.log('dismissed', res);

    //       if (res.data != null) {
    //         this.updateAdmin(res.data);
    //         console.log('updateAdmin', this.updateAdmin);
    //       }
    //     });
    //   });
  }
}
