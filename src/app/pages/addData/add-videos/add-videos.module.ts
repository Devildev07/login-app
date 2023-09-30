import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVideosPageRoutingModule } from './add-videos-routing.module';

import { AddVideosPage } from './add-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVideosPageRoutingModule
  ],
  declarations: [AddVideosPage]
})
export class AddVideosPageModule {}
