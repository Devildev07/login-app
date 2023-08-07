import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(public authService: AuthService, public route: Router) { }

  ngOnInit() {
  }

  async logOut(){
    this.authService.signOut().then(()=>{
      this.route.navigate(['/login'])
    })
  }

}
