import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAgencyPage } from './add-agency.page';

const routes: Routes = [
  {
    path: '',
    component: AddAgencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAgencyPageRoutingModule {}
