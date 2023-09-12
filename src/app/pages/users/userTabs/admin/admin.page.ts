import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { Firestore, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  getAdminData: any;

  constructor(
    private firestore: Firestore,
    private modalCntrl: ModalController,
    public getDatas: GetDataService
  ) {
    this.getDatas.myEventEmitter.subscribe((data) => {
      this.getAdminData.push(data);
      console.log('Received event with data:', data);
    });
  }

  ngOnInit() {
    this.getAdmin();
  }

  // get-query
  async getAdmin() {
    this.getAdminData = await this.getDatas.getFromFirebase('admins');
    console.log('getAdminData === ', this.getAdminData);
  }

  // update-query
  updateAdmin(data: any) {
    console.log('id === ', data);
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
        this.getAdmin();
      })
      .catch((err) => {
        console.log('not deleted', err);
      });
  }

  // openModel
  openModel(adminData: any) {
    this.getDatas
      .openModel(adminData)
      .then((res) => {
        console.log('res === ', res);
        this.updateAdmin(res);
      })
      .catch((e) => {
        console.log('error---', e);
      });
  }
}
