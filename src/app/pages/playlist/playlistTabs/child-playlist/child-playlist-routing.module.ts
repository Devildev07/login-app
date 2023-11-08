import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildPlaylistPage } from './child-playlist.page';

const routes: Routes = [
  {
    path: '',
    component: ChildPlaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildPlaylistPageRoutingModule {}
