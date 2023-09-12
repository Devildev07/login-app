import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { Firestore, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  getManagerData: any;

  constructor(
    private firestore: Firestore,
    private modalCntrl: ModalController,
    public getDatas: GetDataService
  ) {
    this.getDatas.myEventEmitter.subscribe((data) => {
      this.getManagerData.push(data);
      console.log('Received event with data:', data);
    });
  }

  ngOnInit() {
    this.getManager();
  }

  // get-query
  async getManager() {
    this.getManagerData = await this.getDatas.getFromFirebase('manager');
    console.log('getManagerData === ', this.getManagerData);
  }

  // update-query
  updateManager(data: any) {
    console.log('id === ', data);
    const docInstance = doc(this.firestore, 'manager', data.id);

    const updateData = {
      uname: data.uname,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      region: data.region,
    };
    let updatedIndex = -1;
    this.getManagerData.forEach((element: any, index: any) => {
      if (element.id == data.id) {
        updatedIndex = index;
      }
    });

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('updated');
        // this.getManager();
        if (updatedIndex >= 0) {
          this.getManagerData[updatedIndex] = updateData;
        }
      })
      .catch((err) => {
        console.error(`Error updating document: ${err}`);
      });
  }

  // delete-query
  deleteManager(id: string) {
    const docInstance = doc(this.firestore, 'manager', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('deleted');
        this.getManager();
      })
      .catch((err) => {
        console.log('not deleted', err);
      });
  }

  // openModel
  openModel(managerData: any) {
    this.getDatas
      .openModel(managerData)
      .then((res) => {
        console.log('res === ', res);
        this.updateManager(res);
      })
      .catch((e) => {
        console.log('error---', e);
      });
  }
}
