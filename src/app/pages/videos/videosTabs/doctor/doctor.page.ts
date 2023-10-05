import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';


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
  constructor(
    public actRoute: ActivatedRoute,
    public afStorage: AngularFireStorage,
    public CommonService: CommonServiceService
  ) {
    const storageRef = afStorage.ref('/uploads/'+ CommonService.userCurrentTab);
    console.log('storageRef', storageRef);
    console.log('storageRef', storageRef.list.length);

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

  ngOnInit() {}

  deleteFile(downloadURL: string) {
    // Convert the downloadURL to a reference
    const storageRef = this.afStorage.refFromURL(downloadURL);

    // Delete the file
    storageRef.delete().subscribe(
      () => {
        console.log('File deleted successfully');
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
