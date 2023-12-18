import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleMapAutocompleteServiceService {
  constructor() {}

  autocompleteService = new google.maps.places.AutocompleteService();

  getPlacePredictions(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions(
        { input: query },
        (predictions: any[], status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(predictions);
          } else {
            resolve([]);
          }
        }
      );
    });
  }
}
