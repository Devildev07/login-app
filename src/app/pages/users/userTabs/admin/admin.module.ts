import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AdminPageRoutingModule,
    RouterModule.forChild([{ path: '', component: AdminPage }]),
  ],
  declarations: [AdminPage],
  exports: [AdminPage],
})
export class AdminPageModule { }
