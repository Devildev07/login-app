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
  isMenuClosed = false;

  constructor(
    public authService: AuthService,
    public route: Router,
    public commonService: CommonServiceService
  ) {}

  toggleChange(event: any) {
    console.log('event', event);
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.removeAttribute('color-theme');
    }
  }

  closeMenu(): void {
    console.log(this.isMenuClosed);
    this.isMenuClosed = true;
    console.log(this.isMenuClosed);

  }
  async logOut() {
    this.authService.signOut().then(() => {
      this.authService.isUserLogin = false;
      this.route.navigate(['/login']);
      this.commonService.removeItem('userData');
    });
  }
}
