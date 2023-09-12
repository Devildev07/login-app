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
import { AdminServiceService } from 'src/app/otherServices/admin-service.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  getClientData: any;


  public clientList: any;
  public results: any;

  constructor(private firestore: Firestore, public adminService: AdminServiceService) { }

  ngOnInit() {
    this.getClient();

    this.clientList = ClientList.data;
    this.results = this.clientList;
    console.log('clientList === ', this.clientList);
  }


  // get-query
  async getClient() {
    this.getClientData = await this.adminService.getFromFirebase('clients');
  }

  // update-query
  updateClient(id: string) {
    const docInstance = doc(this.firestore, 'clients', id);
    const updateData = {
      uname: 'updateName',
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
  deleteClient(id: string) {
    const docInstance = doc(this.firestore, 'clients', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('deleted');
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
    console.log(clientData);

  }


  // model start
  // @ViewChild(IonModal)
  // modal!: IonModal;

  // message =
  //   'This modal example uses triggers to automatically open a modal when the button is clicked.';
  // name: string | undefined;

  // cancel() {
  //   this.modal.dismiss(null, 'cancel');
  // }

  // confirm() {
  //   this.modal.dismiss(this.name, 'confirm');
  // }

  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   if (ev.detail.role === 'confirm') {
  //     this.message = `Hello, ${ev.detail.data}!`;
  //   }
  // }

  // model end


}
