import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.page.html',
  styleUrls: ['./add-manager.page.scss'],
})
export class AddManagerPage implements OnInit {
  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  addManager(managerForm: any) {
    console.log('Add Manager', managerForm.value);

    const collectionInstance = collection(this.firestore, 'manager');
    addDoc(collectionInstance, managerForm.value)
      .then(() => {
        alert('Data Sent Secessfully');
      })
      .catch((error) => {
        alert(error);
      });
  }
}
