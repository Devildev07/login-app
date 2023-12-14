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
import { PlaylistModalComponent } from 'src/app/components/playlist-modal/playlist-modal.component';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.page.html',
  styleUrls: ['./add-playlist.page.scss'],
})
export class AddPlaylistPage implements OnInit {
  getCategoryDataList: any;
  uploadedFiles: any[] = [];
  getSelectedVideo: any[] = [];
  getSelectedPlaylist: any = [];
  getPlayListData: any;
  type: any = 'master_playlist';

  seletedItemLength = 0;
  isMasterPlaylist: boolean = false;

  constructor(
    private firestore: Firestore,
    public route: Router,
    public getData: GetDataService,
    public CommonService: CommonServiceService,
    public afStorage: AngularFireStorage,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getCategoryList();
    this.showCount();
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
  }
  showCount() {
    console.log(
      'this.getSelectedPlaylist',
      this.getSelectedPlaylist,
      this.getSelectedPlaylist[0]?.selectedVideoList?.length
    );
    console.log(' this.getSelectedVideo;', this.getSelectedVideo?.length);

    this.seletedItemLength =
      this.getSelectedPlaylist[0]?.selectedVideoList?.length +
      this.getSelectedVideo?.length;

       this.isMasterPlaylist = this.type === 'master_playlist';
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
    console.log('selectedVideoList length === ', selectedVideoList.length);

    const selectedPlayList = this.getSelectedPlaylist.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.playList_name,
    }));
    console.log('selectedPlayList length === ', selectedPlayList.length);

    // Combine form data and selected video list
    const dataToSave = { ...formData, selectedVideoList, selectedPlayList };
    console.log('dataToSave === ', dataToSave);

    // Add the playlist to Firebase
    await this.getData.addDataToFireBase('playlist', dataToSave);

    // Reset the form
    playListForm.reset();
  }

  // open general modal
  async openGeneralVideoModal() {
    // console.log('getSelectedVideo === ', this.getSelectedVideo);
    // console.log('this.uploadedFiles === ', this.uploadedFiles);
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
        this.showCount();
      }
    });

    return await modal.present();
  }

  // open masterplaylist modal
  async openVideoModal() {
    console.log('clicked');
    console.log('getSelectedPlaylist === ', this.getSelectedPlaylist);

    const modal = await this.modalController.create({
      component: PlaylistModalComponent,
      componentProps: {
        playlist: this.getSelectedPlaylist,
        type: this.type,
      },
    });

    modal.onDidDismiss().then((data) => {
      console.log('Modal data', data);
      if (data.data !== undefined) {
        const selectedPlaylist = data.data;
        console.log('Selected Playlist:', selectedPlaylist);
        this.getSelectedPlaylist = [...selectedPlaylist];
        this.showCount();
      }
    });
    return await modal.present();
  }
}
