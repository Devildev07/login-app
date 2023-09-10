import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.page.html',
  styleUrls: ['./add-agency.page.scss'],
})
export class AddAgencyPage implements OnInit {

  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  addAgency(agencyForm: any) {
    console.log('Add Agency', agencyForm.value);

    const collectionInstance = collection(this.firestore, 'agency');
    addDoc(collectionInstance, agencyForm.value).then(() => {
      alert('Data Sent Secessfully');
    })
    .catch((error)=>{
      alert( error);

    })
  }

}
