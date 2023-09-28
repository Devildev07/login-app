import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsPageRoutingModule } from './ads-routing.module';

import { AdsPage } from './ads.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsPageRoutingModule,
    RouterModule.forChild([{path:'',component:AdsPage}])
  ],
  declarations: [AdsPage],
  exports: [AdsPage]

})
export class AdsPageModule {}
