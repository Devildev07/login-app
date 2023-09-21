import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgencyPageRoutingModule } from './agency-routing.module';

import { AgencyPage } from './agency.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AgencyPageRoutingModule,
    RouterModule.forChild([{ path: '', component: AgencyPage }])

  ],
  declarations: [AgencyPage],
  exports: [AgencyPage],
})
export class AgencyPageModule { }
