import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm: FormGroup | any;
  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?!.*(.)\\1{1})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$'
          ),
        ],
      ],
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.regForm?.valid) {
      const user = await this.authService
        .registerUser(this.regForm.value.email, this.regForm.value.password)
        .catch((error) => {
          console.log(error);
          loading.dismiss();
        });

      if (user) {
        loading.dismiss();
        this.router.navigate(['/login']);
      } else {
        console.log('provide correct value');
      }
    }
    console.log('button clicked');
  }
}
