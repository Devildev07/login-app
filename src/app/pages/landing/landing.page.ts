import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  constructor(
    public authService: AuthService,
    public route: Router,
    public commonn: CommonServiceService
  ) {
    var localdata = this.commonn.getItem('userData');
    console.log('localdata ', localdata);
  }

  ngOnInit() {}

  async logOut() {
    this.authService.signOut().then(() => {
      this.commonn.removeItem('userData');
      this.route.navigate(['/login']);
    });
  }
}
