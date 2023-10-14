import { Component, OnInit } from '@angular/core';
import { IonTabs, SegmentChangeEventDetail } from '@ionic/angular';
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
  public current_tab: string = '';

  constructor(
    public common: CommonServiceService,
    public getDatas: GetDataService
  ) {}

  ngOnInit() {
    Promise.all([
      this.getAdmin(),
      this.getAdvertiser(),
      this.getAgency(),
      this.getClient(),
      this.getManager(),
    ]).then(() => {
      this.calculateTotalDataLength();
    });
  }

  calculateTotalDataLength() {
    this.totalDataLength =
      this.getAdminData.length +
      this.getAdvertiserData.length +
      this.getAgencyData.length +
      this.getClientData.length +
      this.getManagerData.length;
    console.log('totalLength', this.totalDataLength);
  }

  async getAdmin() {
    try {
      this.getAdminData = await this.getDatas.getFromFirebase('admins');
      console.log('getAdminData === ', this.getAdminData);
      return this.getAdminData;
    } catch (error) {
      console.error('Error retrieving admin data:', error);
      return [];
    }
  }

  async getAdvertiser() {
    try {
      this.getAdvertiserData = await this.getDatas.getFromFirebase(
        'advertiser'
      );
      console.log('getAdvertiserData === ', this.getAdvertiserData);
      return this.getAdvertiserData;
    } catch (error) {
      console.error('Error retrieving advertiser data:', error);
      return [];
    }
  }

  async getAgency() {
    try {
      this.getAgencyData = await this.getDatas.getFromFirebase('agency');
      console.log('getAgencyData === ', this.getAgencyData);
      return this.getAgencyData;
    } catch (error) {
      console.error('Error retrieving agency data:', error);
      return [];
    }
  }

  async getClient() {
    try {
      this.getClientData = await this.getDatas.getFromFirebase('clients');
      console.log('getClientData === ', this.getClientData);
      return this.getClientData;
    } catch (error) {
      console.error('Error retrieving client data:', error);
      return [];
    }
  }

  async getManager() {
    try {
      this.getManagerData = await this.getDatas.getFromFirebase('manager');
      console.log('getManagerData === ', this.getManagerData);
      return this.getManagerData;
    } catch (error) {
      console.error('Error retrieving manager data:', error);
      return [];
    }
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.common.searchText = query;
    console.log('searchTextUser::', this.common.searchText);
  }

  onClear() {
    this.results = [];
  }

  setCurrentTab(ev: any) {
    this.common.userCurrentTab = ev.tab;
    console.log('current_tab::', this.common.userCurrentTab);
  }
}
