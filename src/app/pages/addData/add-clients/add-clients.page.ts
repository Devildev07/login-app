import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.page.html',
  styleUrls: ['./add-clients.page.scss'],
})
export class AddClientsPage implements OnInit {
  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  addClient(clientsForm: any) {
    console.log('Add Clients', clientsForm.value);

    const collectionInstance = collection(this.firestore, 'clients');
    addDoc(collectionInstance, clientsForm.value)
      .then(() => {
        alert('Data Sent Secessfully');
      })
      .catch((error) => {
        alert(error);
      });
  }
}
