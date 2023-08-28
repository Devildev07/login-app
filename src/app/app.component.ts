import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { CommonServiceService } from './common-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuItems: any;
  constructor(
    public authService: AuthService,
    public route: Router,
    public commonService: CommonServiceService
  ) { }

  async logOut() {
    this.authService.signOut().then(() => {
      this.authService.isUserLogin = false;
      this.route.navigate(['/login']);
      this.commonService.removeItem('userData')
    });
  }
}
