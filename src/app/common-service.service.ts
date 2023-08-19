import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor() {}
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  menuItem() {
    return [
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
    ];
  }
}
