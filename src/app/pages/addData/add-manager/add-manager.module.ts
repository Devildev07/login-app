import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddManagerPageRoutingModule } from './add-manager-routing.module';

import { AddManagerPage } from './add-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddManagerPageRoutingModule
  ],
  declarations: [AddManagerPage]
})
export class AddManagerPageModule {}
