import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  },
  {
    path: 'admin',
    loadChildren: () => import('./userTabs/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./userTabs/clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'advertiser',
    loadChildren: () => import('./userTabs/advertiser/advertiser.module').then( m => m.AdvertiserPageModule)
  },
  {
    path: 'agency',
    loadChildren: () => import('./userTabs/agency/agency.module').then( m => m.AgencyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
