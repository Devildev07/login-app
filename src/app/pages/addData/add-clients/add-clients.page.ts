import { Component, Input, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AddLocationModalComponent } from 'src/app/components/add-location-modal/add-location-modal.component';
import { GetDataService } from 'src/app/otherServices/get-data.service';


@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.page.html',
  styleUrls: ['./add-clients.page.scss'],
})
export class AddClientsPage implements OnInit {
  getClientData!: Observable<any[] | DocumentData[]>;
  clientData: any[] = [];

  endDate: any;
  startDate: any;

  constructor(
    private firestore: Firestore,
    public getData: GetDataService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  addClient(clientsForm: any) {
    console.log('Add Clients', clientsForm.value);

    // const collectionInstance = collection(this.firestore, 'clients');
    // addDoc(collectionInstance, clientsForm.value)
    //   .then(() => {
    //     alert('Data Sent Secessfully');
    //     this.getData.myEventEmitter.emit(clientsForm.value);
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });

    clientsForm.reset();
  }

  dateSelectionChange(event: CustomEvent | any, dateType: 'start' | 'end') {
    // Access the selected date from the event
    const selectedDate = event.detail.value;

    // Determine whether it's for the start or end date and update accordingly
    if (dateType === 'start') {
      this.startDate = selectedDate;
      console.log('Start Date:', this.startDate);
    } else if (dateType === 'end') {
      this.endDate = selectedDate;
      console.log('End Date:', this.endDate);
    }
  }

  // location modal
 async addLocationModal() {
  const modal = await this.modalController.create({
    component: AddLocationModalComponent,
    componentProps: {},
    cssClass: 'updateData-modal',
  });

  modal.onDidDismiss().then((data) => {
    console.log('Modal data', data);
  })

  return await modal.present();

  }
}
