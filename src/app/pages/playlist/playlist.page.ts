import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  public results: any;
  masterPlaylistDataLenght: number = 0;
  childPlaylistDataLenght: number = 0
  totalPlaylistDataLenght: number = 0;

  constructor(public common: CommonServiceService, public getDatas: GetDataService) { }

  ngOnInit() {
    this.getPlaylist();
  }

  setCurrentTab(ev: any) {
    this.common.userCurrentTab = ev.tab;
    console.log('current_tab::', this.common.userCurrentTab);
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.common.searchText = query;
    console.log('searchText::', this.common.searchText);
  }

  onClear() {
    this.results = [];
  }

  async getPlaylist() {
    const getPlaylistData: any = await this.getDatas.getFromFirebase('playlist');
    console.log('getPlaylistData', getPlaylistData);
    // this.totalPlaylistDataLenght = getPlaylistData.length

    const filterData1 = getPlaylistData.filter((data: any) => {
      return data.type == 'master_playlist';
    })
    this.masterPlaylistDataLenght = filterData1.length
    console.log("master lenght ==", this.masterPlaylistDataLenght);
    console.log('filterData1', filterData1);

    const filterData2 = getPlaylistData.filter((data: any) => {
      return data.type == 'child_playlist';
    })
    this.childPlaylistDataLenght = filterData2.length
    console.log("child lenght ==", this.childPlaylistDataLenght);
    console.log('filterData2', filterData2);

    this.totalPlaylistDataLenght = this.masterPlaylistDataLenght + this.childPlaylistDataLenght;
    console.log('totalPlaylistDataLenght==', typeof (this.totalPlaylistDataLenght));
    console.log('totalPlaylistDataLenght==', this.totalPlaylistDataLenght);
  }

}
