import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonServiceService } from 'src/app/common-service.service';
import { AddCategoryPage } from '../addData/add-category/add-category.page';
import { AddCategoryPageModule } from '../addData/add-category/add-category.module';
ModalController


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  test: string = 'test';
  constructor(public common: CommonServiceService, public modalCntrl: ModalController) { }
  public results: any;

  ngOnInit() {
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.common.searchText = query;
  }

  onClear() {
    this.results = [];
  }
  async openVideoModal() {
    const modal = await this.modalCntrl.create({
      component: AddCategoryPage,
      componentProps: {
      },
      backdropDismiss: true, // Set to false if you don't want users to close the modal by clicking outside
      cssClass: 'Category-modal' // You can add a CSS class for custom styling
    });

    await modal.present();
  }

}
