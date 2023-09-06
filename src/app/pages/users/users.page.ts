import { Component, OnInit } from '@angular/core';
import UserList from '../../../json/allcategoryList.json';
import ClientList from '../../../json/ClientData/clientData.json';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  public userList: any;
  public results: any;

  public clientList: any;
  // public Results: any;
  constructor(
    public common: CommonServiceService
  ) {}

  ngOnInit() {
    this.userList = UserList.data;
    this.results = this.userList;
    console.log('userList === ', this.userList);

    this.clientList = ClientList.data;
    // this.Results = this.clientList;
    console.log('clientList === ', this.clientList);
  }

 public admin = this.common.getItem('userData');


  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    let foundObjects: any = [];
    for (const user of this.userList) {
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
