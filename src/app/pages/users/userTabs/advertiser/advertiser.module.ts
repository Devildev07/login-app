import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertiserPageRoutingModule } from './advertiser-routing.module';

import { AdvertiserPage } from './advertiser.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AdvertiserPageRoutingModule,
    RouterModule.forChild([{ path: '', component: AdvertiserPage }])

  ],
  declarations: [AdvertiserPage],
  exports: [AdvertiserPage],

})
export class AdvertiserPageModule { }
