import { TestBed } from '@angular/core/testing';

import { GoogleMapAutocompleteServiceService } from './google-map-autocomplete-service.service';

describe('GoogleMapAutocompleteServiceService', () => {
  let service: GoogleMapAutocompleteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapAutocompleteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
