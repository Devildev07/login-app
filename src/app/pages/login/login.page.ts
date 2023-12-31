import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup | any;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public commonn: CommonServiceService,
    public getpassService: CommonServiceService,
    public router: Router
  ) {
    if (this.authService.isUserLogin == true) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
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
    return this.loginForm?.controls;
  }

  async logIn() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      this.loginForm.value.password = btoa(this.loginForm.value.password);
      // this.loginForm.value.password =  this.getpassService.encryptPass(this.loginForm.value.password);
      const user = await this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .catch((error) => {
          console.log(error);
          loading.dismiss();
        });
      // console.log('useruuuu', user);

      if (user) {
        const data = { isUserLogin: true, user: user };
        console.log('data === ', data);
        this.commonn.setItem('userData', data);
        this.authService.isUserLogin = true;
        this.authService.userEmail = data.user.user?.email;
        loading.dismiss();
        this.router.navigate(['/profile']);
      } else {
        this.authService.isUserLogin = false;
        console.log('provide correct value');
      }
    }
  }
}
