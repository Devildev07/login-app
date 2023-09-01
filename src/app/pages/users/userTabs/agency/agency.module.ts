import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgencyPageRoutingModule } from './agency-routing.module';

import { AgencyPage } from './agency.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgencyPageRoutingModule,
    RouterModule.forChild([{ path: '', component: AgencyPage }])

  ],
  declarations: [AgencyPage],
  exports: [AgencyPage],
})
export class AgencyPageModule {}
