import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  public results: any;

  constructor(public common: CommonServiceService,) { }

  ngOnInit() {
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

}
