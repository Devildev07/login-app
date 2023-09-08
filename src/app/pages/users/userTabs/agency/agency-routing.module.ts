import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgencyPage } from './agency.page';

const routes: Routes = [
  {
    path: '',
    component: AgencyPage
  },
  {
    path: 'add-agency',
    loadChildren: () => import('./add-agency/add-agency.module').then( m => m.AddAgencyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyPageRoutingModule {}
