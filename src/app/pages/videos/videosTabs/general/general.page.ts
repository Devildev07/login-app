import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  downloadURL?: string;
  fileFormat?: string;
  uploadedFiles: any[] = [];

  constructor(
    public actRoute: ActivatedRoute,
    public afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.actRoute.queryParams.subscribe((params: any) => {
      if (params.downloadURL && params.fileFormat) {
        this.downloadURL = params.downloadURL;
        this.fileFormat = params.fileFormat;

        this.uploadedFiles.push({
          downloadURL: this.downloadURL,
          fileFormat: this.fileFormat,
          // Add other file details as needed
        });

        // Use downloadURL and fileFormat to display file details on the destination page
        console.log(`Download URL: ${this.downloadURL}`);
        console.log(`File Format: ${this.fileFormat}`);
      } else {
        console.error('Missing parameters');
      }
    });
  }

  deleteFile(index: number, downloadURL: string) {
    // const fileToDelete = this.uploadedFiles[index];
    // if (!fileToDelete) {
    //   return;
    // }

    // Convert the downloadURL to a reference
    const storageRef = this.afStorage.refFromURL(downloadURL);

    // Delete the file
    storageRef.delete().subscribe(
      () => {
        console.log('File deleted successfully');
        // this.uploadedFiles.splice(index, 1);
        // console.log('files', this.uploadedFiles);
      },
      (error) => {
        // Handle any errors
        console.error('Error deleting file:', error);
      }
    );
  }


  }
