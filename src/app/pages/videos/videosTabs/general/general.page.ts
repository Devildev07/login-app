import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { generate } from 'rxjs';
import { CommonServiceService } from 'src/app/common-service.service';

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
  constructor(
    public actRoute: ActivatedRoute,
    public afStorage: AngularFireStorage,
    public CommonService: CommonServiceService
  ) {
    this.CommonService.userCurrentTab = 'general';
  }

  ngOnInit() {
    this.actRoute.queryParams.subscribe((params: any) => {
      console.log('params===', params);
      this.getAllGeneralData();
      // if (params.downloadURL && params.fileFormat) {
      //   this.downloadURL = params.downloadURL;
      //   this.fileFormat = params.fileFormat;
      //   this.uploadedFiles.push({
      //     downloadURL: this.downloadURL,
      //     fileFormat: this.fileFormat,
      //     // Add other file details as needed
      //   });
      //   // Use downloadURL and fileFormat to display file details on the destination page
      //   console.log(`Download URL: ${this.downloadURL}`);
      //   console.log(`File Format: ${this.fileFormat}`);
      // } else {
      //   console.error('Missing parameters');
      // }
    });
  }

  getAllGeneralData() {
    this.uploadedFiles = [];
    this.CommonService.generalCount = this.uploadedFiles.length;
    const storageRef = this.afStorage.ref(
      '/uploads/' + this.CommonService.userCurrentTab
    );
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

                // Create an object with file name, download URL, and format
                const file = {
                  name: item.name,
                  downloadURL: url,
                  fileFormat: format,
                };

                this.uploadedFiles.push(file);
                this.CommonService.generalCount = this.uploadedFiles.length;
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
}
