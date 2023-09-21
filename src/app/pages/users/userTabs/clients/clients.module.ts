import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsPageRoutingModule } from './clients-routing.module';

import { ClientsPage } from './clients.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientsPageRoutingModule,
    RouterModule.forChild([{ path: '', component: ClientsPage }])
  ],
  declarations: [ClientsPage],
  exports: [ClientsPage],
})
export class ClientsPageModule { }
