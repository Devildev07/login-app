import { Component, OnInit } from '@angular/core';
import UserList from '../../../json/allcategoryList.json';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  public userList: any;
  public results: any;
  constructor() {

  }

  ngOnInit() {
    this.userList = UserList.data;
    this.results = this.userList;
    console.log("userList === ", this.userList);
  }


  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    let foundObjects: any = [];
    for (const user of this.userList) {
      console.log("user === ", user);
      for (const key of Object.keys(user)) {
        console.log("key === ", key);
        console.log("user[key] === ", user[key]);
        if (user[key] != null && user[key].toString().toLowerCase().includes(query)) {
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
