import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { ModalController, PopoverController } from '@ionic/angular';
import { VideoPopupComponent } from 'src/app/components/video-popup/video-popup.component';


@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  searchText: any = '';
  userCurrentTab = '';
  playlistCurrentTab = '';
  doctorCount = 0;
  generalCount = 0;
  adsCount = 0;
  constructor(
    private fireStorage: AngularFireStorage,
    private modalCtrl: ModalController,
    public popUps: PopoverController
  ) { }

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

  //encrypt password
  encryptPass(getPass: string) {
    var passA = btoa(getPass);
    var passB = btoa('devil');
    var generatedPass = passA + '@$98#%' + passB;
    console.log('generatedPass', generatedPass);
  }

  uploadFile(
    file: File,
    filePath: string,
    metadata: any
  ): AngularFireUploadTask {
    const storageRef = this.fireStorage.ref(filePath);
    const uploadTask = storageRef.put(file, { customMetadata: metadata });

    // Return the AngularFireUploadTask
    return uploadTask;
  }

  getDownloadURL(filePath: string): Promise<string> {
    const storageRef = this.fireStorage.ref(filePath);

    // Use getDownloadURL to retrieve the download URL
    return storageRef.getDownloadURL().toPromise();
  }

  async openVideoModal(videoUrl: string) {
    const modal = await this.modalCtrl.create({
      component: VideoPopupComponent,
      componentProps: {
        videoUrl: videoUrl,
      },
      backdropDismiss: true, // Set to false if you don't want users to close the modal by clicking outside
      cssClass: 'video-modal', // You can add a CSS class for custom styling
    });

    await modal.present();
  }

  //commented code

  // async openVideoPopup(videoUrl: string) {
  //   const popover = await this.popUps.create({
  //     component: VideoPopupComponent,
  //     componentProps: {
  //       videoUrl: videoUrl,
  //     },
  //     translucent: true,
  //   });
  //   await popover.present();
  // }

  // menuItem() {
  //   return [
  //     { heading: 'Videos', url: '/videos', icon: 'videocam-outline' },
  //     { heading: 'Devices', url: '/devices', icon: 'phone-portrait-outline' },
  //     { heading: 'Playlist', url: '/playlist', icon: 'play-outline' },
  //     { heading: 'Category', url: '/category', icon: 'apps-outline' },
  //     { heading: 'Locations', url: '/locations', icon: 'location-outline' },
  //     { heading: 'Campaign', url: '/campaign', icon: 'barcode-outline' },
  //     {
  //       heading: 'Inventory',
  //       url: '/inventory',
  //       icon: 'file-tray-stacked-outline',
  //     },
  //     { heading: 'Invoice', url: '/invoice', icon: 'newspaper-outline' },
  //     {
  //       heading: 'Playout Certificate',
  //       url: '/certificates',
  //       icon: 'ribbon-outline',
  //     },
  //     { heading: 'Users', url: '/users', icon: 'people-outline' },
  //     { heading: 'Profile', url: '/profile', icon: 'person-outline' },
  //   ];
  // }
}
