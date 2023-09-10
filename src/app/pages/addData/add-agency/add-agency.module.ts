import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAgencyPageRoutingModule } from './add-agency-routing.module';

import { AddAgencyPage } from './add-agency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAgencyPageRoutingModule
  ],
  declarations: [AddAgencyPage]
})
export class AddAgencyPageModule {}
