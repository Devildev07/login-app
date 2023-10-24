import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { UpdateCatModalComponent } from 'src/app/components/update-cat-modal/update-cat-modal.component';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  public results: any;
  getCategoryData: any;
  totalCatLength: any;
  hierarchicalCategories: any = [];

  constructor(
    private firestore: Firestore,
    public authService: AuthService,
    public common: CommonServiceService,
    public getDatas: GetDataService,
    public modalCntrl: ModalController,
    public route: Router
  ) {
    this.common.searchText = '';
    this.getCategory();
    this.getDatas.myEventEmitter.subscribe((Data) => {
      // this.getCategory();
      this.getCategoryData.push(Data);
      console.log('Received event with Data:', Data);
    });
  }

  ngOnInit() {
    this.getCategory();
    this.common.searchText = '';
  }

  // async getCategory() {
  //   this.getCategoryData = await this.getDatas.getFromFirebase('category');
  //   console.log('getCategoryData === ', this.getCategoryData);

  //   this.hierarchicalCategories = this.buildCategoryTree(this.getCategoryData);
  //   console.log('hierarchicalCategories', this.hierarchicalCategories);

  //   this.totalCatLength = this.getCategoryData.length;
  // }

  async getCategory() {
    try {
      this.getCategoryData = await this.getDatas.getFromFirebase('category');
      console.log('Category Data from Firebase:', this.getCategoryData);
      console.log("this.getCategoryData 111=== ", this.getCategoryData);
      if (this.getCategoryData && this.getCategoryData.length > 0) {
        this.hierarchicalCategories = this.buildCategoryTree(
          this.getCategoryData
        );
        console.log('Hierarchical Categories:', this.hierarchicalCategories);
      } else {
        console.log('No category data found or data is empty.');
      }

      this.totalCatLength = this.getCategoryData.length;
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  }

  buildCategoryTree(getCategoryData: any[]): any[] {
    const categoryMap = new Map<number, any>();
    const roots: any[] = [];

    getCategoryData.forEach((category) => {
      categoryMap.set(category.id, category);
    });
    console.log("categoryMap === ", getCategoryData)
    getCategoryData.forEach((category) => {
      // console.log(" itemcategory === ", category);
      if (category.parent_id !== null) {
        const parent = categoryMap.get(category.parent_id);
        // console.log('parent', parent);

        if (parent != undefined) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(category);
          roots.push(parent);
        }
      } else {
        roots.push(category);
      }
    });
    // console.log("roots === ", roots);
    return roots;
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.common.searchText = query;
  }

  onClear() {
    this.results = [];
  }

  // async openAddCategoryModal() {
  //   const modal = await this.modalCntrl.create({
  //     component: AddCategoryPage,
  //     componentProps: { getCategoryData: this.getCategoryData },
  //     backdropDismiss: true, // Set to false if you don't want users to close the modal by clicking outside
  //     cssClass: 'Category-modal', // You can add a CSS class for custom styling
  //   });

  //   modal.onDidDismiss().then(() => {
  //     console.log("getCategory 123=== ", this.getCategoryData);
  //     // this.getCategory();
  //     this.route.navigate(['/locations']);
  //   });

  //   await modal.present();
  // }

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

  getIndentationLevel(parent_id: number | null): any[] {
    const indentationLevel = [];
    let parentId = parent_id;

    while (parentId !== null) {
      indentationLevel.push({});
      parentId = this.getParentId(parentId);
    }

    return indentationLevel;
  }

  getParentId(id: number): number | null {
    const collection = this.getCategoryData.find((item: any) => item.id === id);
    return collection ? collection.parent_id : null;
  }
}
