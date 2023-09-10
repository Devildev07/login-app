import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-advertiser',
  templateUrl: './add-advertiser.page.html',
  styleUrls: ['./add-advertiser.page.scss'],
})
export class AddAdvertiserPage implements OnInit {
  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  addAdvertiser(advertiserForm: any) {
    console.log('Add Admin', advertiserForm.value);

    const collectionInstance = collection(this.firestore, 'advertiser');
    addDoc(collectionInstance, advertiserForm.value).then(() => {
      alert('Data Sent Secessfully');
    })
    .catch((error)=>{
      alert( error);

    })
  }
}
