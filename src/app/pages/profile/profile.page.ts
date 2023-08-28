import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  searchTxt: any = '';
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  // public data = [this.authService.userEmail, 'mohit', 'test']
  // public results: any = [];

  // handleInput(event: any) {
  //   const query = event.target.value.toLowerCase();
  //   this.results = this.data.filter((item: any) => item.toLowerCase().indexOf(query) > -1);
  // }

  // onClear() {
  //   this.results = [];
  // }
}
