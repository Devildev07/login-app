import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';



@Component({
  selector: 'app-master-playlist',
  templateUrl: './master-playlist.page.html',
  styleUrls: ['./master-playlist.page.scss'],
})
export class MasterPlaylistPage implements OnInit {
  getMasterPlaylistData: any;

  constructor(public CommonService: CommonServiceService, public getDatas: GetDataService, public firestore: Firestore) { }

  ngOnInit() {
    this.getMasterPlaylist()
    this.CommonService.searchText = '';
  }

  async getMasterPlaylist() {
    this.getMasterPlaylistData = await this.getDatas.getFromFirebase('playlist');
    console.log("getMasterPlaylistData", this.getMasterPlaylistData);
  }

}
