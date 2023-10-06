import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { object } from '@angular/fire/database';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  public results: any;
  storageRefLenghtGen: number = 0;
  storageRefLenghtDoc: number = 0;
  storageRefLenghtAds: number = 0;

  storageRefTotalLenght: number = 0;

  constructor(
    public common: CommonServiceService,
    public afStorage: AngularFireStorage
  ) {}
  ngOnInit() {
    const storageRefGen = this.afStorage.ref('/uploads/general/');
    storageRefGen.listAll().subscribe((result) => {
      this.storageRefLenghtGen = result.items.length;
      this.common.generalCount = this.storageRefLenghtGen;
      console.log('.common.generalCount', this.common.generalCount);
      console.log('storageRefLenghtGen', this.storageRefLenghtGen);
    });

    const storageRefDoc = this.afStorage.ref('/uploads/doctor/');
    storageRefDoc.listAll().subscribe((result) => {
      this.storageRefLenghtDoc = result.items.length;
      this.common.doctorCount = this.storageRefLenghtDoc;
      console.log('.common.doctorCount', this.common.doctorCount);
      console.log('storageRefLenghtDoc', this.storageRefLenghtDoc);
    });

    const storageRefAds = this.afStorage.ref('/uploads/ads/');
    storageRefAds.listAll().subscribe((result) => {
      this.storageRefLenghtAds = result.items.length;
      this.common.adsCount = this.storageRefLenghtAds;
      console.log('.common.adsCount', this.common.adsCount);
      console.log('storageRefLenghtAds', this.storageRefLenghtAds);
    });

    // totalLenght
    forkJoin([
      storageRefGen.listAll(),
      storageRefDoc.listAll(),
      storageRefAds.listAll(),
    ]).subscribe((results: any[]) => {
      this.storageRefLenghtGen = results[0].items.length;
      this.storageRefLenghtDoc = results[1].items.length;
      this.storageRefLenghtAds = results[2].items.length;

      // Calculate the total item count
      this.storageRefTotalLenght =
        this.storageRefLenghtGen +
        this.storageRefLenghtDoc +
        this.storageRefLenghtAds;
    });
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
