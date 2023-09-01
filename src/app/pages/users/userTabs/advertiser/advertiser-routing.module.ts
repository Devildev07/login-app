import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertiserPage } from './advertiser.page';

const routes: Routes = [
  {
    path: '',
    component: AdvertiserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiserPageRoutingModule {}
