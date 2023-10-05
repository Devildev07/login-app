import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  public results: any;
  storageRefLenghtGen : any
  storageRefLenghtDoc : any
  storageRefLenghtAds : any


  constructor(public common: CommonServiceService, public afStorage: AngularFireStorage) { }
  ngOnInit() { 
    const storageRefGen = this.afStorage.ref('/uploads/' + "general")
    this.storageRefLenghtGen= storageRefGen.list.length
    console.log("storageRefGenLenghtGen" , this.storageRefLenghtGen);
    
    const storageRefDoc = this.afStorage.ref('/uploads/' + 'doctor');
    this.storageRefLenghtGen= storageRefDoc.list.length
    console.log("storageRefDocLenghtGen" , this.storageRefLenghtGen);
    
    const storageRefAds = this.afStorage.ref('/uploads/' + "ads")
    this.storageRefLenghtGen= storageRefAds.list.length
    console.log("storageRefAdsLenghtGen" , this.storageRefLenghtGen);
    
  }

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
