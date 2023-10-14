import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-update-cat-modal',
  templateUrl: './update-cat-modal.component.html',
  styleUrls: ['./update-cat-modal.component.scss'],
})
export class UpdateCatModalComponent implements OnInit {
  catData: any = {};
  updatedIndex: number = -1; // Initialize as a number
  updatedIndexString: string = ''; // To store the string index

  constructor(
    private firestore: Firestore,
    private modalCntrl: ModalController,
    private navParams: NavParams
  ) {
    this.catData = this.navParams.get('singleCatData');
    console.log('catData', this.catData);
  }

  ngOnInit() {}

  closeModal() {
    this.modalCntrl.dismiss(this.catData);
  }

  // updateCategory(data: any) {
  //   console.log('id=', data);
  //   const docInstance = doc(this.firestore, 'category', data.id);

  //   const updateData = {
  //     category_name: data.category_name,
  //     category_description: data.category_description,
  //     type: data.type,
  //   };
  //   let updatedIndex = -1;
  //   this.catData.forEach((e: any, i: any) => {
  //     if (e.id == data.id) {
  //       updatedIndex = i;
  //     }
  //   });

  //   updateDoc(docInstance, updateData)
  //     .then(() => {
  //       console.log(`updated`);
  //       if (updatedIndex >= 0) {
  //         this.catData[updatedIndex] = updateData;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(`Error updating document: ${err}`);
  //     });
  // }

  updateCategory(data: any) {
    console.log('id=', data);
    const docInstance = doc(this.firestore, 'category', data.id);

    const updateData = {
      category_name: data.category_name,
      category_description: data.category_description,
      type: data.type,
    };

    this.updatedIndex = -1;
    this.updatedIndexString = ''; // Initialize the string index

    // Iterate over the properties of this.catData object
    for (const key in this.catData) {
      if (this.catData.hasOwnProperty(key)) {
        const item = this.catData[key];
        // console.log('item',item);
        
        if (item.id == data.id) {
          this.updatedIndexString = key;
          this.updatedIndex = parseInt(key, 10); // Convert the string to a number
          break; // Found the item, no need to continue iterating
        }
      }
    }

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log(`updated`);
        if (this.updatedIndex >= 0) {
          // Update the item in the this.catData object
          this.catData[this.updatedIndexString] = updateData;
        }
        this.closeModal()
      })
      .catch((err) => {
        console.log(`Error updating document: ${err}`);
      });
  }
}
