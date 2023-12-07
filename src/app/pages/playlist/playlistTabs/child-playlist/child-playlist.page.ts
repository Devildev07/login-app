import { Component, OnInit } from '@angular/core';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';

@Component({
  selector: 'app-child-playlist',
  templateUrl: './child-playlist.page.html',
  styleUrls: ['./child-playlist.page.scss'],
})
export class ChildPlaylistPage implements OnInit {
  getchildPlaylistData: any;
  constructor(
    public CommonService: CommonServiceService,
    public getDatas: GetDataService,
    public firestore: Firestore
  ) {
    getDatas.myEventEmitter.subscribe((data) => {
      this.getchildPlaylistData.push(data);
      console.log('Received event with data:', data);
    });
  }

  ngOnInit() {
    this.getchildPlaylist();
    this.CommonService.searchText = '';
  }

  // get-query
  async getchildPlaylist() {
    const getPlaylistData: any = await this.getDatas.getFromFirebase(
      'playlist'
    );
    const filterData = getPlaylistData.filter((data: any) => {
      return data.type == 'child_playlist';
    });

    filterData.sort((a: any, b: any) => (a.playList_name && b.playList_name ? a.playList_name.localeCompare(b.playList_name) : 0));

    console.log('filterData', filterData);
    this.getchildPlaylistData = filterData;
    console.log('getchildPlaylistData', this.getchildPlaylistData);
  }

  // delete-query
  deleteChildPlaylist(id: string) {
    const docInstance = doc(this.firestore, 'playlist', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('deleted');
        this.getchildPlaylist();
      })
      .catch((err) => {
        console.log('not deleted', err);
      });
  }
}
