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
  selector: 'app-add-manager',
  templateUrl: './add-manager.page.html',
  styleUrls: ['./add-manager.page.scss'],
})
export class AddManagerPage implements OnInit {
  getManagerData$!: Observable<any[] | DocumentData[]>;
  agencyData: any[] = [];

  constructor(private firestore: Firestore, public getData: GetDataService) {}

  ngOnInit() {}

  addManager(managerForm: any) {
    console.log('Add Manager', managerForm.value);

    const collectionInstance = collection(this.firestore, 'manager');
    addDoc(collectionInstance, managerForm.value)
      .then(() => {
        alert('Data Sent Secessfully');
        this.getData.myEventEmitter.emit(managerForm.value);

      })
      .catch((error) => {
        alert(error);
      });
  }
}
