import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  Firestore,
  collection,
  addDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { CommonServiceService } from 'src/app/common-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalController } from '@ionic/angular';
import { GeneralVideoModalComponent } from 'src/app/components/general-video-modal/general-video-modal.component';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.page.html',
  styleUrls: ['./add-playlist.page.scss'],
})
export class AddPlaylistPage implements OnInit {
  getCategoryDataList: any;
  getPlaylistDataList: any;
  uploadedFiles: any[] = [];
  getSelectedVideo: any[] = [];
  type: any = 'master_playlist';
  constructor(
    private firestore: Firestore,
    public route: Router,
    private location: Location,
    public getData: GetDataService,
    public CommonService: CommonServiceService,
    public afStorage: AngularFireStorage,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.getCategoryList();
    // this.getPlaylistData();
  }

  // Get category
  async getCategoryList() {
    this.getCategoryDataList = await this.getData.getFromFirebase('category');
    console.log('getCategoryDataList === ', this.getCategoryDataList);
  }

  // navigate to playlist page
  async navigateToCategory() {
    await this.route.navigateByUrl(
      '/playlist/' + this.CommonService.playlistCurrentTab,
      {
        skipLocationChange: true,
      }
    );
    this.getCategoryList();
    // this.location.replaceState(
    //   '/playlist/' + this.CommonService.playlistCurrentTab
    // );
  }

  // Adding playlist to Firebase
  async addPlaylist(playListForm: any) {
    // Get the form data
    const formData = playListForm.value;
    console.log('Add Playlist from add page', playListForm.value);

    // Get the selected video list
    const selectedVideoList = this.getSelectedVideo.map((video) => ({
      name: video.name,
      downloadURL: video.downloadURL,
    }));

    // Combine form data and selected video list
    const dataToSave = { ...formData, selectedVideoList };

    // Add the playlist to Firebase
    await this.getData.addDataToFireBase('playlist', dataToSave);

    // Reset the form
    playListForm.reset();
  }

  // open general modal
  async openGeneralVideoModal() {
    console.log('getSelectedVideo === ', this.getSelectedVideo);
    console.log('this.uploadedFiles === ', this.uploadedFiles);
    const modal = await this.modalController.create({
      component: GeneralVideoModalComponent,
      componentProps: {
        videos: this.getSelectedVideo,
        type: this.type,
      },
    });

    modal.onDidDismiss().then((data) => {
      console.log('Modal data', data);
      if (data.data !== undefined) {
        const selectedVideos = data.data;
        console.log('Selected Videos:', selectedVideos);
        this.getSelectedVideo.push(...selectedVideos);
      }
    });

    return await modal.present();
  }

  // // get playlist data
  // async getPlaylistData() {
  //   this.getPlaylistDataList = await this.getData.getFromFirebase('playlist');
  //   const filterData = this.getPlaylistDataList.filter((data: any) => {
  //     return data.type == 'master_playlist';
  //   })

  //   this.getPlaylistDataList = filterData;
  //   console.log('getPlaylistDataList === ', this.getPlaylistDataList);
  // }

}
