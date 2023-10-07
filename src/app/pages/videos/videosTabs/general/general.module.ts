import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';

import { GeneralPage } from './general.page';
import { RouterModule } from '@angular/router';
import { VideoPopupModule } from 'src/app/components/video-popup/video-popup.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralPageRoutingModule,
    VideoPopupModule,
    RouterModule.forChild([{path:'',component:GeneralPage}])
  ],
  declarations: [GeneralPage],
  exports: [GeneralPage]
})
export class GeneralPageModule {}
