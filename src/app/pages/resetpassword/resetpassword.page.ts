import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  email: string | any;
  constructor(public authService: AuthService, public route: Router) {}

  ngOnInit() {}

  async resetPass() {
    this.authService
      .resetPass(this.email)
      .then(() => {
        console.log('reset link send');

        this.route.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
