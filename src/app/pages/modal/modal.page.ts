import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  adminDetails: any = {};

  constructor(
    private modalCntrl: ModalController,
    private navParams: NavParams
  ) {
    this.adminDetails = this.navParams.data;
    console.log(`details ${this.adminDetails}`);
  }

  ngOnInit() {}

  closeModal() {
    this.modalCntrl.dismiss(this.adminDetails);
  }
}
