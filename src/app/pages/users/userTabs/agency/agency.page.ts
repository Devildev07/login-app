import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { Firestore, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.page.html',
  styleUrls: ['./agency.page.scss'],
})
export class AgencyPage implements OnInit {
  getAgencyData: any;

  constructor(
    private firestore: Firestore,
    private modalCntrl: ModalController,
    public getDatas: GetDataService
  ) {
    this.getDatas.myEventEmitter.subscribe((data) => {
      this.getAgencyData.push(data);
      console.log('Received event with data:', data);
    });
  }

  ngOnInit() {
    this.getAgency();
  }

  // get-query
  async getAgency() {
    this.getAgencyData = await this.getDatas.getFromFirebase('agency');
    console.log('getAgencyData === ', this.getAgencyData);
  }

  // update-query
  updateAgency(data: any) {
    console.log('id === ', data);
    const docInstance = doc(this.firestore, 'agency', data.id);

    const updateData = {
      uname: data.uname,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      region: data.region,
      type: data.type,
    };
    let updatedIndex = -1;
    this.getAgencyData.forEach((element: any, index: any) => {
      if (element.id == data.id) {
        updatedIndex = index;
      }
    });

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('updated');
        // this.getAgency();
        if (updatedIndex >= 0) {
          this.getAgencyData[updatedIndex] = updateData;
        }
      })
      .catch((err) => {
        console.error(`Error updating document: ${err}`);
      });
  }

  // delete-query
  deleteAgency(id: string) {
    const docInstance = doc(this.firestore, 'agency', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('deleted');
        this.getAgency();
      })
      .catch((err) => {
        console.log('not deleted', err);
      });
  }

  // openModel
  openModel(agencyData: any) {
    this.getDatas
      .openModel(agencyData)
      .then((res) => {
        console.log('res === ', res);
        this.updateAgency(res);
      })
      .catch((e) => {
        console.log('error---', e);
      });
  }
}
