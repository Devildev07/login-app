import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddClientsPageRoutingModule } from './add-clients-routing.module';

import { AddClientsPage } from './add-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddClientsPageRoutingModule
  ],
  declarations: [AddClientsPage]
})
export class AddClientsPageModule {}
