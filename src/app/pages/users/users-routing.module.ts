import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
    children: [
      {
        path: 'admin',
        children: [
          {
            path: '',
            loadChildren: () => import('../users/userTabs/admin/admin.module').then(m => m.AdminPageModule),
          }
        ]
      },
      {
        path: 'advertiser',
        children: [
          {
            path: '',
            loadChildren: () => import('../users/userTabs/advertiser/advertiser.module').then(m => m.AdvertiserPageModule),
          }
        ]
      },
      {
        path: 'agency',
        children: [
          {
            path: '',
            loadChildren: () => import('../users/userTabs/agency/agency.module').then(m => m.AgencyPageModule),
          }
        ]
      },
      {
        path: 'clients',
        children: [
          {
            path: '',
            loadChildren: () => import('../users/userTabs/clients/clients.module').then(m => m.ClientsPageModule),
          }
        ]
      },
      {
        path: 'manager',
        children: [
          {
            path: '',
            loadChildren: () => import('../users/userTabs/manager/manager.module').then(m => m.ManagerPageModule),
          }
        ]
      },
      {
        path: '',
        redirectTo: 'users/userTabs/clients',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'users/userTabs/clients',
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule { }
