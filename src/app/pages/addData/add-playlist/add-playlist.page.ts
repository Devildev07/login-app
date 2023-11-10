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

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.page.html',
  styleUrls: ['./add-playlist.page.scss'],
})
export class AddPlaylistPage implements OnInit {
  getCategoryDataList: any; // Define your categories here

  constructor(
    private firestore: Firestore,
    public getData: GetDataService,
    public route: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.getCategoryList();
  }

  // Get category
  async getCategoryList() {
    this.getCategoryDataList = await this.getData.getFromFirebase('category');
    console.log('getCategoryDataList === ', this.getCategoryDataList);
  }

  // navigate to playlist page
  async navigateToCategory() {
    await this.route.navigateByUrl('/playlist/master_playlist', {
      skipLocationChange: true,
    });
    this.getCategoryList();
    this.location.replaceState('/playlist/master_playlist');
  }

  //adding playlist to firebase
  async addPlaylist(playListForm: any) {
    // Get the form data
    const formData = playListForm.value;
console.log('Add Playlist from add page', playListForm.value);

    // Add the playlist to Firebase

    await this.getData.addDataToFireBase('playlist', formData);

    // Reset the form
    playListForm.reset();
  }
}
