import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdvertiserPageRoutingModule } from './add-advertiser-routing.module';

import { AddAdvertiserPage } from './add-advertiser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdvertiserPageRoutingModule
  ],
  declarations: [AddAdvertiserPage]
})
export class AddAdvertiserPageModule {}
