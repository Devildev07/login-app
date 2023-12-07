import { Component, OnInit } from '@angular/core';
import { Firestore, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';

@Component({
  selector: 'app-master-playlist',
  templateUrl: './master-playlist.page.html',
  styleUrls: ['./master-playlist.page.scss'],
})
export class MasterPlaylistPage implements OnInit {
  getMasterPlaylistData: any;

  constructor(
    public CommonService: CommonServiceService,
    public getDatas: GetDataService,
    public firestore: Firestore
  ) {
    getDatas.myEventEmitter.subscribe((data) => {
      this.getMasterPlaylistData.push(data);
      console.log('Received event with data:', data);
    });
  }

  ngOnInit() {
    this.getMasterPlaylist();
    this.CommonService.searchText = '';
  }

  // get-query
  async getMasterPlaylist() {
    const getPlaylistData: any = await this.getDatas.getFromFirebase(
      'playlist'
    );
    const filterData = getPlaylistData.filter((data: any) => {
      return data.type == 'master_playlist';
    });

    filterData.sort((a: any, b: any) =>
      a.playList_name && b.playList_name
        ? a.playList_name.localeCompare(b.playList_name)
        : 0
    );

    console.log('filterData', filterData);
    this.getMasterPlaylistData = filterData;
    console.log('getMasterPlaylistData', this.getMasterPlaylistData);
  }

  // delete-query
  deleteMasterPlaylist(id: string) {
    const docInstance = doc(this.firestore, 'playlist', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('deleted');
        this.getMasterPlaylist();
      })
      .catch((err) => {
        console.log('not deleted', err);
      });
  }
}
