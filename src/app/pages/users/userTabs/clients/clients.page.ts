import { Component, OnInit,ViewChild } from '@angular/core';
import ClientList from '../../../../../json/ClientData/clientData.json';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  public clientList: any;
  public results: any;
  constructor() {}

  ngOnInit() {
    this.clientList = ClientList.data;
    this.results = this.clientList;
    console.log('clientList === ', this.clientList);
  }

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
// model-1
  // async canDismiss(data?: any, role?: string) {
  //   return role !== 'gesture';
  // }

  // model-2
  @ViewChild(IonModal)
  modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | undefined;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
