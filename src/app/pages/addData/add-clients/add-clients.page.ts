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
  selector: 'app-add-clients',
  templateUrl: './add-clients.page.html',
  styleUrls: ['./add-clients.page.scss'],
})
export class AddClientsPage implements OnInit {
  getClientData!: Observable<any[] | DocumentData[]>;
  clientData: any[] = [];
  constructor(private firestore: Firestore, public getData: GetDataService) { }

  ngOnInit() { }

  addClient(clientsForm: any) {
    console.log('Add Clients', clientsForm.value);

    const collectionInstance = collection(this.firestore, 'clients');
    addDoc(collectionInstance, clientsForm.value)
      .then(() => {
        alert('Data Sent Secessfully');
        this.getData.myEventEmitter.emit(clientsForm.value);
      })
      .catch((error) => {
        alert(error);
      });
  }
}
