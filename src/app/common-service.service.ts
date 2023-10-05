import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  searchText: any = '';
  userCurrentTab = '';
  doctorCount = 0;
  generalCount = 0;
  adsCount = 0;
  constructor(private fireStorage: AngularFireStorage) {}

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

  encryptPass(getPass: string) {
    var passA = btoa(getPass);
    var passB = btoa('devil');
    var generatedPass = passA + '@$98#%' + passB;
    console.log('generatedPass', generatedPass);
  }

  uploadFile(file: File, filePath: string): AngularFireUploadTask {
    const storageRef = this.fireStorage.ref(filePath);
    const uploadTask = storageRef.put(file);

    // Return the AngularFireUploadTask
    return uploadTask;
  }

  getDownloadURL(filePath: string): Promise<string> {
    const storageRef = this.fireStorage.ref(filePath);

    // Use getDownloadURL to retrieve the download URL
    return storageRef.getDownloadURL().toPromise();
  }
}
