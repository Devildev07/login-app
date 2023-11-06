import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { ModalController } from '@ionic/angular';
import { ModalCategoryPage } from 'src/app/pages/modal-category/modal-category.page';



@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  downloadURL?: string;
  fileFormat?: string;
  uploadedFiles: any[] = [];
  files: any[] = [];
  getCategoryDataList: any;
  selectedVideo: any = {};

  constructor(
    public actRoute: ActivatedRoute,
    public getData: GetDataService,
    public afStorage: AngularFireStorage,
    public CommonService: CommonServiceService,
    public modalController: ModalController
  ) {
    this.CommonService.userCurrentTab = 'general';
    this.CommonService.searchText = '';
  }

  ngOnInit() {
    this.actRoute.queryParams.subscribe((params: any) => {
      console.log('params===', params);
      this.getAllGeneralData();
    });
    this.getCategoryList();
  }

  getAllGeneralData() {
    this.uploadedFiles = [];
    this.CommonService.generalCount = this.uploadedFiles.length;
    const storageRef = this.afStorage.ref('/uploads/general/');
    console.log('storageRef', storageRef);

    // List all files in the 'uploads' folder
    storageRef.listAll().subscribe(
      (result) => {
        result.items.forEach((item) => {
          item.getDownloadURL().then((url) => {
            // Get the metadata for the file
            item
              .getMetadata()
              .then((metadata) => {
                console.log("metadata === ", metadata.customMetadata);
                // Determine the file format based on the contentType
                const format = this.getFileFormat(metadata.contentType);

                // Extract the custom category metadata
                const category = metadata.customMetadata
                  ? metadata.customMetadata['category'] || 'Uncategorized'
                  : 'Uncategorized';

                // Create an HTML video element to get the duration
                const video = document.createElement('video');
                video.src = url;

                // Add an event listener to get the duration when metadata is loaded
                video.addEventListener('loadedmetadata', () => {
                  // Get the duration in seconds
                  const duration = Math.round(video.duration);

                  // Create an object with file name, download URL, format, duration, and category
                  const file = {
                    name: item.name,
                    downloadURL: url,
                    fileFormat: format,
                    duration: duration,
                    category: category,
                  };

                  this.uploadedFiles.push(file);
                  this.CommonService.generalCount = this.uploadedFiles.length;
                });

                // Load the video to trigger the 'loadedmetadata' event
                video.load();
              })
              .catch((error) => {
                console.error('Error getting metadata:', error);
              });
          });
        });
      },
      (error) => {
        console.error('Error listing files:', error);
      }
    );
  }

  deleteFile(downloadURL: string) {
    // Convert the downloadURL to a reference
    const storageRef = this.afStorage.refFromURL(downloadURL);

    // Delete the file
    storageRef.delete().subscribe(
      () => {
        console.log('File deleted successfully');
        this.getAllGeneralData();
      },
      (error) => {
        // Handle any errors
        console.error('Error deleting file:', error);
      }
    );
  }

  getFileFormat(contentType: any): string {
    if (contentType.startsWith('image')) {
      return 'image';
    } else if (contentType.startsWith('video')) {
      return 'video';
    } else {
      return 'other';
    }
  }

  updateFileMetadata(filePath: string, categoryId: any): Promise<void> {
    const storageRef = this.afStorage.ref(filePath);
    const newMetadata = {
      customMetadata: {
        category: categoryId,
        updateby: 'admin',
      }
    };
    return storageRef.updateMetadata(newMetadata)
      .toPromise()
      .then(() => {
        console.log('Metadata updated successfully');
      })
      .catch((error) => {
        console.error('Error updating metadata:', error);
        throw error;
      });
  }
  async getCategoryList() {
    this.getCategoryDataList = await this.getData.getFromFirebase('category');
    console.log('getCategoryDataList === ', this.getCategoryDataList);
  }


  async editInfo(video: any) {
    console.log("video === ", video);
    const modal = await this.modalController.create({
      component: ModalCategoryPage,

    });
    modal.onDidDismiss().then((data: any) => {
      console.log("data === ", data);
      if (data.role == 'save') {
        const selectedCategory = data.data.category_name;
        const filePath = '/uploads/general/' + video.name;
        console.log("filePath === ", filePath);
        this.updateFileMetadata(filePath, selectedCategory);
      }
    })

    modal.present();
  }

  // commented code
  // getAllGeneralData() {
  //   this.uploadedFiles = [];
  //   this.CommonService.generalCount = this.uploadedFiles.length;
  //   const storageRef = this.afStorage.ref('/uploads/general/');
  //   console.log('storageRef', storageRef);

  //   // List all files in the 'uploads' folder
  //   storageRef.listAll().subscribe(
  //     (result) => {
  //       result.items.forEach((item) => {
  //         item.getDownloadURL().then((url) => {
  //           // Get the metadata for the file
  //           item
  //             .getMetadata()
  //             .then((metadata) => {
  //               // Determine the file format based on the contentType
  //               const format = this.getFileFormat(metadata.contentType);

  //               // Create an HTML video element to get the duration
  //               const video = document.createElement('video');
  //               video.src = url;
  //               // console.log(`video${video.duration}`);

  //               // Add an event listener to get the duration when metadata is loaded
  //               video.addEventListener('loadedmetadata', () => {
  //                 // Get the duration in seconds
  //                 const duration = Math.round(video.duration);

  //                 // Create an object with file name, download URL, format, and duration
  //                 const file = {
  //                   name: item.name,
  //                   downloadURL: url,
  //                   fileFormat: format,
  //                   duration: duration, // Store the duration here
  //                 };

  //                 this.uploadedFiles.push(file);
  //                 this.CommonService.generalCount = this.uploadedFiles.length;
  //               });

  //               // Load the video to trigger the 'loadedmetadata' event
  //               video.load();
  //             })
  //             .catch((error) => {
  //               console.error('Error getting metadata:', error);
  //             });
  //         });
  //       });
  //     },
  //     (error) => {
  //       console.error('Error listing files:', error);
  //     }
  //   );
  // }
}
