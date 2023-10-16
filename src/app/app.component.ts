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
  // menuItems: any;
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

  async logOut() {
    this.authService.signOut().then(() => {
      this.authService.isUserLogin = false;
      this.route.navigate(['/login']);
      this.commonService.removeItem('userData');
    });
  }

  public appPages = [
    { heading: 'Videos', url: '/videos/general', icon: 'videocam' },
    { heading: 'Devices', url: '/devices', icon: 'phone-portrait' },
    { heading: 'Playlist', url: '/playlist', icon: 'play' },
    { heading: 'Category', url: '/category', icon: 'apps' },
    { heading: 'Locations', url: '/locations', icon: 'location' },
    { heading: 'Campaign', url: '/campaign', icon: 'barcode' },
    {
      heading: 'Inventory',
      url: '/inventory',
      icon: 'file-tray-stacked',
    },
    { heading: 'Invoice', url: '/invoice', icon: 'newspaper' },
    {
      heading: 'Playout Certificate',
      url: '/certificates',
      icon: 'ribbon',
    },
    { heading: 'Users', url: '/users/clients', icon: 'people' },
    { heading: 'Profile', url: '/profile', icon: 'person' },
  ];
}
