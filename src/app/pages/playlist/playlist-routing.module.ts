import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistPage } from './playlist.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistPage,
    children: [
      {
        path: 'master_playlist',
        loadChildren: () =>
          import('./playlistTabs/master-playlist/master-playlist.module').then(
            (m) => m.MasterPlaylistPageModule
          ),
      },
      {
        path: 'child_playlist',
        loadChildren: () =>
          import('./playlistTabs/child-playlist/child-playlist.module').then(
            (m) => m.ChildPlaylistPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'playlist/playlistTabs/master_playlist',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    redirectTo: 'playlist/playlistTabs/master_playlist',
    pathMatch: 'full',
  },
  {
    path: 'master-playlist',
    loadChildren: () => import('./playlistTabs/master-playlist/master-playlist.module').then(m => m.MasterPlaylistPageModule)
  },
  {
    path: 'child-playlist',
    loadChildren: () => import('./playlistTabs/child-playlist/child-playlist.module').then(m => m.ChildPlaylistPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistPageRoutingModule { }
