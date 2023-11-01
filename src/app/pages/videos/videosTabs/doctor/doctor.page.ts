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
}
