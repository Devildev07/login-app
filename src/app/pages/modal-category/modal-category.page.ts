import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GetDataService } from 'src/app/otherServices/get-data.service';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.page.html',
  styleUrls: ['./modal-category.page.scss'],
})
export class ModalCategoryPage implements OnInit {
  getCategoryDataList: any;
  selectedCategory: string | undefined;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public getData: GetDataService
  ) {
    this.getCategoryDataList = [];
  }

  ngOnInit() {
    this.getCategoryList();
  }

  closeModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  saveCategory() {
    this.modalController.dismiss(this.selectedCategory, 'save');
  }

  async getCategoryList() {
    this.getCategoryDataList = await this.getData.getFromFirebase('category');
    console.log('getCategoryDataList === ', this.getCategoryDataList);
  }
}
