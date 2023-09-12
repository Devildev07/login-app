import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GetDataService } from 'src/app/otherServices/get-data.service';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.page.html',
  styleUrls: ['./add-admin.page.scss'],
})
export class AddAdminPage implements OnInit {
  getAdminData$!: Observable<any[] | DocumentData[]>;
  adminData: any[] = [];

  constructor(private firestore: Firestore,
    public getData: GetDataService) { }

  ngOnInit() { }

  addAdmin(adminForm: any) {
    console.log('Add Admin', adminForm.value);

    const collectionInstance = collection(this.firestore, 'admins');
    addDoc(collectionInstance, adminForm.value)
      .then(() => {
        alert('Data Sent Secessfully');
        this.getData.myEventEmitter.emit(adminForm.value)
      })
      .catch((error) => {
        alert(error);
      });
  }
}
