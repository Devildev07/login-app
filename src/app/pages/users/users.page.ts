import { Component, OnInit } from '@angular/core';
// import UserList from '../../../json/ClientData/clientData.json';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public userList: any = [
    {
      "id": "78",
      "itemName": "AGRI-CORPORATE",
      "Description": "",
      "Parent_ID": "77",
      "Parent_Category_Name": null,
      "sort_index": null,
      "haveChild": false,
      "videoCount": "0",
      "playListCount": "3",
      "locationCount": "0"
    },
    {
      "id": "79",
      "itemName": "PESTICIDES",
      "Description": "",
      "Parent_ID": "77",
      "Parent_Category_Name": null,
      "sort_index": null,
      "haveChild": false,
      "videoCount": "0",
      "playListCount": "3",
      "locationCount": "0"
    },
    {
      "id": "64",
      "itemName": "1. Speciality",
      "Description": "",
      "Parent_ID": "0",
      "Parent_Category_Name": null,
      "sort_index": "1. Speciality_",
      "haveChild": true,
      "videoCount": "5",
      "playListCount": "7",
      "locationCount": "4"
    },
    {
      "id": "69",
      "itemName": "Cardiologist",
      "Description": "",
      "Parent_ID": "64",
      "Parent_Category_Name": "1. Speciality",
      "sort_index": "1. Speciality_Cardiologist",
      "haveChild": false,
      "videoCount": "4",
      "playListCount": "21",
      "locationCount": "6"
    },
    {
      "id": "618",
      "itemName": "Dental",
      "Description": "dental",
      "Parent_ID": "64",
      "Parent_Category_Name": "1. Speciality",
      "sort_index": "1. Speciality_Dental",
      "haveChild": false,
      "videoCount": "1",
      "playListCount": "7",
      "locationCount": "0"
    },
    {
      "id": "617",
      "itemName": "Diagnostics",
      "Description": "Diagnostics",
      "Parent_ID": "64",
      "Parent_Category_Name": "1. Speciality",
      "sort_index": "1. Speciality_Diagnostics",
      "haveChild": false,
      "videoCount": "0",
      "playListCount": "4",
      "locationCount": "0"
    },
    {
      "id": "3",
      "itemName": "General Physician",
      "Description": "",
      "Parent_ID": "64",
      "Parent_Category_Name": "1. Speciality",
      "sort_index": "1. Speciality_General Physician",
      "haveChild": false,
      "videoCount": "5",
      "playListCount": "66",
      "locationCount": "44"
    },
    {
      "id": "4",
      "itemName": "Gynaecologist",
      "Description": "",
      "Parent_ID": "64",
      "Parent_Category_Name": "1. Speciality",
      "sort_index": "1. Speciality_Gynaecologist",
      "haveChild": false,
      "videoCount": "33",
      "playListCount": "138",
      "locationCount": "129"
    }
  ];

  // public userList = UserList
  public results = [...this.userList];

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
