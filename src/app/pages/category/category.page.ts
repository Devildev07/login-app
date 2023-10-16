import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonServiceService } from 'src/app/common-service.service';
import { AddCategoryPage } from '../addData/add-category/add-category.page';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { Location } from '@angular/common';
import { Firestore, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { UpdateCatModalComponent } from 'src/app/components/update-cat-modal/update-cat-modal.component';
import { AuthService } from 'src/app/auth.service';



@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  public results: any;
  getCategoryData: any;
  totalCatLength: any;

  constructor(
    private location: Location,
    private firestore: Firestore,
    public authService: AuthService,
    public common: CommonServiceService,
    public getDatas: GetDataService,
    public modalCntrl: ModalController
  ) {
    this.common.searchText = '';
    this.getDatas.myEventEmitter.subscribe((cData) => {
      this.getCategoryData.push(cData);
      console.log('Received event with cData:', cData);
    });
  }

  ngOnInit() {
    this.getCategory();
    this.common.searchText = '';
  }

  async getCategory() {
    this.getCategoryData = await this.getDatas.getFromFirebase('category');
    console.log('getCategoryData === ', this.getCategoryData);
    this.totalCatLength = this.getCategoryData.length;
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
      componentProps: { getCategoryData: this.getCategoryData },
      backdropDismiss: true, // Set to false if you don't want users to close the modal by clicking outside
      cssClass: 'Category-modal', // You can add a CSS class for custom styling
    });

    modal.onDidDismiss().then(() => {
      this.getCategory();
    });

    await modal.present();
  }

  async openUpdateCategoryModal(singleCatData: any) {
    const modal = await this.modalCntrl.create({
      component: UpdateCatModalComponent,
      componentProps: { singleCatData: singleCatData },
      backdropDismiss: true, // Set to false if you don't want users to close the modal by clicking outside
      cssClass: 'Category-modal', // You can add a CSS class for custom styling
    });
    await modal.present();
  }

  deleteClient(id: string) {
    const docInstance = doc(this.firestore, 'category', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('deleted');
        this.getCategory();
      })
      .catch((err) => {
        console.log('not deleted', err);
      });
  }
}
