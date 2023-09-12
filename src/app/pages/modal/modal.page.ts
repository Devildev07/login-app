import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  dataDetails: any = {};

  constructor(
    private modalCntrl: ModalController,
    private navParams: NavParams
  ) {
    this.dataDetails = this.navParams.data;
    console.log("details",this.dataDetails);
  }

  ngOnInit() {}

  closeModal() {
    this.modalCntrl.dismiss(this.dataDetails);
  }
}
