import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosPage } from './videos.page';

const routes: Routes = [
  {
    path: '',
    component: VideosPage
  },
  {
    path: 'general',
    loadChildren: () => import('./videosTabs/general/general.module').then( m => m.GeneralPageModule)
  },
  {
    path: 'doctor',
    loadChildren: () => import('./videosTabs/doctor/doctor.module').then( m => m.DoctorPageModule)
  },
  {
    path: 'ads',
    loadChildren: () => import('./videosTabs/ads/ads.module').then( m => m.AdsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosPageRoutingModule {}
