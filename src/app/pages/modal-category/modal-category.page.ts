import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GetDataService } from 'src/app/otherServices/get-data.service';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.page.html',
  styleUrls: ['./modal-category.page.scss'],
})
export class ModalCategoryPage implements OnInit {
  getCategoryDataList: any // Define your categories here
  selectedCategory?: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public getData: GetDataService
  ) {

  }

  ngOnInit() {

  }

  closeModal() {
    this.modalController.dismiss();
  }

  saveCategory() {
    if (this.selectedCategory) {
      this.navParams.get('callback')(this.selectedCategory);
      this.modalController.dismiss();
    }
  }

  async getCategoryList() {
    this.getCategoryDataList = await this.getData.getFromFirebase('category');
    console.log('getCategoryDataList === ', this.getCategoryDataList);
  }

}
