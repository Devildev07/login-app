import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.page.html',
  styleUrls: ['./add-admin.page.scss'],
})
export class AddAdminPage implements OnInit {
  getAdminData$!: Observable<any[] | DocumentData[]>;
  adminData: any[] = [];
  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  addAdmin(adminForm: any) {
    console.log('Add Admin', adminForm.value);

    const collectionInstance = collection(this.firestore, 'admins');
    addDoc(collectionInstance, adminForm.value)
      .then(() => {
        alert('Data Sent Secessfully');
      })
      .catch((error) => {
        alert(error);
      });
  }
}
