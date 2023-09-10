import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdvertiserPage } from './add-advertiser.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdvertiserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdvertiserPageRoutingModule {}
