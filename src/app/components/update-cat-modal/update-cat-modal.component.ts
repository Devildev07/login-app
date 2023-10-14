import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-update-cat-modal',
  templateUrl: './update-cat-modal.component.html',
  styleUrls: ['./update-cat-modal.component.scss'],
})
export class UpdateCatModalComponent implements OnInit {
  catData: any = {};
  constructor(
    private modalCntrl: ModalController,
    private navParams: NavParams
  ) {
    this.catData = navParams.data;
    console.log('catData', this.catData);
  }

  ngOnInit() {}

  closeModal() {
    this.modalCntrl.dismiss(this.catData);
  }
}
