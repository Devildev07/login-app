import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AdminServiceService } from 'src/app/otherServices/admin-service.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.page.html',
  styleUrls: ['./add-admin.page.scss'],
})
export class AddAdminPage implements OnInit {
  getAdminData!: Observable<any[] | DocumentData[]>;
  adminData: any[] = [];
  constructor(
    private firestore: Firestore,
    private adminDataService: AdminServiceService
  ) {}

  ngOnInit() {
    this.getAdmin();
    this.adminDataService.setAdminService(this.adminData);
    
  }

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

  getAdmin() {
    const collectionInstance = collection(this.firestore, 'admins');
    this.getAdminData = collectionData(collectionInstance);

    collectionData(collectionInstance).subscribe((val) => {
      console.log('val', val);

      this.adminData = val;
      console.log('data', this.adminData);
    });
    // this.adminData = this.adminDataService.adminData
    // console.log("AD", this.adminData);

    // this.getAdminData.subscribe((val: any[]) => {
    //   console.log('val', val);
    //   this.adminDataService.adminData = val; // Assign the data to your service
    // });

    this.getAdminData = collectionData(collectionInstance);
    console.log('getAdminData', this.getAdminData);
  }
}
