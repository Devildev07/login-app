import { Component, OnInit } from '@angular/core';
import UserList from '../../../json/allcategoryList.json';
import ClientList from '../../../json/ClientData/clientData.json';
import { CommonServiceService } from 'src/app/common-service.service';

import { GetDataService } from 'src/app/otherServices/get-data.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  public userList: any;
  public results: any;

  public clientList: any = [];
  public getAdminData: any = [];
  public getAdvertiserData: any = [];
  public getAgencyData: any = [];
  public getClientData: any = [];
  public getManagerData: any = [];
  // public Results: any;
  constructor(
    public common: CommonServiceService, public getDatas: GetDataService
  ) { }

  ngOnInit() {
    this.getAdmin();
    this.getAdvertiser();
    this.getAgency();
    this.getClient();
    this.getManager();
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


  async getAdmin() {
    this.getAdminData = await this.getDatas.getFromFirebase('admins');
    console.log('getAdminData === ', this.getAdminData);
  }
  async getAdvertiser() {
    this.getAdvertiserData = await this.getDatas.getFromFirebase('advertiser');
    console.log('getAdvertiserData === ', this.getAdvertiserData);
  }
  async getAgency() {
    this.getAgencyData = await this.getDatas.getFromFirebase('agency');
    console.log('getAgencyData === ', this.getAgencyData);
  }
  async getClient() {
    this.getClientData = await this.getDatas.getFromFirebase('clients');
    console.log('getClientData === ', this.getClientData);

  }
  async getManager() {
    this.getManagerData = await this.getDatas.getFromFirebase('manager');
    console.log('getManagerData === ', this.getManagerData);
  }
}
