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
        loadChildren: () =>
          import('../users/userTabs/admin/admin.module').then(
            (m) => m.AdminPageModule
          ),
        // children: [
        //   {
        //     path: '',
        //   },
        // ],
      },
      {
        path: 'advertiser',
        loadChildren: () =>
          import('../users/userTabs/advertiser/advertiser.module').then(
            (m) => m.AdvertiserPageModule
          ),
        // children: [
        //   {
        //     path: '',
        //   },
        // ],
      },
      {
        path: 'agency',
        loadChildren: () =>
          import('../users/userTabs/agency/agency.module').then(
            (m) => m.AgencyPageModule
          ),
        // children: [
        //   {
        //     path: '',
        //   },
        // ],
      },
      {
        path: 'clients',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../users/userTabs/clients/clients.module').then(
                (m) => m.ClientsPageModule
              ),
          },
        ],
      },
      {
        path: 'manager',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../users/userTabs/manager/manager.module').then(
                (m) => m.ManagerPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'users/userTabs/clients',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'users/userTabs/clients',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule { }
