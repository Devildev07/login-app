import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerPageRoutingModule } from './manager-routing.module';

import { ManagerPage } from './manager.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerPageRoutingModule,
    RouterModule.forChild([{ path: '', component: ManagerPage }])
  ],
  declarations: [ManagerPage],
  exports: [ManagerPage],
})
export class ManagerPageModule {}
