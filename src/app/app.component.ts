import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( public authService: AuthService, public route: Router) {}
  async logOut(){
    this.authService.signOut().then(()=>{
       this.authService.isUserLogin = false;
      this.route.navigate(['/login'])
    })
  }
}
