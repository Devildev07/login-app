import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  public results: any;

  constructor(
    public common: CommonServiceService,
    public authService: AuthService
  ) {
    this.common.searchText = '';
  }

  ngOnInit() {
    this.common.searchText = '';
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.common.searchText = query;
  }

  onClear() {
    this.results = [];
  }
}
