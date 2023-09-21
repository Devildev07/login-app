import { Component, OnInit, ViewChild } from '@angular/core';
import ClientList from '../../../../../json/ClientData/clientData.json';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

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
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  getClientData: any;

  public clientList: any;
  public results: any;

  constructor(private firestore: Firestore, public getDatas: GetDataService, public commonService: CommonServiceService) {
    this.commonService.searchText = '';
    this.getDatas.myEventEmitter.subscribe((data) => {
      this.getClientData.push(data);
      console.log('Received event with data:', data);
    });
  }

  ngOnInit() {
    this.getClient();
    this.commonService.searchText = '';
    this.clientList = ClientList.data;
    this.results = this.clientList;
    console.log('clientList === ', this.clientList);
  }

  // get-query
  async getClient() {
    this.getClientData = await this.getDatas.getFromFirebase('clients');
  }

  // update-query
  updateClient(data: any) {
    console.log('id === ', data);
    const docInstance = doc(this.firestore, 'clients', data.id);

    const updateData = {
      uname: data.uname,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      region: data.region,
    };
    let updatedIndex = -1;
    this.getClientData.forEach((element: any, index: any) => {
      if (element.id == data.id) {
        updatedIndex = index;
      }
    });

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('updated');
        if (updatedIndex >= 0) {
          this.getClientData[updatedIndex] = updateData;
        }
      })
      .catch((err) => {
        console.error(`Error updating document: ${err}`);
      });
  }

  // delete-query
  deleteClient(id: string) {
    const docInstance = doc(this.firestore, 'clients', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('deleted');
        this.getClient();
      })
      .catch((err) => {
        console.log('not deleted', err);
      });
  }

  // search action
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    let foundObjects: any = [];
    for (const user of this.clientList) {
      console.log('user === ', user);
      for (const key of Object.keys(user)) {
        console.log('key === ', key);
        console.log('user[key] === ', user[key]);
        if (
          user[key] != null &&
          user[key].toString().toLowerCase().includes(query)
        ) {
          foundObjects.push(user);
          break;
        }
      }
    }
    this.results = foundObjects;
  }

  onClear() {
    this.results = [];
  }

  // model start
  openModel(clientData: any) {
    this.getDatas
      .openModel(clientData)
      .then((res) => {
        console.log('res === ', res);
        this.updateClient(res);
      })
      .catch((e) => {
        console.log('error---', e);
      });

    // console.log(clientData);
  }
}
