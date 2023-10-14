import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsPageRoutingModule } from './ads-routing.module';

import { AdsPage } from './ads.page';
import { RouterModule } from '@angular/router';
import { VideoPopupModule } from 'src/app/components/video-popup/video-popup.module';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsPageRoutingModule,
    VideoPopupModule,
    RouterModule.forChild([{ path: '', component: AdsPage }]),
    SharedModule,
  ],
  declarations: [AdsPage],
  exports: [AdsPage],
})
export class AdsPageModule {}
