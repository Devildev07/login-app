import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  searchTxt: any = '';

  constructor(
    public authService: AuthService,
    public route: Router,
    public common: CommonServiceService
  ) {
    var localdata = this.common.getItem('userData');
    console.log('localdata ', localdata);
  }

  ngOnInit() {}

  public data = this.authService.userEmail;

  async logOut() {
    this.authService.signOut().then(() => {
      this.common.removeItem('userData');
      this.route.navigate(['/login']);
      this.authService.isUserLogin = false;
    });
  }
}
