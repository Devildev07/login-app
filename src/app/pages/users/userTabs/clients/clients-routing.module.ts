import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsPage } from './clients.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsPage
  },
  {
    path: 'add-client',
    loadChildren: () => import('./add-client/add-client.module').then( m => m.AddClientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsPageRoutingModule {}
