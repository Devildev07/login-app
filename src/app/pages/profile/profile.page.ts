import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  searchTxt: any = '';
  getProfileData: any;
  loggedUser: any = [
    // {
    //   address: '',
    //   uname: '',
    //   email: '',
    //   mobile: '',
    //   password: '',
    //   region: '',
    //   id: '',
    // },
  ];

  constructor(
    public authService: AuthService,
    public route: Router,
    public common: CommonServiceService,
    public getDatas: GetDataService
  ) {
    var localdata = this.common.getItem('userData');
    console.log('localdata== ', localdata);

    // this.getDatas.myEventEmitter.subscribe((data) => {
    //   this.getProfileData.push(data);
    //   console.log('Received event with data:', data);
    // });
  }

  ngOnInit() {
    this.getProfile();
  }

  public data = this.authService.userEmail;

  async logOut() {
    this.authService.signOut().then(() => {
      this.common.removeItem('userData');
      this.route.navigate(['/login']);
      this.authService.isUserLogin = false;
    });
  }

  async getProfile() {
    this.getProfileData = await this.getDatas.getFromFirebase('admins');
    console.log('this is the profile  data', this.data);
    console.log('getpProfileData === ', this.getProfileData);
    let temp = this.getProfileData.filter(
      (item: any) => item.email == this.data
    );
    this.loggedUser = temp;
    console.log('loggedUser', this.loggedUser);
  }
}
