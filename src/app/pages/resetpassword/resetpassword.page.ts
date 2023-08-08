import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  resetForm: FormGroup | any;
  email: string | any;
  constructor(public authService: AuthService, public route: Router,
    public formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
   
    });
  }

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
