import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { GetDataService } from 'src/app/otherServices/get-data.service';
// import { GoogleMapAutocompleteServiceService } from 'src/app/otherServices/google-map-autocomplete-service.service';

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss'],
})
export class AddLocationModalComponent implements OnInit {
  getCategoryDataList: any;
  predictions: any[] = [];

  startTime: any;
  endTime: any;
  selectedDays: string[] = [];
  slots: any[] = [];

  // selectedPlace: any;
  // Address: any = '';

  constructor(
    public modalCntrl: ModalController,
    public firestore: Firestore,
    public getData: GetDataService // public googleMapService: GoogleMapAutocompleteServiceService
  ) {}

  ngOnInit() {
    this.getCategories();
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

  timeSelectionChange(event: CustomEvent | any, dateType: 'start' | 'end') {
    // Access the selected date from the event
    const selectedDate = event.detail.value;

    // Determine whether it's for the start or end date and update accordingly
    if (dateType === 'start') {
      this.startTime = selectedDate.slice(selectedDate.indexOf('T') + 1);
      console.log('Start Date:', this.startTime);
    } else if (dateType === 'end') {
      this.endTime = selectedDate.slice(selectedDate.indexOf('T') + 1);
      console.log('End Date:', this.endTime);
    }
  }

  // onDaysChange() {
  //   // Update slots based on selected days
  //   if (this.selectedDays.length > 0) {
  //     // Create a slot for each selected day
  //     this.slots = this.selectedDays.map((day) => ({
  //       day,
  //       startTime: '',
  //       endTime: '',
  //     }));
  //   } else {
  //     // Clear slots if no days are selected
  //     this.slots = [];
  //   }
  // }

  addSlot() {
    this.slots.push({
      day: '',
      startTime: '',
      endTime: '',
    });
  }
  removeSlot(index: number) {
    this.slots.splice(index, 1);
  }

  // onInput(event: any) {
  //   const query = event.target.value;
  //   this.googleMapService.getPlacePredictions(query).then((predictions) => {
  //     this.predictions = predictions;
  //     console.log('Predictions:', predictions);
  //   });
  // }
  // selectPlace(prediction: any) {
  //   // Handle the selected place
  //   this.selectedPlace = prediction;
  //   console.log('Selected Place:', this.selectedPlace);
  // }

  // ionViewWillEnter() {
  //   let input: any = document
  //     .getElementById('googleLocations')
  //     ?.getElementsByTagName('input')[0];
  //   if (input) {
  //     let autocomplete = new google.maps.places.Autocomplete(input, {
  //       types: ['geocode'],
  //       componentRestrictions: { country: 'in' },
  //     });
  //     google.maps.event.addListener(autocomplete, 'place_changed', () => {
  //       // retrieve the place object for your use
  //       let place = autocomplete.getPlace();
  //       this.Address = place.formatted_address;
  //       if (place.address_components) {
  //         place.address_components.forEach((component: any) => {
  //           // switch (component.types[0]) {
  //           //   case 'street_number':
  //           //     // Address1: Street number
  //           //     this.Address1 = component.long_name;
  //           //     break;
  //           //   case 'route':
  //           //     // Address2: Route
  //           //     this.Address1 += ' ' + component.long_name;
  //           //     break;
  //           //   case 'locality':
  //           //     // City: Locality
  //           //     this.City = component.long_name;
  //           //     break;
  //           //   case 'administrative_area_level_1':
  //           //     // State: Administrative area level 1
  //           //     this.State = component.long_name;
  //           //     break;
  //           //   case 'postal_code':
  //           //     // Zip: Postal code
  //           //     this.Zip = component.long_name;
  //           //     break;
  //           //   // Add more cases as needed for other components
  //           // }
  //           console.log('comp==', component.types[0]);
  //         });
  //       }
  //     });
  //   }
  // }
}
