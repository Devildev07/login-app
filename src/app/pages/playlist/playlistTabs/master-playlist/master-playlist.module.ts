import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPlaylistPageRoutingModule } from './master-playlist-routing.module';

import { MasterPlaylistPage } from './master-playlist.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPlaylistPageRoutingModule,
    RouterModule.forChild([{ path: '', component: MasterPlaylistPage }]),
    SharedModule,
  ],
  declarations: [MasterPlaylistPage],
  exports: [MasterPlaylistPage]
})
export class MasterPlaylistPageModule { }
