import { Component, OnInit } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.page.html',
  styleUrls: ['./add-videos.page.scss'],
})
export class AddVideosPage implements OnInit {
  selectedFile: File | null = null;
  uploadedFilePath?: string;
  task: AngularFireUploadTask | null = null; // Track the upload task
  uploadProgress:number | any = 0; // Track upload progress
  fileFormat: 'image' | 'video' | 'unknown' = 'unknown'; 

  constructor(private commonService: CommonServiceService) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  async uploadFile() {
    if (this.selectedFile) {
      const filePath = 'uploads/' + this.selectedFile.name;

      const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();

    // Determine the file format based on its extension
    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
      this.fileFormat = 'image';
    } else if (fileExtension === 'mp4' || fileExtension === 'avi' || fileExtension === 'mov') {
      this.fileFormat = 'video';
    } else {
      this.fileFormat = 'unknown';
    }

      // Start the upload task
      const uploadTask = this.commonService.uploadFile(
        this.selectedFile,
        filePath
      );

      // Track the upload progress (if needed)
      uploadTask.percentageChanges().subscribe((percentage) => {
        this.uploadProgress = percentage; // Update the progress bar
      });

      // Wait for the upload to complete
      await uploadTask;

      // Retrieve the download URL
      const downloadURL = await this.commonService.getDownloadURL(filePath);
      this.uploadedFilePath = downloadURL;
      console.log(`downloadURL: ${downloadURL}`);

      // Redirect to the page where you want to display file information
      // Pass the downloadURL to the other page or store it in a service for later retrieval.
    } else {
      alert('Please selecte a file');
    }
  }
}
