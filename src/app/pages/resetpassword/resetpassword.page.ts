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
  constructor(
    public authService: AuthService,
    public route: Router,
    public formBuilder: FormBuilder
  ) {}

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
    if (this.resetForm.valid) {
      // Get all form values
      const formValues = this.resetForm.value;
      console.log('Form Values:', formValues);
      this.email = formValues['email'];
      console.log('this.email', this.email);
      this.authService
        .resetPass(this.email)
        .then(() => {
          console.log('reset link send');

          if (this.authService.isUserLogin === true) {
            this.route.navigate(['/profile']);
          } else {
            this.route.navigate(['/login']);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(`Error occurs while sending link ${error}`);
        });
      // Now, you can access formValues.email to get the email value if needed.
    } else {
      // Handle form validation errors
      console.log('Form is invalid.');
    }
  }
}
