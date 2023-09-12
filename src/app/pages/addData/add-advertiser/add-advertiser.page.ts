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


  constructor(private firestore: Firestore,
    public getData: GetDataService) {}

  ngOnInit() {}

  addAdvertiser(advertiserForm: any) {
    console.log('Add Advertiser', advertiserForm.value);

    const collectionInstance = collection(this.firestore, 'advertiser');
    addDoc(collectionInstance, advertiserForm.value).then(() => {
      alert('Data Sent Secessfully');
      this.getData.myEventEmitter.emit(advertiserForm.value)

    })
    .catch((error)=>{
      alert( error);

    })
  }
}
