import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/otherServices/admin-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  adminData: any[] = [];

  constructor(public adminDataService: AdminServiceService) {}

  ngOnInit() {
   this.adminData = this.adminDataService.getAdminService()
    console.log( "adminData",this.adminData);
    
  }
}
