import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVideosPage } from './add-videos.page';

const routes: Routes = [
  {
    path: '',
    component: AddVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVideosPageRoutingModule {}
