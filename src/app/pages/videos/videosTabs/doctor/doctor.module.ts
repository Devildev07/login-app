import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorPageRoutingModule } from './doctor-routing.module';

import { DoctorPage } from './doctor.page';
import { RouterModule } from '@angular/router';
import { VideoPopupModule } from 'src/app/components/video-popup/video-popup.module';
VideoPopupModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorPageRoutingModule,
    VideoPopupModule,
    RouterModule.forChild([{ path: '', component: DoctorPage }]),
  ],
  declarations: [DoctorPage],
  exports: [DoctorPage],
})
export class DoctorPageModule {}
