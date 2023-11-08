import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { ModalController } from '@ionic/angular';
import { ModalCategoryPage } from 'src/app/pages/modal-category/modal-category.page';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
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
    this.CommonService.userCurrentTab = 'doctor';
    // this.getAllDocData();
    this.CommonService.searchText = '';
  }

  ngOnInit() {
    console.log('params===1');
    this.actRoute.queryParams.subscribe((params: any) => {
      console.log('params===', params);
      this.getAllDocData();
    });
  }

  getAllDocData() {
    this.uploadedFiles = [];
    this.CommonService.doctorCount = this.uploadedFiles.length;
    const storageRef = this.afStorage.ref('/uploads/doctor/');
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
                // Determine the file format based on the contentType
                const format = this.getFileFormat(metadata.contentType);
                // Extract the custom category metadata
                const category = metadata.customMetadata
                  ? metadata.customMetadata['category'] || 'Uncategorized'
                  : 'Uncategorized';

                const video = document.createElement('video');
                video.src = url;

                // Add an event listener to get the duration when metadata is loaded
                video.addEventListener('loadedmetadata', () => {
                  // Get the duration in seconds
                  const duration = Math.round(video.duration);

                  // Create an object with file name, download URL, and format
                  const file = {
                    name: item.name,
                    downloadURL: url,
                    fileFormat: format,
                    duration: duration,
                    category: category,
                  };

                  this.uploadedFiles.push(file);
                  this.CommonService.doctorCount = this.uploadedFiles.length;
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
        this.getAllDocData();
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

  async editInfo(video: any) {
    console.log("video === ", video);
    const modal = await this.modalController.create({
      component: ModalCategoryPage,

    });
    modal.onDidDismiss().then((data: any) => {
      console.log("data === ", data);
      if (data.role == 'save') {
        const selectedCategory = data.data.category_name;
        const filePath = '/uploads/doctor/' + video.name;
        console.log("filePath === ", filePath);
        this.updateFileMetadata(filePath, selectedCategory);
      }
    })

    modal.present();
  }

  async getCategoryList() {
    this.getCategoryDataList = await this.getData.getFromFirebase('category');
    console.log('getCategoryDataList === ', this.getCategoryDataList);
  }

  async updateFileMetadata(filePath: string, categoryId: any): Promise<void> {
    const storageRef = this.afStorage.ref(filePath);
    const newMetadata = {
      customMetadata: {
        category: categoryId,
        updateby: 'admin',
      }
    };
    try {
      await storageRef.updateMetadata(newMetadata)
        .toPromise();
      console.log('Metadata updated successfully');
    } catch (error) {
      console.error('Error updating metadata:', error);
      throw error;
    }
  }
}
