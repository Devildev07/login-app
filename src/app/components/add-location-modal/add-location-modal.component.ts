import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss'],
})
export class AddLocationModalComponent implements OnInit {
  constructor(public modalCntrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCntrl.dismiss();
  }

  addLocation() {
    console.log('Add Location');
    this.closeModal();
    
  }
  
}
