import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalController } from '@ionic/angular';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';


@Component({
  selector: 'app-general-video-modal',
  templateUrl: './general-video-modal.component.html',
  styleUrls: ['./general-video-modal.component.scss'],
})
export class GeneralVideoModalComponent implements OnInit {
  @Input() uploadedFiles: any[] = [];
  // uploadedFiles: any[] = [];

  constructor(private modalController: ModalController,
    public getData: GetDataService,
    public CommonService: CommonServiceService,
    public afStorage: AngularFireStorage,) { }

  ngOnInit() {
    this.getAllGeneralData();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  selectVideos() {
    const selectedVideos = this.uploadedFiles.filter((video: any) => video.selected);
    this.modalController.dismiss(selectedVideos);
    console.log('selectedVideos === ', selectedVideos);
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

}
