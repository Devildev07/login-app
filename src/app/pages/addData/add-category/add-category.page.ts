import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { ModalController, NavParams } from '@ionic/angular';

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


  constructor(
    private firestore: Firestore,
    public getData: GetDataService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
  ) {
    // this.list = this.navParams.get('getCategoryData');
    // console.log('catData list', this.list);
  }

  ngOnInit() { }

  addCategory(categoryForm: any) {
    console.log('Add Category', categoryForm.value);

    const collectionInstance = collection(this.firestore, 'category');
    addDoc(collectionInstance, categoryForm.value)
      .then(() => {
        alert('Data Sent Secessfully');
        this.getData.myEventEmitter.emit(categoryForm.value);
      })
      .catch((error) => {
        alert(error);
      });
  }

  // closeModal() {
  //   this.modalCtrl.dismiss();
  // }
}
