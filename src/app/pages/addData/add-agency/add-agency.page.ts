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
  selector: 'app-add-agency',
  templateUrl: './add-agency.page.html',
  styleUrls: ['./add-agency.page.scss'],
})
export class AddAgencyPage implements OnInit {
  getAgencyData$!: Observable<any[] | DocumentData[]>;
  agencyData: any[] = [];

  constructor(private firestore: Firestore, public getData: GetDataService) {}

  ngOnInit() {}

  addAgency(agencyForm: any) {
    console.log('Add Agency', agencyForm.value);

    const collectionInstance = collection(this.firestore, 'agency');
    addDoc(collectionInstance, agencyForm.value)
      .then(() => {
        alert('Data Sent Secessfully');
        this.getData.myEventEmitter.emit(agencyForm.value);
      })
      .catch((error) => {
        alert(error);
      });
  }
}
