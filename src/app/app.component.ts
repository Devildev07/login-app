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
  ) { }

  // toggleChange(event: any) {
  //   console.log('event', event);
  //   if (event.detail.checked) {
  //     document.body.setAttribute('color-theme', 'dark');
  //   } else {
  //     document.body.removeAttribute('color-theme');
  //   }
  // }

  // closeMenu(): void {
  //   console.log(this.isMenuClosed);
  //   this.isMenuClosed = true;
  //   console.log(this.isMenuClosed);

  // }
  async logOut() {
    this.authService.signOut().then(() => {
      this.authService.isUserLogin = false;
      this.route.navigate(['/login']);
      this.commonService.removeItem('userData');
    });
  }



  public appPages = [
    { heading: 'Videos', url: '/videos', icon: 'videocam-outline' },
    { heading: 'Devices', url: '/devices', icon: 'phone-portrait-outline' },
    { heading: 'Playlist', url: '/playlist', icon: 'play-outline' },
    { heading: 'Category', url: '/category', icon: 'apps-outline' },
    { heading: 'Locations', url: '/locations', icon: 'location-outline' },
    { heading: 'Campaign', url: '/campaign', icon: 'barcode-outline' },
    {
      heading: 'Inventory',
      url: '/inventory',
      icon: 'file-tray-stacked-outline',
    },
    { heading: 'Invoice', url: '/invoice', icon: 'newspaper-outline' },
    {
      heading: 'Playout Certificate',
      url: '/certificates',
      icon: 'ribbon-outline',
    },
    { heading: 'Users', url: '/users', icon: 'people-outline' },
    { heading: 'Profile', url: '/profile', icon: 'person-outline' },

    // { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

}
