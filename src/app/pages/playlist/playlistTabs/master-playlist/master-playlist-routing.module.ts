import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterPlaylistPage } from './master-playlist.page';

const routes: Routes = [
  {
    path: '',
    component: MasterPlaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterPlaylistPageRoutingModule {}
