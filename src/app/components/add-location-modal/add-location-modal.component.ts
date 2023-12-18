import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { GetDataService } from 'src/app/otherServices/get-data.service';
import { GoogleMapAutocompleteServiceService } from 'src/app/otherServices/google-map-autocomplete-service.service';


@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss'],
})
export class AddLocationModalComponent implements OnInit {
  getCategoryDataList: any;
  predictions: any[] = [];
  selectedPlace: any;

  constructor(
    public modalCntrl: ModalController,
    public firestore: Firestore,
    public getData: GetDataService,
    public googleMapService: GoogleMapAutocompleteServiceService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  onInput(event: any) {
    const query = event.target.value;
    this.googleMapService.getPlacePredictions(query).then((predictions) => {
      this.predictions  = predictions;
    });
  }
  selectPlace(prediction: any) {
    // Handle the selected place
    this.selectedPlace = prediction;
    console.log('Selected Place:', this.selectedPlace);
  }

  closeModal() {
    this.modalCntrl.dismiss();
  }

  async getCategories() {
    this.getCategoryDataList = await this.getData.getFromFirebase('category');
    console.log('getCategoryDataList === ', this.getCategoryDataList);
  }

  addLocation(addLocationForm: any) {
    const formData = addLocationForm.value;
    console.log('Add Location', addLocationForm.value);

    this.closeModal();
  }
}
