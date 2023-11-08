import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildPlaylistPageRoutingModule } from './child-playlist-routing.module';

import { ChildPlaylistPage } from './child-playlist.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildPlaylistPageRoutingModule,
    RouterModule.forChild([{ path: '', component: ChildPlaylistPage }]),
    SharedModule,
  ],
  declarations: [ChildPlaylistPage],
  exports: [ChildPlaylistPage]
})
export class ChildPlaylistPageModule { }
