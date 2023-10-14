import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonServiceService } from 'src/app/common-service.service';
import { AddCategoryPage } from '../addData/add-category/add-category.page';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { Firestore, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UpdateCatModalComponent } from 'src/app/components/update-cat-modal/update-cat-modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  test: string = 'test';
  getCategoryData: any;

  constructor(
    private firestore: Firestore,
    public common: CommonServiceService,
    public getDatas: GetDataService,
    public modalCntrl: ModalController
  ) {
    this.common.searchText = '';
    getDatas.myEventEmitter.subscribe((data) => {
      this.getCategoryData.push(data);
      console.log('Received event with data:', data);
    });
  }
  public results: any;

  ngOnInit() {
    this.getCategory();
    this.common.searchText = '';
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.common.searchText = query;
  }

  onClear() {
    this.results = [];
  }

  async openAddCategoryModal() {
    const modal = await this.modalCntrl.create({
      component: AddCategoryPage,
      componentProps: {},
      backdropDismiss: true, // Set to false if you don't want users to close the modal by clicking outside
      cssClass: 'Category-modal', // You can add a CSS class for custom styling
    });
    await modal.present();
  }
  async openUpdateCategoryModal() {
    const modal = await this.modalCntrl.create({
      component: UpdateCatModalComponent,
      componentProps: {},
      backdropDismiss: true, // Set to false if you don't want users to close the modal by clicking outside
      cssClass: 'Category-modal', // You can add a CSS class for custom styling
    });
    await modal.present();
  }

  async getCategory() {
    this.getCategoryData = await this.getDatas.getFromFirebase('category');
  }

  updateCategory(data: any) {
    console.log('id=', data);
    const docInstance = doc(this.firestore, 'category', data.id);

    const updateData = {
      category_name: data.category_name,
      category_description: data.category_description,
      type: data.type,
    };
    let updatedIndex = -1;
    this.getCategoryData.forEach((e: any, i: any) => {
      if (e.id == data.id) {
        updatedIndex = i;
      }
    });

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log(`updated`);
        if (updatedIndex >= 0) {
          this.getCategoryData[updatedIndex] = updateData;
        }
      })
      .catch((err) => {
        console.log(`Error updating document: ${err}`);
      });
  }
}
