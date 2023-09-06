import { Component, OnInit } from '@angular/core';
import ClientList from '../../../../../json/ClientData/clientData.json';

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
}
