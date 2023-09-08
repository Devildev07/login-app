import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerPage } from './manager.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerPage
  },
  {
    path: 'add-manager',
    loadChildren: () => import('./add-manager/add-manager.module').then( m => m.AddManagerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerPageRoutingModule {}
