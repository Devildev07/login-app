import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { Firestore, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.page.html',
  styleUrls: ['./advertiser.page.scss'],
})
export class AdvertiserPage implements OnInit {
  getAdvertiserData: any;

  constructor(
    private firestore: Firestore,
    private modalCntrl: ModalController,
    public getDatas: GetDataService,
    public CommonService: CommonServiceService
  ) {
    this.CommonService.searchText = ""
    this.getDatas.myEventEmitter.subscribe((data) => {
      this.getAdvertiserData.push(data);
      console.log('Received event with data:', data);
    });
  }

  ngOnInit() {
    this.getAdvertiser();
    this.CommonService.searchText = ""

  }

  // get-query
  async getAdvertiser() {
    this.getAdvertiserData = await this.getDatas.getFromFirebase('advertiser');
    console.log('getAdvertiserData === ', this.getAdvertiserData);
  }

  // update-query
  updateAdvertiser(data: any) {
    console.log('id === ', data);
    const docInstance = doc(this.firestore, 'advertiser', data.id);

    const updateData = {
      uname: data.uname,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      campaign_count: data.campaign_count,
      region: data.region,
      type: data.type,
    };
    let updatedIndex = -1;
    this.getAdvertiserData.forEach((element: any, index: any) => {
      if (element.id == data.id) {
        updatedIndex = index;
      }
    });

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('updated');
        // this.getAdmin();
        if (updatedIndex >= 0) {
          this.getAdvertiserData[updatedIndex] = updateData;
        }
      })
      .catch((err) => {
        console.error(`Error updating document: ${err}`);
      });
  }

  // delete-query
  deleteAdvertiser(id: string) {
    const docInstance = doc(this.firestore, 'advertiser', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('deleted');
        this.getAdvertiser();
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
        this.updateAdvertiser(res);
      })
      .catch((e) => {
        console.log('error---', e);
      });
  }
}
