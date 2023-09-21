import { Component, OnInit } from '@angular/core';
// import UserList from '../../../json/allcategoryList.json';
// import ClientList from '../../../json/ClientData/clientData.json';
import { CommonServiceService } from 'src/app/common-service.service';

import { GetDataService } from 'src/app/otherServices/get-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  public allUsersData: any;
  public results: any;


  public getAdminData: any = [];
  public getAdvertiserData: any = [];
  public getAgencyData: any = [];
  public getClientData: any = [];
  public getManagerData: any = [];

  public totalDataLength: number = 0;
  public allData: any[] = [];

  constructor(
    public common: CommonServiceService,
    public getDatas: GetDataService
  ) { }

  ngOnInit() {
    Promise.all([
      this.getAdmin(),
      this.getAdvertiser(),
      this.getAgency(),
      this.getClient(),
      this.getManager(),
    ]).then(() => {
      this.calculateTotalDataLength();
      // this.allData = [
      //   ...this.getAdminData,
      //   ...this.getAdvertiserData,
      //   ...this.getAgencyData,
      //   ...this.getClientData,
      //   ...this.getManagerData,
      // ];
      // console.log('allData', this.allData);

      // this.allUsersData = this.allData;
      // this.results = this.allUsersData;
      // console.log('allUsersData === ', this.allUsersData);
    });

    // this.allUsersData = this.allData;
    // this.results = this.allUsersData;
    // console.log('allUsersData === ', this.allUsersData);


  }

  calculateTotalDataLength() {
    this.totalDataLength =
      this.getAdminData.length +
      this.getAdvertiserData.length +
      this.getAgencyData.length +
      this.getClientData.length +
      this.getManagerData.length;
    console.log('totalLenghth', this.totalDataLength);
  }

  async getAdmin() {
    this.getAdminData = await this.getDatas.getFromFirebase('admins');
    console.log('getAdminData === ', this.getAdminData);
    return this.getAdminData;
  }
  async getAdvertiser() {
    this.getAdvertiserData = await this.getDatas.getFromFirebase('advertiser');
    console.log('getAdvertiserData === ', this.getAdvertiserData);
    return this.getAdvertiserData;
  }
  async getAgency() {
    this.getAgencyData = await this.getDatas.getFromFirebase('agency');
    console.log('getAgencyData === ', this.getAgencyData);
    return this.getAgencyData;
  }
  async getClient() {
    this.getClientData = await this.getDatas.getFromFirebase('clients');
    console.log('getClientData === ', this.getClientData);
    return this.getClientData;
  }
  async getManager() {
    this.getManagerData = await this.getDatas.getFromFirebase('manager');
    console.log('getManagerData === ', this.getManagerData);
    return this.getManagerData;
  }

  // public admin = this.common.getItem('userData');

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.common.searchText = query;
    // let foundObjects: any = [];
    // for (const user of this.allUsersData) {
    //   console.log('user === ', user);
    //   for (const key of Object.keys(user)) {
    //     console.log('key === ', key);
    //     console.log('user[key] === ', user[key]);
    //     if (
    //       user[key] != null &&
    //       user[key].toString().toLowerCase().includes(query)
    //     ) {
    //       foundObjects.push(user);
    //       break;
    //     }
    //   }
    // }
    // this.results = foundObjects;
  }
  onClear() {
    this.results = [];
  }
}
