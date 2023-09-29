import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  public results: any;
  constructor(public common: CommonServiceService) { }
  ngOnInit() { }

  setCurrentTab(ev: any) {
    this.common.userCurrentTab = ev.tab;
    console.log('current_tab::', this.common.userCurrentTab);
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.common.searchText = query;
  }

  onClear() {
    this.results = [];
  }
}
