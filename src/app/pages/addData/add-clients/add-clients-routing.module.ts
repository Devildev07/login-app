import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddClientsPage } from './add-clients.page';

const routes: Routes = [
  {
    path: '',
    component: AddClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddClientsPageRoutingModule {}
