import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GetDataService } from 'src/app/otherServices/get-data.service';


@Component({
  selector: 'app-add-advertiser',
  templateUrl: './add-advertiser.page.html',
  styleUrls: ['./add-advertiser.page.scss'],
})
export class AddAdvertiserPage implements OnInit {
  getAdvData$!: Observable<any[] | DocumentData[]>;
  getAgencyData: any;


  constructor(private firestore: Firestore,
    public getData: GetDataService) { }

  ngOnInit() {
    this.getAgency()
  }

  addAdvertiser(advertiserForm: any) {
    console.log('Add Advertiser', advertiserForm.value);

    const collectionInstance = collection(this.firestore, 'advertiser');
    addDoc(collectionInstance, advertiserForm.value).then(() => {
      alert('Data Sent Secessfully');
      this.getData.myEventEmitter.emit(advertiserForm.value)

    })
      .catch((error) => {
        alert(error);

      })
  }


  async getAgency() {
    this.getAgencyData = await this.getData.getFromFirebase('agency');
    console.log('getAgencyData === ', this.getAgencyData);
  }
}
