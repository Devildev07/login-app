import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  adminData: any[] = [];

  constructor() {}

  setAdminService(setAdminData: any[]) {
    this.adminData = setAdminData;
    console.log(this.adminData);
    
  }
  getAdminService() {
    return this.adminData;
  }
}
