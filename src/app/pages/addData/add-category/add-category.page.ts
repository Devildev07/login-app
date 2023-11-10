import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GetDataService } from 'src/app/otherServices/get-data.service';
// import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  getCategoryData$!: Observable<any[] | DocumentData[]>;
  categoryData: any[] = [];
  singleCatData: any;
  list: any;
  getCategoryDataList: any;

  constructor(
    private firestore: Firestore,
    public route: Router,
    public getData: GetDataService,
    private location: Location
  ) // private navParams: NavParams,
  {
    // this.list = this.avtRoute.snapshot.paramMap.get('getCategoryDataList');
    // console.log('catData list', this.list);
  }

  ngOnInit() {
    this.getCategoryList();
  }

  async getCategoryList() {
    this.getCategoryDataList = await this.getData.getFromFirebase('category');
    console.log('getCategoryDataList === ', this.getCategoryDataList);
  }

  addCategory(categoryForm: any) {
    const catValue = categoryForm.value;
    console.log('Add Category', categoryForm.value);

    const collectionInstance = collection(this.firestore, 'category');
    addDoc(collectionInstance, categoryForm.value)
      .then(() => {
        // alert('Data Sent Secessfully');
        console.log('categoryForm.value === ', catValue);
        this.getData.myEventEmitter.emit(catValue);
      })
      .catch((error) => {
        alert(error);
      });
  }

  async navigateToCategory() {
    await this.route.navigateByUrl('/category', { skipLocationChange: true });
    this.getCategoryList();
    this.location.replaceState('/category');
  }

  // closeModal() {
  //   this.modalCtrl.dismiss();
  // }
}
