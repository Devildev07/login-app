import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
    public route: Router,
    private alertController: AlertController
  ) {
    this.common.searchText = '';
    this.getCategory();
    this.getDatas.myEventEmitter.subscribe((Data) => {
      // this.getCategory();
      this.getCategoryData.push(Data);
      console.log('Received event with Data:', Data);
    });
  }

  async ngOnInit(): Promise<void> {
    this.getCategory();
    this.common.searchText = '';
  }

  async getCategory(): Promise<void> {
    try {
      this.getCategoryData = await this.getDatas.getFromFirebase('category');
      console.log('Category Data from Firebase:', this.getCategoryData);
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

  // Function to build the hierarchical category tree
  buildCategoryTree(getCategoryData: any[]): any[] {
    const categoryMap = new Map<string, any>();
    const roots: any[] = [];

    getCategoryData.forEach((category) => {
      // Convert parent_id to string
      const parentID = category.parent_id || '';
      categoryMap.set(category.id, { ...category, children: [] });
    });

    getCategoryData.forEach((category) => {
      // Convert parent_id to string
      const parentID = category.parent_id || '';

      if (!parentID) {
        const root = categoryMap.get(category.id);
        roots.push(root);
        console.log('Root Level:', root);
      } else {
        const parent = categoryMap.get(parentID);
        if (parent) {
          parent.children.push(categoryMap.get(category.id));
          console.log('Child Level:', categoryMap.get(category.id));
        } else {
          // Handle case where parent is not found (optional)
          console.error(
            `Parent with ID ${parentID} not found for category with ID ${category.id}`
          );
        }
      }
    });

    return roots;
  }

  // buildCategoryTree(getCategoryData: any[]): any[] {
  //   const categoryMap = new Map<number, any>();
  //   const roots: any[] = [];

  //   getCategoryData.forEach((category) => {
  //     categoryMap.set(category.id, category);
  //   });

  //   getCategoryData.forEach((category) => {
  //     if (category.parent_id !== null || category.parent_id != '') {
  //       const parent = categoryMap.get(category.parent_id);

  //       if (parent != undefined) {
  //         if (!parent.children) {
  //           parent.children = [];
  //         }
  //         parent.children.push(category);
  //         console.log('enter into child level ', category);
  //       }
  //     }
  //     if (!category.parent_id) {
  //       roots.push(category);
  //       console.log('enter into root level ', category);
  //     }
  //   });

  //   console.log('roots === ', roots);
  //   return roots;
  // }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.common.searchText = query;
  }

  onClear() {
    this.results = [];
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

  // Function to show delete-popup
  async deleteCat(id: string, categoryName: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete the category "${categoryName}"? This will also delete all its children.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Delete',
          handler: async () => {
            if (this.hierarchicalCategories) {
              const children = this.getDescendants(
                id,
                this.hierarchicalCategories
              );
              if (children.length > 0) {
                this.showUpdateParentPopup(id, children);
              } else {
                await this.performDelete(id, '');
              }
            } else {
              await this.performDelete(id, '');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // showUpdateParentPopup(parentId: string, children: any[]) {
  //   this.alertController
  //     .create({
  //       header: 'Select New Parent',
  //       inputs: this.hierarchicalCategories
  //         .filter((category: any) => category.id !== parentId)
  //         .map((category: any) => ({
  //           type: 'radio',
  //           label: category.category_name,
  //           value: category.id,
  //         })),
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //         },
  //         {
  //           text: 'Move',
  //           handler: async (selectedParentId) => {
  //             // Get the selected parent
  //             const selectedParent = this.hierarchicalCategories.find(
  //               (category: any) => category.id === selectedParentId
  //             );

  //             // Update the parent_id for all children
  //             this.updateParentIdForChildren(children, selectedParentId);

  //             // Add the children to the selected parent's children
  //             selectedParent.children = [
  //               ...(selectedParent.children || []),
  //               ...children,
  //             ];

  //             // Remove the children from the original parent's children
  //             const originalParent = this.hierarchicalCategories.find(
  //               (category: any) => category.id === parentId
  //             );
  //             originalParent.children = (originalParent.children || []).filter(
  //               (child: any) => !children.find((c) => c.id === child.id)
  //             );

  //             // Perform the delete operation
  //             await this.performDelete(parentId);
  //           },
  //         },
  //       ],
  //     })
  //     .then((alert) => alert.present());
  // }

  async showUpdateParentPopup(parentId: string, children: any[]) {
    const alert = await this.alertController.create({
      header: 'Select New Parent',
      inputs: this.hierarchicalCategories
        .filter((category: any) => category.id !== parentId)
        .map((category: any) => ({
          type: 'radio',
          label: category.category_name,
          value: category.id,
        })),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Move',
          handler: async (selectedParentId) => {
            // Get the selected parent
            const selectedParent = this.hierarchicalCategories.find(
              (category: any) => category.id === selectedParentId
            );

            // Update the parent_id for all children
            this.updateParentIdForChildren(children, selectedParentId);

            // Add the children to the selected parent's children
            selectedParent.children = [
              ...(selectedParent.children || []),
              ...children,
            ];

            // Remove the children from the original parent's children
            const originalParent = this.hierarchicalCategories.find(
              (category: any) => category.id === parentId
            );
            originalParent.children = (originalParent.children || []).filter(
              (child: any) => !children.find((c) => c.id === child.id)
            );

            // Set the new parent ID
            const newParentId = selectedParentId;

            // Perform the delete operation
            await this.performDelete(parentId, newParentId);
          },
        },
      ],
    });

    await alert.present();
  }

  // Function to update parent_id for children
  updateParentIdForChildren(children: any[], newParentId: string) {
    children.forEach((child) => {
      child.parent_id = newParentId;
      // Update the parent_id in your database (implement your logic here)
      // Example: this.updateParentIdInDatabase(child.id, newParentId);
    });
  }

  // Function to perform category deletion
  async performDelete(id: string, newParentId: string) {
    const docInstance = doc(this.firestore, 'category', id);

    // Get the children of the category being deleted
    const children = this.getDescendants(id, this.hierarchicalCategories);

    // Find a new parent for the children (use the provided newParentId)
    const updatedNewParentId = newParentId;

    // Update parent_id for children
    this.updateParentIdForChildren(children, updatedNewParentId);

    // Delete the category
    try {
      await deleteDoc(docInstance);
      console.log('deleted');
      this.getCategory();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  }

  // Function to get descendants of a category
  getDescendants(parentId: string, categories: any[]): any[] {
    const descendants: any[] = [];
    const findDescendants = (parent: any) => {
      if (parent.children && parent.children.length > 0) {
        parent.children.forEach((child: any) => {
          descendants.push(child);
          findDescendants(child);
        });
      }
    };

    const parent = categories.find((category) => category.id === parentId);
    if (parent) {
      findDescendants(parent);
    }

    return descendants;
  }

  // commented code
  // deleteCat(id: string) {
  //   const docInstance = doc(this.firestore, 'category', id);
  //   deleteDoc(docInstance)
  //     .then(() => {
  //       console.log('deleted');
  //       this.getCategory();
  //     })
  //     .catch((err) => {
  //       console.log('not deleted', err);
  //     });
  // }

  // async deleteCat(id: string, categoryName: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm Delete',
  //     message: `Are you sure you want to delete the category "${categoryName}"? This will also delete all its children.`,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         },
  //       },
  //       {
  //         text: 'Delete',
  //         handler: () => {
  //           if (this.hierarchicalCategories) {
  //             const children = this.getDescendants(
  //               id,
  //               this.hierarchicalCategories
  //             );
  //             if (children.length > 0) {
  //               this.showUpdateParentPopup(children);
  //             } else {
  //               this.performDelete(id);
  //             }
  //           } else {
  //             this.performDelete(id);
  //           }
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  // showUpdateParentPopup(children: any[]) {
  //   this.alertController
  //     .create({
  //       header: 'Select New Parent',
  //       inputs: children.map((child) => ({
  //         type: 'radio',
  //         label: child.category_name,
  //         value: child.id,
  //       })),
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //         },
  //         {
  //           text: 'Update',
  //           handler: (selectedParentId) => {
  //             // Update the parent_id for all children
  //             this.updateParentIdForChildren(children, selectedParentId);

  //             // Perform the delete operation
  //             this.performDelete(selectedParentId);
  //           },
  //         },
  //       ],
  //     })
  //     .then((alert) => alert.present());
  // }

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
}
